from get_headers import GetHeader
import json
import requests

def get_datalab(keyword, start_date, end_date, time_unit):
<<<<<<< HEAD

    client = GetHeader()
=======
    client_id = GetHeader.api_key
    client_secret = GetHeader.secret_key
>>>>>>> b8b78118e8555f273aeead5bfb8fd0a23fd404a2
    url = "https://openapi.naver.com/v1/datalab/search"

    body = {"startDate": start_date,
            "endDate": end_date,
            "timeUnit": time_unit,
            "keywordGroups": [{"groupName": keyword, "keywords": [keyword]}]
            }

    datalab_r = requests.post(url, data=json.dumps(body),
<<<<<<< HEAD
                              headers=client.get_datalab_header())
=======
                              headers=GetHeader.get_datalab_header(client_id, client_secret))
>>>>>>> b8b78118e8555f273aeead5bfb8fd0a23fd404a2

    datalab_result = json.loads(datalab_r.content)
    return datalab_result  #json