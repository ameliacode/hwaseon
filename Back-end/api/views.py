import json
import os
import sys
import urllib.request

from django.shortcuts import render

# Create your views here.

def search(param_dict, encText):

    config_secret_debug = json.loads(open(".config_secret/settings_debug.json").read())
    client_id = config_secret_debug["NAVER"]["CLIENT_ID"]
    client_secret = config_secret_debug["NAVER"]["CLIENT_SECRET"]

    url = "https://openapi.naver.com/v1/search/blog?query=" + encText # json 결과
    body = param_dict
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    request.add_header("Content-Type","application/json")
    response = urllib.request.urlopen(request, data=body.encode("utf-8"))
    rescode = response.getcode()

    if(rescode==200):
        response_body = response.read()
        print(response_body.decode('utf-8'))
    else:
        print("Error Code:" + rescode)