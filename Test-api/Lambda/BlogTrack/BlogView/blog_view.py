import json
# from botocore.vendored import requests
import requests
from bs4 import BeautifulSoup
import pandas as pd

import time
import concurrent.futures
from get_searchad import get_searchad
# import starter as st
from datetime import datetime
from dateutil.relativedelta import relativedelta

class GetView:
    def __init__(self):
        self.jsonList = []
        self.resultList = []
        self.rankList = []
        self.df2Link = []
        self.df2List = []
        self.month_ago = str(datetime.now() - relativedelta(months=1))[:10]
        self.current_date = str(datetime.now())[:10]
        self.rank = 0
        self.viewJson = {}

    def get_content(self, keyword):
        search_r = get_searchad(keyword, "date")
        try:
            pc = search_r["monthlyPcQcCnt"].replace("< ", "")
            mobile = search_r["monthlyMobileQcCnt"].replace("< ", "")
            return pc + mobile
        except:
            return -1

    def get_view_count(self, keyword):
        total_view_count = 'https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=' + keyword
        req = requests.get(total_view_count)
        req = req.text
        soup = BeautifulSoup(req, 'html.parser')
        noad_view_count = len(soup.find_all(class_='bx _svp_item'))
        adview_count = len(soup.find_all(class_='ico_ad spview_bf'))
        return noad_view_count, adview_count

    def view_rank(self, keyword):

        if keyword == None:
            pass
        else:
            key_url = 'https://m.search.naver.com/search.naver?where=m_view&query=' + keyword + '&sm=mtb_viw.all&nso=&mode=normal&main_q=&st_coll=&topic_r_cat='
            req = requests.get(key_url)
            req = req.text
            soup = BeautifulSoup(req, 'html.parser')

            ### 첫페이지 40여개 파싱
            search_all = soup.find_all('a', {'class': 'api_txt_lines total_tit'})
            ### 랭킹용 숫자

            self.rank = 0
            ###
            for index in range(len(search_all)):

                ### 광고는 지나가기
                if 'https://adcr.naver.com' in search_all[index]['href']:
                    pass
                else:
                    self.viewJson = {}
                    ### 광고 없을 때의 순위 따로 채크
                    self.rank += 1
                    self.viewJson["rank"] = self.rank
                    self.viewJson["keyword"] = keyword

                    ### 제목
                    self.viewJson["url"] = search_all[index]['href']
                    self.jsonList.append(self.viewJson)


    def merge_rank(self, item):
        testJson = {}
        if item["url"] in self.df2Link:
            index = self.df2Link.index(item["url"])
            testJson["rank"] = int(self.df2List[index]["rank"])
            testJson["url"] = str(self.df2List[index]['url'])
            testJson["no_adview"], testJson["adview"] = self.get_view_count(item["keyword"])
            testJson["monthly_search"] = self.get_content(item["keyword"])
            testJson["keyword"] = item["keyword"]
            self.rankList.append(testJson)
            # print(item, testJson)
        else:
            testJson["rank"] = 31
            testJson["url"] = item["url"]
            testJson["no_adview"], testJson["adview"] = self.get_view_count(item["keyword"])
            testJson["monthly_search"] = self.get_content(item["keyword"])
            testJson["keyword"] = item["keyword"]
            self.rankList.append(testJson)



    def multi_key(self, event):
        ### 멀티쓰레드 ###
        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.map(self.view_rank, event)

    def multi_rank(self, item):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.map(self.merge_rank, item)

    def blog_view(self, event):
        # event{"keyword":[], "body":[]}

        bodyList = json.loads(event["body"])
        keyList = event["keyword"]

        for index in range(len(keyList)):
            bodyList[index]["keyword"] = keyList[index]

        self.multi_key(keyList)
        self.df2List = sorted(self.jsonList, key=lambda e: (e['rank'], e['keyword']))
        self.df2Link = [item["url"] for item in self.df2List]
        df3List = sorted(bodyList, key=lambda e: (e['id']))

        self.multi_rank(df3List)

        df3 = pd.DataFrame(df3List,columns = ['id','title','url','keyword'])
        df4 = pd.DataFrame(self.rankList, columns=["rank", "url", "no_adview","adview","monthly_search"])
        df4 = df4.sort_values(by=['rank', 'url'], ascending=True)
        df4 = df4.reset_index(drop=True)

        data = pd.merge(df3, df4, on='url')
        self.resultList = data.to_json(orient='records', force_ascii=False)
        return self.resultList

inst = GetView()
event = {
  "body": "[{\"id\": 0, \"title\": \"\\uc624\\ub80c\\uc988 \\uccb4\\ub9ac\\ubb38 , \\uc790\\uc5f0\\uad11\\uc5d0\\uc11c \\ub354 \\ub9d1\\uace0 \\uc608\\uc05c \\ud0a4\\ub974\\uc2dc \\ucd08\\uc2b9\\ub2ec\\ub80c\\uc988 \\uc2e0\\uc0c1\", \"url\": \"https://m.blog.naver.com/mamelyoo/222266309728\", \"keyword\": \"\\uc624\\ub80c\\uc988\"}, {\"id\": 1, \"title\": \"\\ub9bd\\ubc24\\ucd94\\ucc9c , \\uc7c1\\uc5ec\\ub450\\uace0\\uc2f6\\uc740 \\ud1a0\\ub9ac\\ub4e0 \\uc194\\ub9ac\\ub4dc\\uc778 \\ub9bd\\uc5d0\\uc13c\\uc2a4\", \"url\": \"https://m.blog.naver.com/mamelyoo/222265209424\", \"keyword\": \"\\ub9bd\\ubc24\"}, {\"id\": 2, \"title\": \"\\ubd04\\uc800\\uaca9 \\uc544\\uc774\\uc100\\ub3c4\\uc6b0 \\ud314\\ub808\\ud2b8 , \\uc624\\ud504\\ub77c\\ucf54\\uc2a4\\uba54\\ud2f1 \\uc2a4\\uc717\\ub4dc\\ub9bc\", \"url\": \"https://m.blog.naver.com/mamelyoo/222264075017\", \"keyword\": \"\\uc2a4\\uc717\\ub4dc\\ub9bc\"}, {\"id\": 3, \"title\": \"\\uc62c\\ub9ac\\ube0c\\uc601\\uc138\\uc77c \\ub9c8\\uc2a4\\uce74\\ub77c \\ub4dd\\ud15c\\uc740 \\ub370\\uc790\\ubdf0\\ub9c8\\uc2a4\\uce74\\ub77c\", \"url\": \"https://m.blog.naver.com/mamelyoo/222262111012\", \"keyword\": \"\\ub370\\uc790\\ubdf0\"}, {\"id\": 4, \"title\": \"\\uaca8\\ub4dc\\ub791\\uc774 \\uc0c9\\uc18c\\uce68\\ucc29 \\ub189! \\ube14\\ub799\\uc0f7 \\ubc14\\ub514\\ubbf8\\ubc31\\ud06c\\ub9bc N\\ud1b5\\uc9f8 \\uc560\\uc6a9\\uc911\", \"url\": \"https://m.blog.naver.com/mamelyoo/222257980425\", \"keyword\": \"\\ube14\\ub799\\uc0f7\"}, {\"id\": 5, \"title\": \"\\ud3fc\\ud074\\ub80c\\uc9d5 \\ucd94\\ucc9c ! \\uae68\\ub057\\ud558\\uac8c \\ud654\\uc7a5\\uc9c0\\uc6b0\\ub294\\ubc95\", \"url\": \"https://m.blog.naver.com/mamelyoo/222254384076\", \"keyword\": \"\\ud3fc\\ud074\\ub80c\\uc9d5\"}, {\"id\": 6, \"title\": \"\\ucfe0\\uc158 \\ucd94\\ucc9c , \\ud074\\ub9ac\\uc624 \\ud0ac\\ucee4\\ubc84 \\uc2e0\\uc0c1 \\ud30c\\uc6b4\\uc6e8\\uc5b4 \\ucfe0\\uc158 \\uc62c\\ub274 \\uc804\\uceec\\ub7ec \\ube44\\uad50\\ud574\\ubd04!\", \"url\": \"https://m.blog.naver.com/mamelyoo/222251126391\", \"keyword\": \"\\ud074\\ub9ac\\uc624\"}, {\"id\": 7, \"title\": \"\\ud50c\\ub9b0 \\uc548\\ubc88\\uc9c0\\ub294 \\ud39c\\uc2ac \\uc544\\uc774\\ub77c\\uc774\\ub108 (Feat.\\ub9bd\\uc564\\uc544\\uc774\\ub9ac\\ubb34\\ubc84 \\ud328\\ub4dc)\", \"url\": \"https://m.blog.naver.com/mamelyoo/222249672524\", \"keyword\": \"\\ud39c\\uc2ac\\uc544\\uc774\\ub77c\\uc774\\ub108\"}, {\"id\": 8, \"title\": \"\\ubc14\\ub514\\ub85c\\uc158 \\ucd94\\ucc9c \\uaf3c\\uaf3c\\ud558\\uac8c \\ucc3e\\uc740 \\uafc0\\ud15c!\", \"url\": \"https://m.blog.naver.com/mamelyoo/222248467955\", \"keyword\": \"\\ubc14\\ub514\\ub85c\\uc158\\ucd94\\ucc9c\"}, {\"id\": 9, \"title\": \"\\uc774\\ub2c8\\uc2a4\\ud504\\ub9ac \\uadf8\\ub9b0\\ud2f0 \\uc528\\ub4dc \\uc138\\ub7fc , \\uaca8\\uc6b8 \\uc218\\ubd84\\uc5d0\\uc13c\\uc2a4 \\ucc30\\ub5a1\\ud15c\", \"url\": \"https://m.blog.naver.com/mamelyoo/222247845185\", \"keyword\": \"\\uc774\\ub2c8\\uc2a4\\ud504\\ub9ac\"}]"
  # ,"keyword": [
  #   "솔리드인립에센스",
  #   "아이섀도우팔레트",
  #   "데자뷰마스카라",
  #   "겨드랑이색소침착",
  #   "폼클렌징추천",
  #   "클리오킬커버",
  #   "안번지는펜슬아이라이너",
  #   "바디로션추천",
  #   "이니스프리그린티씨드세럼",
  #   "올리브영컨실러추천"
  # ]
    ,"keyword":[
        "오렌즈",
        "솔리드인립에센스",
        "아이섀도우팔레트",
        "데자뷰마스카라",
        "겨드랑이색소침착",
        "폼클렌징추천",
        "클리오킬커버",
        "안번지는펜슬아이라이너",
        "바디로션추천",
        "이니스프리그린티씨드세럼",
    ]
}

print(inst.blog_view(event))