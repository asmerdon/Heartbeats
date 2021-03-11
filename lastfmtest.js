function doThing(){
    const request = new XMLHttpRequest();

    request.open('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=smerdy&api_key=a3394ed77f14de87fddf4288c5480c26&format=json&from=1610469879&to=1610471043');
    request.send(); 
    
    request.onload = () => {
        if (request.status === 200) {
    
            // look at the response
            console.log(request.response);
    
            const recenttracks = JSON.parse(request.response).recenttracks;
    
            if (!recenttracks.track || !recenttracks.track.length) {
              console.log('track is empty');
              return;
            }
    
            const song = recenttracks.track[0].name;
    
            console.log(song);  
        } 
    };
    
    request.onerror = () => {
    console.log("error")
    };
}

