import time
import json
from bs4 import BeautifulSoup
import starter as st


def blog_post(id):
    driver = st.start_drive()
    driver.get('https://m.blog.naver.com/' + id)
    driver.find_element_by_class_name("btn_list").click()
    time.sleep(0.5)

    req = driver.page_source
    soup = BeautifulSoup(req, 'html.parser')

    driver.close()

    postlist = soup.find_all(class_="postlist")

    jsonList = []
    for post in postlist:
        postItem = {}
        url = "https://m.blog.naver.com/" + id + post["id"].replace('pl_', '/')
        title = post.find(class_="title ell").text
        postItem["title"] = title
        postItem["url"] = url
        jsonList.append(postItem)
    return jsonList