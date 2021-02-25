from monthly_search import monthly_search
import json

def lambda_handler(event, context):
    #event: { keyword: encText, time_unit: time_unit }

    return {"statusCode":200, "body": json.dumps(monthly_search(event["keyword"], event["time_unit"]))}

