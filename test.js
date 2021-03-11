function getUserTracks(){

    const activities_link = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=smerdy&api_key=a3394ed77f14de87fddf4288c5480c26&format=json&from=1613671462&to=1613672269`
    fetch(activities_link)
        .then((res) => console.log(res.json()))
}
