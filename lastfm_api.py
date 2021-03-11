import requests
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

userSongsURL = "http://ws.audioscrobbler.com/2.0/?method="

payload = {
    'method': 'user.getrecenttracks',
    'user': 'smerdy',
    'api_key': 'a3394ed77f14de87fddf4288c5480c26',
    'format': '1613671462',
    'from': '1613672269'
}

print("Requesting Songs... \n")
res = requests.get(userSongsURL, data=payload, verify=False).json()
print(res)
