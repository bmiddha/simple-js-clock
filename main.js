var colors = ["#00293C", "#626D71", "#282655", "#662E1C", "#4C3F54", "#231B12", "#301B28", "#563E20"]
var images = ["http://flourishconf.com/2019/assets/images/tagline.png","http://flourishconf.com/2019/assets/images/logo.png","https://acm.cs.uic.edu/wiki/_media/logos:website-logo-replacement-2017.png", "https://lug.cs.uic.edu/LUG_logo_Non-UIC.png"]


function startTime() {
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    min = addZero(min);
    sec = addZero(sec);
    hour = addZero(hour);
    date = addZero(date);
    month = addZero(month);
    document.getElementById('time').innerHTML = hour + ":" + min + ":" + sec;
    document.getElementById('date').innerHTML = month + "/" + date + "/" + year;
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