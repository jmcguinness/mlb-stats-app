
import requests
import json
import pandas as pd

BASE = 'https://statsapi.mlb.com/api/v1'
BASE_ESPN = 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams'
gameInfo = []
logoDict = {}

def http_get(url):

    params = {
        "sportId": 1,
        "startDate": "07/25/2025",
        "endDate": "07/26/2025",
    }

    try:

        s = requests.get(f"{url}/schedule", params=params)
        if s.status_code == 200:
            response = s.json()
        
        for i in response['dates']: 
            for c in i['games']:
                if i['date'] == '2025-07-25' and c['status']['detailedState'] == 'Final':

                    print(i)

                    gameInfo.append({
                        'Home Team': c['teams']['home']['team']['name'],
                        'Home Team Score': c['teams']['home']['score'],
                        'Away Team': c['teams']['away']['team']['name'],
                        'Away Team Score': c['teams']['away']['score'],
                    })

                elif i['date'] == '2025-07-25' and c['status']['detailedState'] == 'Postponed': 
                    
                    gameInfo.append({
                        'Home Team': c['teams']['home']['team']['name'],
                        'Home Team Score': 'PPD',
                        'Away Team': c['teams']['away']['team']['name'],
                        'Away Team Score': 'PPD',
                    })


        df = pd.DataFrame(gameInfo)
        df.to_csv('mlb_scores.csv', index=False)

    
    except requests.exceptions.HTTPError as errHttp:

        print(f"HTTP Error: {errHttp}")

    except requests.exceptions.Timeout as errTime:

        print(f"Timeout Error: {errTime}")

def get_logo(url):

    try:

        response = requests.get(url=url)
        response_json = response.json()

        for i in response_json['sports']:
            for c in i['leagues']:
                for t in c['teams']:
                    
                    logoDict[t['team']['displayName']] = t['team']['logos'][0]['href']

        print(logoDict)
    
    except requests.exceptions.HTTPError as errHttp:

        print(f"HTTP Error: {errHttp}")
        
    

# http_get(BASE)

get_logo(BASE_ESPN)
