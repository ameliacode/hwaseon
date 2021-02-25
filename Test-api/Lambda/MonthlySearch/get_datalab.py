from get_headers import GetHeader
import json
from botocore.vendored import requests

def get_datalab(keyword, start_date, end_date, time_unit):

    client = GetHeader()
    url = "https://openapi.naver.com/v1/datalab/search"

    body = {"startDate": start_date,
            "endDate": end_date,
            "timeUnit": time_unit,
            "keywordGroups": [{"groupName": keyword, "keywords": [keyword]}]
            }

    datalab_r = requests.post(url, data=json.dumps(body),
                              headers=client.get_datalab_header())

    datalab_result = json.loads(datalab_r.content)
    return datalab_result  #json