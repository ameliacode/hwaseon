import time
import signaturehelper
import json
import os

class GetHeader:

    def __init__(self):
        self.configPath = "./config.json"
        #self.configPath = os.environ['LAMBDA_TASK_ROOT'] + "/config.json"
        self.configContents = open(self.configPath).read()
        self.config_secret_debug = json.loads(self.configContents)
        self.API_KEY = self.config_secret_debug["NAVER_SEARCH"]["CLIENT_ID"]
        self.CUSTOMER_ID = self.config_secret_debug["NAVER_SEARCH"]["CUSTOMER_ID"]
        self.SECRET_KEY = self.config_secret_debug["NAVER_SEARCH"]["CLIENT_SECRET"]
        self.api_key = self.config_secret_debug["NAVER"]["CLIENT_ID"]
        self.secret_key = self.config_secret_debug["NAVER"]["CLIENT_SECRET"]

    def get_search_header(self, method, uri):
        timestamp = str(round(time.time() * 1000))
        signature = signaturehelper.Signature.generate(timestamp, method, uri, self.SECRET_KEY)

        return {'Content-Type': 'application/json; charset=UTF-8',
                'X-Timestamp': timestamp,
                'X-API-KEY': self.API_KEY,
                'X-Customer': str(self.CUSTOMER_ID),
                'X-Signature': signature}

    def get_datalab_header(self):
        return {
            "Content-Type": "application/json",
            "X-Naver-Client-Id": self.api_key,
            "X-Naver-Client-Secret": self.secret_key
        }
