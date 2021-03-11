const auth_link = "https://www.strava.com/oauth/token"
var lastFMUser 
//var workoutArray = []

class userWorkout {
    constructor(obj_name, start_date, elapsed_time, average_heartrate, average_speed, max_heartrate, max_speed, suffer_score) {
        //this.key = key;
        this.obj_name = obj_name
        this.start_date = start_date;
        this.elapsed_time = elapsed_time;
        this.average_heartrate = average_heartrate;
        this.average_speed = average_speed;
        this.max_heartrate = max_heartrate;
        this.max_speed = max_speed;
        this.suffer_score = suffer_score;
    }
    convertToUnix(start_date, elapsed_time) {
        var startDateUnix = new Date(start_date).valueOf() / 1000;
        this.startDateUnix = startDateUnix;
        //console.log(startDateUnix)
        var endDateUnix = startDateUnix + elapsed_time;
        this.endDateUnix = endDateUnix;
       // console.log(endDateUnix)
    }
 
    getUserTracks(startDateUnix, endDateUnix){
        const activities_link = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFMUser}&api_key=a3394ed77f14de87fddf4288c5480c26&format=json&from=${startDateUnix}&to=${endDateUnix}`
        //console.log(lastFMUser)
        //console.log(endDateUnix)
       // var songsLisened = {};
        ///var songsListened
        //var test = 
        //debugger;
        fetch(activities_link)
        .then(res => res.json())
        .then(res => this.makeSongs(res))
        //debugger;
        //.then(data => this.songsListened = data)
        //.then(res => getSongs(res))
        //this.songsListened = songsListened;
        //var test = songsListened['[[PromiseResult]]']['recenttracks']['track'];
        //this.test = test;
        //.then(this.songsListened = res);
        //this.songsListened = songsListened;
    }

    makeSongs(res) {
        var songsListened = res;
        this.songsListened = songsListened;
        var testArray = []
        this.testArray = testArray;

        for (var key of Object.keys(this.songsListened.recenttracks)) {
            this.testArray.push(track)
            ///var name = String("Workout " + key);
            //console.log(name)
        }
        
    }
}

function getUserName(){
    lastFMUser = document.getElementById("lastfm_username").value
    console.log(lastFMUser)
}

/*function arrayTest(){
    var bestHeartrate;
    for (var j = 0; j < workoutArray.length-1; j++){
        if((workoutArray[j].max_heartrate > workoutArray[j+1].max_heartrate) && (workoutArray[j].max_heartrate > bestHeartrate.max)){
            bestHeartrate = workoutArray[j].max_heartrate;
        }
      }
    console.log(bestHeartrate.obj_name);
    console.log(bestHeartrate.max_heartrate);
    console.log(workoutArray.length)
}*/

function getBest(workoutArray){
    bestMaxHeartrate = workoutArray.sort(function(a, b){return b.max_heartrate - a.max_heartrate})[0];
    bestMaxSpeed = workoutArray.sort(function(a, b){return b.max_speed - a.max_speed})[0];
    bestSufferScore = workoutArray.sort(function(a, b){return b.suffer_score - a.suffer_score})[0];
    bestAverageSpeed = workoutArray.sort(function(a, b){return b.average_speed - a.average_speed})[0];
    bestAverageHeartrate = workoutArray.sort(function(a, b){return b.average_heartrate - a.average_heartrate})[0];
    
    console.log(bestMaxHeartrate.obj_name);  
    console.log(bestMaxHeartrate.max_heartrate);
    console.log(bestMaxHeartrate);
    console.log(bestSufferScore.obj_name);
    console.log(bestSufferScore);
    console.log("Suffer Score: " + bestSufferScore.suffer_score);
    console.log(bestSufferScore.songsListened);
    console.log("test array: " + bestSufferScore.testArray);

}

function getActivities(res){
    console.log(res);
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}` ///json access token generated from reAuthorize
    fetch(activities_link)
        
        //.then(res => console.log(res.json()))
        .then(res => res.json())
            .then(res => makeVar(res));
        //.then((res) => stravaOutput = res.json())
        ///console.log(res);
        //var stravaOutput = JSON.stringify(res)
        //console.log(stravaOutput);
        //document.getElementById("demo").innerHTML = stravaOutput;
        //createWorkoutObjects(stravaOutput)
        //getUserTracks()
}

function makeVar(res){
    var workoutArray = []
    var stravaOutput = res;
    /*for (var key in stravaOutput) {
        if (stravaOutput.hasOwnProperty(key)) {
            console.log(key +"->" + stravaOutput[key]);
        }
    }*/
    for (var key of Object.keys(stravaOutput)) {
        /*if ((stravaOutput[key]['suffer_score']) < (stravaOutput[key+1]['suffer_score'])){
            console.log("yeet")
        }*/
        //console.log(key + " -> " + stravaOutput[key]['suffer_score'])
        var name = String("Workout " + key);
        //var k = "Workout";
        //console.log(eval('var ' + k + key));
        //console.log(name)
        let workoutObj = new userWorkout(
            name,
            stravaOutput[key]['start_date'],
            stravaOutput[key]['elapsed_time'],
            stravaOutput[key]['average_heartrate'],
            stravaOutput[key]['average_speed'],
            stravaOutput[key]['max_heartrate'],
            stravaOutput[key]['max_speed'],
            stravaOutput[key]['suffer_score'])

        //console.log(workoutObj);
        workoutObj.convertToUnix(workoutObj.start_date, workoutObj.elapsed_time);
       // console.log(workoutObj.startDateUnix, workoutObj.endDateUnix)
        workoutObj.getUserTracks(workoutObj.startDateUnix, workoutObj.endDateUnix);
        //console.log(workoutObj.songsListened);
        workoutArray.push(workoutObj)
        //debugger;
        document.getElementById("Name").innerHTML = JSON.stringify(workoutObj.obj_name)
        document.getElementById("Elapsed").innerHTML = JSON.stringify(workoutObj.elapsed_time)
        document.getElementById("Max Speed").innerHTML = JSON.stringify(workoutObj.max_speed)
        document.getElementById("Max Heartrate").innerHTML = JSON.stringify(workoutObj.max_heartrate)
        console.log(workoutObj);
                //String(workoutObj.songsListened['recenttracks']['track']);
    }
    //console.log(testObj['start_date'])
    /*for(var i = 0; i < stravaOutput.length; i++) {
        //var obj = stravaOutput[i];
    
        console.log(stravaOutput[i]['start_time']);
    } */
    //document.getElementById("demo").innerHTML = stravaOutput;
    getBest(workoutArray);
    //console.log(stravaOutput);
    
}

/*function createObjectList(stravaOutput) {
    
    for(var i = 0; i < stravaOutput.length; i++) {
        var obj = stravaOutput[i];
    
        console.log(obj.id);
    } 
}

function getUserTracks2(res){

    const activities_link = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=smerdy&api_key=a3394ed77f14de87fddf4288c5480c26&format=json&from=1613671462&to=1613672269`
    fetch(activities_link)
        .then((res) => console.log(res.json()))
        var userTrackOutput = JSON.stringify(res)
}*/

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '61540',
            client_secret: 'c4549adebe10726af65914cade2b527d4fb60e47',
            refresh_token: 'a100cdbc13e707ca5efdba5201b03ef251fe889f',
            grant_type: 'refresh_token'
        })
    }).then(res => res.json()) //after fetch, turns result into json format
        .then(res => getActivities(res)) //then calls the getActivities function with the json result
          
}

//reAuthorize()