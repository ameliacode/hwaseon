from get_datalab import get_datalab
from datetime import datetime 
from datetime import timedelta
import json

def graph(keyword, start_date, end_date, btn_input):
    current_date = str(datetime.now()-timedelta(days=1))[:10]

    startDate = int(start_date.replace("-",""))
    endDate = int(end_date.replace("-",""))
    
    result = []
    if btn_input == "recent_month":
        data = get_datalab(keyword, "2016-01-01", current_date, "date")
        dataList = data["results"][0]["data"]
        for datum in dataList:
            period = int(datum["period"].replace("-",""))
            if period >= startDate:
                result.append(datum)
                
    elif btn_input == "recent_year":
        data = get_datalab(keyword, "2016-01-01", current_date, "month")
        dataList = data["results"][0]["data"]
        for datum in dataList:
            period = int(datum["period"].replace("-",""))
            if period >= startDate:
                result.append(datum)
                
    elif btn_input == "recent_five":
        data = get_datalab(keyword, "2016-01-01", current_date, "month")
        dataList = data["results"][0]["data"]
        result = dataList

    print(result)
    return result


with open("result.json","w", encoding="utf-8") as make_file:
    json.dump(graph("폼클렌징", "2021-02-04","2021-02-25","recent_month"), make_file, ensure_ascii=False, indent="\t")
