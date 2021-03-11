import json
from botocore.vendored import requests
from bs4 import BeautifulSoup
import pandas as pd

import time
import concurrent.futures
from get_searchad import get_searchad
from get_shop import get_shop
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
        self.exists = False

    def get_monSearch(self, keyword):
        search_r = get_searchad(keyword, "date")
        try:
            pc = search_r["monthlyPcQcCnt"].replace("< ", "")
            mobile = search_r["monthlyMobileQcCnt"].replace("< ", "")
            return pc + mobile
        except:
            return -1

    def get_monContent(self, keyword):
        shop_r = get_shop(keyword)
        try:
            total = shop_r["total"]
            return total
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

        testJson["no_adview"], testJson["adview"] = self.get_view_count(item["keyword"])
        testJson["monthly_search"] = self.get_monSearch(item["keyword"])
        testJson["monthly_content"] = self.get_monContent(item["keyword"])
        testJson["keyword"] = item["keyword"]

        if item["url"] in self.df2Link:
            index = self.df2Link.index(item["url"])
            testJson["rank"] = int(self.df2List[index]["rank"])
            testJson["url"] = str(self.df2List[index]['url'])
        else:
            testJson["rank"] = 31
            testJson["url"] = item["url"]
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

        df3 = pd.DataFrame(df3List, columns=['id', 'title', 'url', 'keyword'])
        df4 = pd.DataFrame(self.rankList,
                           columns=["rank", "url", "no_adview", "adview", "monthly_search", "monthly_content"])
        df4 = df4.sort_values(by=['rank', 'url'], ascending=True)
        df4 = df4.reset_index(drop=True)

        data = pd.merge(df3, df4, on='url')
        self.resultList = data.to_json(orient='records', force_ascii=False)
        return self.resultList
