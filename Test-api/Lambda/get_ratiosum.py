import time
from get_datalab import get_datalab
from datetime import datetime
from datetime import timedelta
from dateutil.relativedelta import relativedelta


def get_ratiosum(keyword, time_unit):

    month_ago = str(datetime.now() - relativedelta(months=1))[:10]
    day_ago = str(datetime.now()-timedelta(days=1))[:10]
    
    datalab_r = get_datalab(keyword, "2016-01-01", day_ago, time_unit)

    try:
        dlab_list = datalab_r["results"][0]["data"]
        if dlab_list: # datalab_r 결과 값이 존재할 때
            month_index = next((index for (index, d) in enumerate(dlab_list) if d["period"] == month_ago), None)
            dlab_list = dlab_list[month_index:]
            ratio_sum = sum(dlab_list[i]["ratio"] for i in range(len(dlab_list)))
    except:
        ratio_sum = 0
            

    return ratio_sum
