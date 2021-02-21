import time
import signaturehelper
import json

<<<<<<< HEAD
class GetHeader:

    def __init__(self):
        self.config_secret_debug = json.loads(open(".config_secret/settings_debug.json").read())
        self.API_KEY = self.config_secret_debug["NAVER_SEARCH"]["CLIENT_ID"]
        self.CUSTOMER_ID = self.config_secret_debug["NAVER_SEARCH"]["CUSTOMER_ID"]
        self.SECRET_KEY = self.config_secret_debug["NAVER_SEARCH"]["CLIENT_SECRET"]
        self.api_key = self.config_secret_debug["NAVER"]["CLIENT_ID"]
        self.secret_key = self.config_secret_debug["NAVER"]["CLIENT_SECRET"]

    def get_search_header(self, method, uri):
=======
class GetHeader():

    config_secret_debug = json.loads(open(".config_secret/settings_debug.json").read())
    API_KEY = config_secret_debug["NAVER_SEARCH"]["CLIENT_ID"]
    CUSTOMER_ID = config_secret_debug["NAVER_SEARCH"]["CUSTOMER_ID"]
    SECRET_KEY = config_secret_debug["NAVER_SEARCH"]["CLIENT_SECRET"]
    api_key = config_secret_debug["NAVER"]["CLIENT_ID"]
    secret_key = config_secret_debug["NAVER"]["CLIENT_SECRET"]

    def get_search_header(self, method, uri, api_key, secret_key, customer_id):
>>>>>>> b8b78118e8555f273aeead5bfb8fd0a23fd404a2
        timestamp = str(round(time.time() * 1000))
        signature = signaturehelper.Signature.generate(timestamp, method, uri, self.SECRET_KEY)
        
        return {'Content-Type': 'application/json; charset=UTF-8', 
                'X-Timestamp': timestamp, 
                'X-API-KEY': self.API_KEY,
                'X-Customer': str(self.CUSTOMER_ID),
                'X-Signature': signature}

<<<<<<< HEAD
    def get_datalab_header(self):
        return {
            "Content-Type":"application/json",
            "X-Naver-Client-Id": self.api_key,
            "X-Naver-Client-Secret": self.secret_key
=======
    def get_datalab_header(self, api_key, secret_key):
        return {
            "Content-Type":"application/json",
            "X-Naver-Client-Id": api_key,
            "X-Naver-Client-Secret":secret_key        
>>>>>>> b8b78118e8555f273aeead5bfb8fd0a23fd404a2
        }
