var colors = ["#303030", "#01579B","#006064","#304FFE","#004D40"];
var images = ["http://flourishconf.com/2019/assets/images/tagline.png","http://flourishconf.com/2019/assets/images/logo.png","https://acm.cs.uic.edu/wiki/_media/logos:website-logo-replacement-2017.png", "https://lug.cs.uic.edu/LUG_logo_Non-UIC.png"]
var city = 12778674;
function getWeather(){
    var xhr = new XMLHttpRequest();
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20"+city+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    xhr.open("GET",url,true);
    xhr.send(); 
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){ 
            var w = JSON.parse(xhr.responseText);
            document.querySelector("#weather").innerHTML = w.query.results.channel.item.condition.temp + "&#176;F<br>" +  w.query.results.channel.item.condition.text;
        };
    }
}


function startTime() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var day = days[today.getDay()];
    if (hour >= 12){
        hour = hour - 12;
    }
    min = addZero(min);
    sec = addZero(sec);
    hour = addZero(hour);
    date = addZero(date);
    month = addZero(month);
    // ampm = (hour >= 12) ? "PM" : "AM";
    document.getElementById('time').innerHTML = hour + ":" + min + ":" + sec;
    document.getElementById('date').innerHTML = day + "," + month + "/" + date + "/" + year;
    var timeFunction = setTimeout(startTime, 500);
}
function addZero(i) {
    if (i < 10) {i = "0" + i};
    return i;
}



var counter = 0;

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