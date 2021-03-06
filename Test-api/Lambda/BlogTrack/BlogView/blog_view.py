import json
import requests
from bs4 import BeautifulSoup
import pandas as pd

import concurrent.futures

jsonList = []

def view_rank(keyword):

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
        rank = 0
        ###
        for index in range(len(search_all)):
            ### 광고는 지나가기
            if 'https://adcr.naver.com' in search_all[index]['href']:
                pass
            else:
                viewJson = {}
                ### 광고 없을 때의 순위 따로 채크
                rank += 1
                viewJson["rank"] = rank
                ### 제목

                viewJson["title"] = search_all[index].text
                viewJson["url"] = search_all[index]['href']
                viewJson["keyword"] = keyword

                jsonList.append(viewJson)

def multithreading(event):
    ### 멀티쓰레드 ###

    keyList = event

    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.map(view_rank, keyList)

def blog_view(event):
    # event{"keyword":[], "body":[]}
    # multithreading(event["keyword"])
    # multithreading()
    print(json.dumps(['솔리드인립에센스',
                     '아이섀도우팔레트',
                     '데자뷰마스카라',
                     '겨드랑이색소침착',
                     '폼클렌징추천',
                     '클리오킬커버',
                     '안번지는펜슬아이라이너',
                     '바디로션추천',
                     '이니스프리그린티씨드세럼',
                     '올리브영컨실러추천']))


    # sortList = sorted(jsonList, key=lambda e: (e['rank'], e['keyword']))
    # bodyList = json.loads(event["body"])
    # df2 = pd.DataFrame(sortList, columns=["rank","title","url","keyword"])
    # df3 = pd.DataFrame(bodyList, columns=["title","url","keyword"])
    #
    # rankList = []
    #
    # for i in range(len(jsonList)):
    #     testJson = {}
    #     if df2['url'][i] in list(df3['url']):
    #         testJson["rank"] = int(df2["rank"][i])
    #         testJson["url"] = str(df2['url'][i])
    #         rankList.append(testJson)
    #     else:
    #         pass
    #
    # rankList = sorted(rankList, key=lambda e: (e['rank'], e['url']))
    # df4  = pd.DataFrame(rankList, columns = ["rank","url"])
    # data = pd.merge(df3, df4, on='url')
    # js = data.to_json(orient='columns')

blog_view("Hello")