from get_headers import GetHeader
import json
import requests

def get_datalab(keyword, start_date, end_date, time_unit):
    client_id = GetHeader.api_key
    client_secret = GetHeader.secret_key
    url = "https://openapi.naver.com/v1/datalab/search"

    body = {"startDate": start_date,
            "endDate": end_date,
            "timeUnit": time_unit,
            "keywordGroups": [{"groupName": keyword, "keywords": [keyword]}]
            }

    datalab_r = requests.post(url, data=json.dumps(body),
                              headers=GetHeader.get_datalab_header(client_id, client_secret))

    datalab_result = json.loads(datalab_r.content)
    return datalab_result  #json