#!/usr/bin/python
# -*- coding: utf-8 -*-
# @version        : 1.0
# @Creaet Time    : 2022/7/7 13:41
# @File           : login.py
# @IDE            : PyCharm
# @desc           : 登录记录模型
import json
from utils.ip_manage import IPManage
from sqlalchemy.ext.asyncio import AsyncSession
from db.db_base import BaseModel
from sqlalchemy import Column, String, Boolean, TEXT
from fastapi import Request
from user_agents import parse


class VadminLoginRecord(BaseModel):
    __tablename__ = "vadmin_record_login"
    __table_args__ = ({'comment': '登录记录表'})

    telephone = Column(String(50), index=True, nullable=False, comment="手机号")
    status = Column(Boolean, default=True, comment="是否登录成功")
    ip = Column(String(50), comment="登陆地址")
    address = Column(String(255), comment="登陆地点")
    country = Column(String(255), comment="国家")
    province = Column(String(255), comment="县")
    city = Column(String(255), comment="城市")
    county = Column(String(255), comment="区/县")
    operator = Column(String(255), comment="运营商")
    postal_code = Column(String(255), comment="邮政编码")
    area_code = Column(String(255), comment="地区区号")
    browser = Column(String(50), comment="浏览器")
    system = Column(String(50), comment="操作系统")
    response = Column(TEXT, comment="响应信息")
    request = Column(TEXT, comment="请求信息")

    @classmethod
    async def create_login_record(cls, telephone: str, status: bool, request: Request, response: dict,
                                  db: AsyncSession):
        """
        创建登录记录
        @return:
        """
        header = {}
        for k, v in request.headers.items():
            header[k] = v
        body = json.loads((await request.body()).decode())
        user_agent = parse(request.headers.get("user-agent"))
        system = f"{user_agent.os.family} {user_agent.os.version_string}"
        browser = f"{user_agent.browser.family} {user_agent.browser.version_string}"
        ip = IPManage(request.client.host)
        location = await ip.parse()
        resp = json.dumps(response)
        resq = json.dumps({"body": body, "headers": header})
        obj = VadminLoginRecord(**location.dict(), telephone=telephone, status=status, browser=browser,
                                system=system, response=resp, request=resq)
        db.add(obj)
        await db.flush()
