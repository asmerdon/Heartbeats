function getUserTracks(res){

    const activities_link = `http://ws.audioscrobbler.com/2.0/?method=${res.access_token}`
    fetch(activities_link)
        .then((res) => console.log(res.json()))
        var stravaOutput = JSON.stringify(res)
}