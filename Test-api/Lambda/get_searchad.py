from get_headers import GetHeader
import requests

def get_searchad(keyword, time_unit):
    BASE_URL = 'https://api.naver.com'
    API_KEY = GetHeader.API_KEY
    SECRET_KEY = GetHeader.SECRET_KEY
    CUSTOMER_ID = GetHeader.CUSTOMER_ID

    uri = '/keywordstool'
    method = 'GET'
    search_r = requests.get(BASE_URL + uri + '?hintKeywords={}&showDetail=1'.format(keyword),
                            params={"sort": time_unit},
                            headers=GetHeader.get_search_header(method, uri, API_KEY, SECRET_KEY, CUSTOMER_ID))

    try:
        search_result = search_r.json()["keywordList"][0]
    except:
        search_result = { "Error" : "Keyword Error"}

    return search_result    #json