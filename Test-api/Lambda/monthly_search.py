import requests
import json
import time
from get_datalab import get_datalab
from get_searchad import get_searchad
from get_headers import GetHeader
from dateutil.relativedelta import relativedelta
from datetime import datetime
from datetime import timedelta

def monthly_search(keyword, time_unit):

    month_ago = str(datetime.now() - relativedelta(months=1))[:10]
    day_ago = str(datetime.now()-timedelta(days=1))[:10]
    current_date = str(datetime.now())[:10]

    datalab_r = get_datalab(keyword, "2016-01-01", day_ago, time_unit)
    search_r = get_searchad(keyword, time_unit)

    pc = search_r["monthlyPcQcCnt"]
    mobile = search_r["monthlyMobileQcCnt"]
    total = pc + mobile
    prev_month = None

    dlab_list = datalab_r["results"][0]["data"]
    if dlab_list: # datalab_r 결과 값이 존재할 때
        month_index = next((index for (index, d) in enumerate(dlab_list) if d["period"] == month_ago), None)
        dlab_list = dlab_list[month_index:]
        ratio_sum = sum(dlab_list[i]["ratio"] for i in range(len(dlab_list)))
        if ratio_sum != 0:
            prev_month = int(total / ratio_sum)

    result = {"relKeyword":keyword,
              "PC": pc,
              "Mobile": mobile,
              "Total": total,
              "PrevMonth" : prev_month
              }









