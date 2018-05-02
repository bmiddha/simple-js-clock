var colors = ["#303030", "#01579B","#006064","#304FFE","#004D40"];
var images = ["http://flourishconf.com/2019/assets/images/tagline.png","http://flourishconf.com/2019/assets/images/logo.png","https://acm.cs.uic.edu/wiki/_media/logos:website-logo-replacement-2017.png", "https://lug.cs.uic.edu/LUG_logo_Non-UIC.png"]
var city = 12778674;
var counter = 0;

function getWeather(){
    let xhr = new XMLHttpRequest();
    let url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20"+city+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    xhr.open("GET",url,true);
    xhr.send(); 
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){ 
            let w = JSON.parse(xhr.responseText);
            let temp = w.query.results.channel.item.condition.temp;
            let text = w.query.results.channel.item.condition.text;
            let metric = Math.round((temp - 32) * (5/9));
            document.querySelector("#weather").innerHTML = text + "<br>Feels Like<br>" + temp + "&#176;F|" + metric + "&#176;C";
        }
    }
    setTimeout(getWeather,100000);
}


function startTime() {
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let day = days[today.getDay()];
    hour = (hour >= 12) ? (hour - 12) : hour;
    min = addZero(min);
    sec = addZero(sec);
    hour = addZero(hour);
    date = addZero(date);
    month = addZero(month);
    document.getElementById('time').innerHTML = hour + ":" + min + ":" + sec;
    document.getElementById('date').innerHTML = day + "," + month + "/" + date + "/" + year;
    setTimeout(startTime, 500);
}
function addZero(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

function fadeIn(el){
    el.style.opacity = 0;
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            setTimeout(fade, 40);
        } 
    })();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function cycleImages() {
    fadeIn(document.querySelector("#message>img"));
    document.querySelector("#message>img").src = images[counter%images.length];
    counter++;
    setTimeout(cycleImages,20000)
}

function colorChanger(){
    document.body.style.backgroundColor = colors[getRandomInt(colors.length)];
    setTimeout(colorChanger, 10000);
}

cycleImages();
colorChanger();
getWeather();
