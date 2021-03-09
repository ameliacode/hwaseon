import json
import requests
from bs4 import BeautifulSoup
import concurrent.futures

class GetData:
    def __init__(self):
        self.jsonList = []

    def blog_kwdauto(self, item):
        kwdautoJson = {}

        req = requests.get(item["url"])
        req = req.text
        soup = BeautifulSoup(req, "html.parser")
        if soup.find(class_='post_tag') == None:
            tagResult = None
        else:
            tags = soup.find(class_='post_tag').text
            tags = tags.replace("\n", "")
            tags = tags.split("#")
            tags = list(filter(None, tags))

            sameList = []
            for tag in tags:
                if tag in item["title"].replace(" ", ""):
                    sameList.append(tag)
                else:
                    pass

            if sameList is None:
                tagResult = "일치 없음"
            else:
                sameList = sorted(sameList, key=len)
                tagResult = sameList[0]

        kwdautoJson["title"] = item["title"]
        kwdautoJson["url"] = item["url"]
        kwdautoJson["keyword"] = tagResult

        self.jsonList.append(kwdautoJson)

    def multithreading(self, event):
        ### 멀티쓰레드 ###
        linkList = json.loads(event)

        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.map(self.blog_kwdauto, linkList)

        return self.jsonList




