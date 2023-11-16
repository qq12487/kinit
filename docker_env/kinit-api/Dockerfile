FROM python:3.10

COPY ./kinit-api/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
RUN pip install matplotlib plotly scipy scikit-learn

WORKDIR /app

CMD [ "python", "main.py", "run"]