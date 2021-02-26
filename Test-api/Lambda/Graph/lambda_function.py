from graph import graph
import json

def lambda_handler(event, context):
    #event: { keyword: encText, time_unit: time_unit }

    return {"statusCode":200, "body": json.dumps(graph(event["keyword"], event["start_unit"]))}

