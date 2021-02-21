from get_headers import GetHeader
import requests

def get_searchad(keyword, time_unit):

    client = GetHeader()
    BASE_URL = 'https://api.naver.com'

    uri = '/keywordstool'
    method = 'GET'
    search_r = requests.get(BASE_URL + uri + '?hintKeywords={}&showDetail=1'.format(keyword),
                            params={"sort": time_unit}, headers=client.get_search_header(method, uri))
    try:
        search_result = search_r.json()["keywordList"][0]
    except:
        search_result = { "Error" : "Keyword Error"}

    return search_result    #json
