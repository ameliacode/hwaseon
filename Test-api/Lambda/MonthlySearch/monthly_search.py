from get_ratiosum import get_ratiosum
from get_searchad import get_searchad


def monthly_search(keyword, time_unit):

    search_r = get_searchad(keyword, time_unit)

    pc = search_r["monthlyPcQcCnt"]
    mobile = search_r["monthlyMobileQcCnt"]
    total = pc + mobile
    prev_month = None

    try:
        ratio_sum = get_ratiosum(keyword, time_unit)
        if ratio_sum != 0:
            prev_month = int(total / ratio_sum)
    except:
        prev_month = None

    result = {"relKeyword":keyword,
              "pc": pc,
              "mobile": mobile,
              "total": total,
              "prevMonth" : prev_month
              }

    return result
