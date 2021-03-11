import requests
import urllib3
import datetime as dt
from datetime import datetime
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

auth_url = "https://www.strava.com/oauth/token"
activities_url = "https://www.strava.com/api/v3/athlete/activities"

payload = {
    'client_id': "61540",
    'client_secret': 'c4549adebe10726af65914cade2b527d4fb60e47',
    'refresh_token': 'a100cdbc13e707ca5efdba5201b03ef251fe889f',
    'grant_type': "refresh_token",
    'f': 'json'
}

print("Requesting Token... \n")
res = requests.post(auth_url, data=payload, verify=False) #can be set to true
access_token = res.json()['access_token']
print("Access token = {}\n".format(access_token))

header = {'Authorization': 'Bearer ' + access_token}
param = {'per_page': 200, 'page':1}
my_dataset = requests.get(activities_url, headers=header, params=param).json()

#for entry in my_dataset['name']:
    #print(entry['name'])

startDate = my_dataset[0]['start_date']
date_time_obj = dt.datetime.strptime(startDate, "%Y-%m-%dT%H:%M:%SZ") #import datetime as dt
unixStartTime = datetime.timestamp(date_time_obj) #from datetime import datetime   see: https://stackoverflow.com/questions/15707532/import-datetime-v-s-from-datetime-import-datetime
unixEndTime = unixStartTime + float(my_dataset[0]['elapsed_time']) #calculate end time
print(unixStartTime)
print(unixEndTime)
#print(my_dataset[0]['start_date'])
print(my_dataset[0]['elapsed_time'])
print(my_dataset[0]['max_heartrate'])
