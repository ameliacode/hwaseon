from get_headers import GetHeader
import json
# from botocore.vendored import requests
import requests

def get_shop(keyword):

    client = GetHeader()
    url = "https://openapi.naver.com/v1/search/shop"

    shop_r = requests.get(url+"?query="+keyword, headers=client.get_datalab_header())

    shop_result = json.loads(shop_r.content)
    return shop_result  #json