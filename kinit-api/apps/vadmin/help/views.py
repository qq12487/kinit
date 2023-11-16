#!/usr/bin/python
# -*- coding: utf-8 -*-
# @version        : 1.0
# @Create Time    : 2023-02-15 20:03:49
# @File           : views.py
# @IDE            : PyCharm
# @desc           : 帮助中心视图

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from core.database import db_getter
from utils.response import SuccessResponse
from . import schemas, crud, params, models
from core.dependencies import IdList
from apps.vadmin.auth.utils.current import AllUserAuth
from apps.vadmin.auth.utils.validation.auth import Auth
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from io import BytesIO
from PyPDF2 import PdfReader
import pandas as pd
from openai.embeddings_utils import get_embedding, cosine_similarity
import openai
import os
import redis
from _md5 import md5

app = APIRouter()


###########################################################
#    类别管理
###########################################################
@app.get("/issue/categorys", summary="获取类别列表")
async def get_issue_categorys(p: params.IssueCategoryParams = Depends(), auth: Auth = Depends(AllUserAuth())):
    model = models.VadminIssueCategory
    options = [joinedload(model.create_user)]
    schema = schemas.IssueCategoryListOut
    datas, count = await crud.IssueCategoryDal(auth.db).get_datas(
        **p.dict(),
        v_options=options,
        v_schema=schema,
        v_return_count=True
    )
    return SuccessResponse(datas, count=count)


@app.get("/issue/categorys/options", summary="获取类别选择项")
async def get_issue_categorys_options(auth: Auth = Depends(AllUserAuth())):
    schema = schemas.IssueCategoryOptionsOut
    return SuccessResponse(await crud.IssueCategoryDal(auth.db).get_datas(limit=0, is_active=True, v_schema=schema))


@app.post("/issue/categorys", summary="创建类别")
async def create_issue_category(data: schemas.IssueCategory, auth: Auth = Depends(AllUserAuth())):
    data.create_user_id = auth.user.id
    return SuccessResponse(await crud.IssueCategoryDal(auth.db).create_data(data=data))


@app.delete("/issue/categorys", summary="批量删除类别", description="硬删除")
async def delete_issue_categorys(ids: IdList = Depends(), auth: Auth = Depends(AllUserAuth())):
    await crud.IssueCategoryDal(auth.db).delete_datas(ids=ids.ids, v_soft=False)
    return SuccessResponse("删除成功")


@app.put("/issue/categorys/{data_id}", summary="更新类别信息")
async def put_issue_category(data_id: int, data: schemas.IssueCategory, auth: Auth = Depends(AllUserAuth())):
    return SuccessResponse(await crud.IssueCategoryDal(auth.db).put_data(data_id, data))


@app.get("/issue/categorys/{data_id}", summary="获取类别信息")
async def get_issue_category(data_id: int, auth: Auth = Depends(AllUserAuth())):
    schema = schemas.IssueCategorySimpleOut
    return SuccessResponse(await crud.IssueCategoryDal(auth.db).get_data(data_id, v_schema=schema))


@app.get("/issue/categorys/platform/{platform}", summary="获取平台中的常见问题类别列表")
async def get_issue_category_platform(platform: str, db: AsyncSession = Depends(db_getter)):
    model = models.VadminIssueCategory
    options = [joinedload(model.issues)]
    schema = schemas.IssueCategoryPlatformOut
    result = await crud.IssueCategoryDal(db).get_datas(
        limit=0,
        platform=platform,
        is_active=True,
        v_schema=schema,
        v_options=options
    )
    return SuccessResponse(result)


###########################################################
#    问题管理
###########################################################
@app.get("/issues", summary="获取问题列表")
async def get_issues(p: params.IssueParams = Depends(), auth: Auth = Depends(AllUserAuth())):
    model = models.VadminIssue
    options = [joinedload(model.create_user), joinedload(model.category)]
    schema = schemas.IssueListOut
    datas, count = await crud.IssueDal(auth.db).get_datas(
        **p.dict(),
        v_options=options,
        v_schema=schema,
        v_return_count=True
    )
    return SuccessResponse(datas, count=count)


@app.post("/issues", summary="创建问题")
async def create_issue(data: schemas.Issue, auth: Auth = Depends(AllUserAuth())):
    data.create_user_id = auth.user.id
    return SuccessResponse(await crud.IssueDal(auth.db).create_data(data=data))


@app.delete("/issues", summary="批量删除问题", description="硬删除")
async def delete_issues(ids: IdList = Depends(), auth: Auth = Depends(AllUserAuth())):
    await crud.IssueDal(auth.db).delete_datas(ids=ids.ids, v_soft=False)
    return SuccessResponse("删除成功")


@app.put("/issues/{data_id}", summary="更新问题信息")
async def put_issue(data_id: int, data: schemas.Issue, auth: Auth = Depends(AllUserAuth())):
    return SuccessResponse(await crud.IssueDal(auth.db).put_data(data_id, data))


@app.get("/issues/{data_id}", summary="获取问题信息")
async def get_issue(data_id: int, db: AsyncSession = Depends(db_getter)):
    schema = schemas.IssueSimpleOut
    return SuccessResponse(await crud.IssueDal(db).get_data(data_id, v_schema=schema))


@app.get("/issues/add/view/number/{data_id}", summary="更新常见问题查看次数+1")
async def issue_add_view_number(data_id: int, db: AsyncSession = Depends(db_getter)):
    return SuccessResponse(await crud.IssueDal(db).add_view_number(data_id))

###########################################################
#    chatbot
###########################################################

class Chatbot():

    def extraxt_txt(self, txt):
        with open(txt, "r") as f:
            text = f.read()
        return str(text)
    
    def extract_pdf(self, pdf):
        print("Parsing paper")
        number_of_pages = len(pdf.pages)
        print(f"Total number of pages: {number_of_pages}")
        paper_text = []
        for i in range(number_of_pages):
            page = pdf.pages[i]
            page_text = []

            def visitor_body(text, cm, tm, fontDict, fontSize):
                x = tm[4]
                y = tm[5]
                # ignore header/footer
                if (y > 50 and y < 720) and (len(text.strip()) > 1):
                    page_text.append({"fontsize": fontSize, "text": text.strip().replace("\x03", ""), "x": x, "y": y})

            _ = page.extract_text(visitor_text=visitor_body)

            blob_font_size = None
            blob_text = ""
            processed_text = []

            for t in page_text:
                if t["fontsize"] == blob_font_size:
                    blob_text += f" {t['text']}"
                    if len(blob_text) >= 200:
                        processed_text.append({"fontsize": blob_font_size, "text": blob_text, "page": i})
                        blob_font_size = None
                        blob_text = ""
                else:
                    if blob_font_size is not None and len(blob_text) >= 1:
                        processed_text.append({"fontsize": blob_font_size, "text": blob_text, "page": i})
                    blob_font_size = t["fontsize"]
                    blob_text = t["text"]
            paper_text += processed_text
        print("Done parsing paper")
        return paper_text
    '''
    def extract_pdf(self, pdf):
        print("Parsing paper")
        number_of_pages = len(pdf.pages)
        print(f"Total number of pages: {number_of_pages}")
        paper_text = []
        page_text = []
        for i in range(number_of_pages):
            #if i > 3:
            #    continue
            page = pdf.pages[i]

            def visitor_body(text, cm, tm, fontDict, fontSize):
                y = tm[5]
                #print(f"tm: {tm}, text: {text}")
                # ignore header/footer
                if (y > 50 and y < 900) and (len(text.strip()) > 1) and (tm[0] > 9):
                    num_text0 = ord(text[0])
                    #print(f"num_text: {num_text0}, tm: {tm}")
                    if (num_text0 >=65 and num_text0 < 91) or len(page_text) == 0 or tm[0] > 10:
                        page_text.append({"fontsize": fontSize, "text": text.strip().replace("\x03", ""), "page": None})
                    else:
                        page_text[-1]["text"] += " " + text.strip().replace("\x03", "")
                    #print(page_text[-1]["text"])

            _ = page.extract_text(visitor_text=visitor_body)

            blob_font_size = None
            blob_text = ""
            processed_text = []
            p = page_text[0]["page"] if page_text[0]["page"] else i

            for t in page_text:            
                if t["fontsize"] == blob_font_size:
                    blob_text += f" {t['text']}"
                    if len(blob_text) >= 200 and ord(blob_text[-1]) == 46:
                        processed_text.append({"fontsize": blob_font_size, "text": blob_text, "page": p})
                        blob_font_size = None
                        blob_text = ""
                        p = i
                else:
                    if blob_font_size is not None and len(blob_text) >= 1:
                        processed_text.append({"fontsize": blob_font_size, "text": blob_text, "page": p})
                    blob_font_size = t["fontsize"]
                    blob_text = t["text"]
            paper_text += processed_text
            if blob_text:
                page_text = [{"fontsize": blob_font_size, "text": blob_text, "page": i}]
            else:
                page_text = []
        print("Done parsing paper")
        return paper_text    
    '''
    def create_df(self, data):

        if type(data) == list:
            print("Extracting text from pdf")
            print("Creating dataframe")
            filtered_pdf = []
            # print(pdf.pages[0].extract_text())
            for row in data:
                if len(row["text"]) < 30:
                    continue
                filtered_pdf.append(row)
            df = pd.DataFrame(filtered_pdf)
            # remove elements with identical df[text] and df[page] values
            df = df.drop_duplicates(subset=["text", "page"], keep="first")
            # df['length'] = df['text'].apply(lambda x: len(x))
            print("Done creating dataframe")

        elif type(data) == str:
            print("Extracting text from txt")
            print("Creating dataframe")
            # Parse the text and add each paragraph to a column 'text' in a dataframe
            df = pd.DataFrame(data.split("\n"), columns=["text"])

        return df

    def embeddings(self, df):
        print("Calculating embeddings")
        # openai.api_key = os.getenv('OPENAI_API_KEY')
        embedding_model = "text-embedding-ada-002"
        embeddings = df.text.apply([lambda x: get_embedding(x, engine=embedding_model)])
        df["embeddings"] = embeddings
        print("Done calculating embeddings")
        return df

    def search(self, df, query, n=3, pprint=True):
        query_embedding = get_embedding(query, engine="text-embedding-ada-002")
        df["similarity"] = df.embeddings.apply(lambda x: cosine_similarity(x, query_embedding))

        results = df.sort_values("similarity", ascending=False, ignore_index=True)
        # make a dictionary of the the first three results with the page number as the key and the text as the value. The page number is a column in the dataframe.
        results = results.head(n)
        sources = []
        for i in range(n):
            # append the page number and the text as a dict to the sources list
            sources.append({"Page " + str(results.iloc[i]["page"]): results.iloc[i]["text"][:150] + "..."})
        return {"results": results, "sources": sources}

    def create_prompt(self, df, user_input): #, prompt=None
        print('Creating prompt')
        print(user_input)

        result = self.search(df, user_input, n=5)
        data = result['results']
        sources = result['sources']
        system_role = """You are a doctor by profession about Spinal Muscular Atrophy, specializing in reading and summarizing medical papers.  
        You'll get a query, a list of text embeddings, and paper titles, ranked by cosine similarity to the query.
        You must take the given embeddings and return a very detailed summary of the paper in the languange of the query:
        """
        #You are a doctor by profession about Spinal Muscular Atrophy, specializing in reading and summarizing medical papers.
        #You are a AI assistant whose expertise is reading and summarizing medical papers. 
        user_input = user_input + """
        Here are the embeddings:

        1.""" + str(data.iloc[0]['text']) + """
        2.""" + str(data.iloc[1]['text']) + """
        3.""" + str(data.iloc[2]['text']) + """
        4.""" + str(data.iloc[3]['text']) + """
        5.""" + str(data.iloc[4]['text']) + """
        """

        #4.""" + str(data.iloc[3]['text']) + """
        #5.""" + str(data.iloc[4]['text']) + """

        #if prompt:
        #    prompt['messages'].append({"role": "user", "content": str(user_input)})
        #    prompt['sources'] = sources
            
        #else:
        history = [
        {"role": "system", "content": system_role},
        {"role": "user", "content": str(user_input)}]
            #prompt = {'messages': history, 'sources': sources}

        print('Done creating prompt')
        return {'messages': history, 'sources': sources}

    def gpt(self, context, source):
        print('Sending request to OpenAI')
        openai.api_key = os.getenv('OPENAI_API_KEY')
        r = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=context)
        answer = r.choices[0]["message"]["content"]
        print('Done sending request to OpenAI')
        response = {'answer': answer, 'sources': source}
        return response

###########################################################
#    回答處理
###########################################################

db = redis.StrictRedis(host='localhost', port=6379, db=0)

@app.get("/issues/pdf")
# 移除request
async def process_pdf(data: str):
    print("Processing pdf")
    # body = await request.body()
    key = md5(body).hexdigest()
    print(key)

    if db.get(key) is not None:
        print("Already processed pdf")
        return JSONResponse({"key": key})
    
    file = body
    pdf = PdfReader(BytesIO(file))

    chatbot = Chatbot()
    paper_text = chatbot.extract_pdf(pdf)
    df = chatbot.create_df(paper_text)
    df = chatbot.embeddings(df)

    if db.get(key) is None:
        db.set(key, df.to_json())

    print("Done processing pdf")
    return JSONResponse({"key": key})

'''
@app.post("/process_pdf")
async def fixed(request: Request):
    body = await request.body()
    key = md5(body).hexdigest()
    query = []
    q1 = "What are the symptoms of the patient in this paper?"
    q2 = "What were the outcomes for the patients in this paper?"
    query.extend([q1, q2])
    print(f'query: {query}')
    chatbot = Chatbot()
    df = pd.read_json(BytesIO(db.get(key)))
    print(df.head(5))
    # prompt = chatbot.create_prompt(df, query[0])
    response = []


    for i, q in enumerate(query):
        if i == 0:
            prompt = chatbot.create_prompt(df, q)
        else:
            prompt = chatbot.create_prompt(df, q, prompt=prompt)
        chat = []
        chat.extend(prompt['messages'])

        r = chatbot.gpt(chat, prompt['sources'])
        print(r)
        # {"role": "assistant", "content": ""}
        prompt['messages'].append({"role": "assistant", "content": r['answer']})
        response.append(r)

    return JSONResponse(content=response, status_code=200)
'''

@app.post("/issues/reply")
async def reply(request: Request):
    data = await request.json()
    key = data.get('key')
    query = data.get('query')
    
    chatbot = Chatbot()
    query = str(query)
    df = pd.read_json(BytesIO(db.get(key)))
    print(df.head(5))
    prompt = chatbot.create_prompt(df, query)

    chat = []
    chat.extend(prompt['messages'])

    response = chatbot.gpt(chat, prompt['sources'])
    print(response)
    return JSONResponse(content=response, status_code=200)