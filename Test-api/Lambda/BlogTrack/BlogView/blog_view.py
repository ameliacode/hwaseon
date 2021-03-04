def find_key_auto(number):
    testlist = []
    testlist.append(nickname)
    testlist.append(str(number) + "번째")
    testlist.append(tlist[number])
    req = requests.get(linklist[number])
    req = req.text
    soup = BeautifulSoup(req, 'html.parser')
    ### 태그가져오기
    if soup.find(class_='post_tag') == None:
        testlist.append(None)
    else:
        tags = soup.find(class_='post_tag').text
        tags = tags.replace("\n", "")
        tags = tags.split("#")
        tags = list(filter(None, tags))
        ### 해시 태그와 제목의 중복값 리스트 만들기
        samelist = []
        for i in tags:
            if i in tlist_no_space[number]:
                samelist.append(i)
            else:
                pass

        ### 가장 긴 키워드를 메인키워드로 하기
        ### 값이 같을시, 먼저 써있는게 우선으로 나옴
        if samelist == []:
            testlist.append('일치 없음')
        else:
            best = 0
            for index in range(len(samelist)):
                if len(samelist[index]) > len(samelist[best]):
                    best = index
            testlist.append(samelist[best])
    testlist.append(linklist[number])

    key_auto_list.append(testlist)