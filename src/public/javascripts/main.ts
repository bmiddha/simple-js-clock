const busStops = ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"];
const trainStations = ["40350"];
const city = "Chicago";
const googleMapSettings = {
    zoom: 12.5,
    center: { lat: 41.8761, lng: -87.7596 }
};

function getApiData(type: string, arg: string, value: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = "http://localhost:8080/api/" + type + "?" + arg + "=" + value;
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data;
                if (xhr.responseText) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                resolve(data);
            }
            else reject(xhr.status);
        };
    });
}

function startTime() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const hour = today.getHours();
    const min = addZero(today.getMinutes());
    const sec = addZero(today.getSeconds());
    const date = addZero(today.getDate());
    const month = addZero(today.getMonth() + 1);
    const year = today.getFullYear();
    const day = days[today.getDay()];
    const hourstr = addZero((hour > 12) ? (hour - 12) : hour);
    document.getElementById("time").innerHTML = hourstr + ":" + min + ":" + sec;
    document.getElementById("date").innerHTML = day + "," + month + "/" + date + "/" + year;
    setTimeout(startTime, 500);
}

function addZero(i: number): string {
    if (i < 10) return "0" + i;
    return i.toString();
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function initMap() {
    const map = new google.maps.Map(document.querySelector<HTMLInputElement>("#map"), googleMapSettings);
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

let curOpacity = 1;
function setOpacity() {
    if (curOpacity == 0) {
        curOpacity = 1;
        document.querySelector<HTMLInputElement>("#cta").style.display = "none";
        document.querySelector<HTMLInputElement>("#map").style.display = "block";
        document.querySelector<HTMLInputElement>("#cta").style.opacity = `${0}`;
        document.querySelector<HTMLInputElement>("#map").style.opacity = `${curOpacity}`;
    } else {
        curOpacity = 0;
        document.querySelector<HTMLInputElement>("#cta").style.display = "block";
        document.querySelector<HTMLInputElement>("#map").style.display = "none";
        document.querySelector<HTMLInputElement>("#cta").style.opacity = `${1}`;
        document.querySelector<HTMLInputElement>("#map").style.opacity = `${curOpacity}`;
    }

} setInterval(setOpacity, 15000);

function getData() {
    document.querySelector<HTMLInputElement>("#bus").innerHTML = "";
    getApiData("ctaBus", "bus", busStops.join(",")).then((result) => {
        const timeNow = new Date();
        for (let i = 0; i < result["bustime-response"].prd.length; i++) {
            const timeFromApi = result["bustime-response"].prd[i].prdtm;
            const prdTime = new Date(timeFromApi.slice(0, 4) + "/" + timeFromApi.slice(4, 6) + "/" + timeFromApi.slice(6, 16));
            const eta = Math.floor(Math.abs(prdTime - timeNow) / 1000 / 60);
            document.querySelector<HTMLInputElement>("#bus").innerHTML += "<li><i class='fa fa-bus'></i><span class=route>" + result["bustime-response"].prd[i].rt + "</span><span class=direction>" + result["bustime-response"].prd[i].rtdir + "</span><span class=eta>" + eta + " min</span></li>";
        }
    });
    document.querySelector<HTMLInputElement>("#train").innerHTML = "";
    for (let i = 0; i < trainStations.length; i++) {
        getApiData("ctaTrain", "train", trainStations[i]).then((result) => {
            const timeNow = new Date();
            for (let j = 0; j < result.ctatt.eta.length; j++) {
                const prdTime = new Date(result.ctatt.eta[j].arrT);
                const eta = Math.floor(Math.abs(prdTime - timeNow) / 1000 / 60);
                document.querySelector<HTMLInputElement>("#train").innerHTML += "<li><i class='fa fa-train'></i><span class=route>" + result.ctatt.eta[j].rt + "</span><span class=direction>" + result.ctatt.eta[j].destNm + "</span><span class=eta>" + eta + " min<span></li>";
            }
        });
    }

    setOpacity();

    getApiData("weather", "city", city).then((result) => {
        const temp = result.main.temp;
        const tempF = Math.round(temp * 9 / 5 - 459.67);
        const tempC = Math.round(temp - 273.15);
        document.querySelector<HTMLInputElement>("#weather-icon").className = "owi owi-" + result.weather[0].icon;
        document.querySelector<HTMLInputElement>("#weather-condition").innerHTML = result.weather[0].main;
        document.querySelector<HTMLInputElement>("#weather-temperature").innerHTML = tempF + "&#176;F<br>" + tempC + "&#176;C";
    });
    setTimeout(getData, 60000);
}

function updateEta() {
    console.log("updating eta");
    const time = document.querySelectorAll<HTMLInputElement>("li>.eta");
    const timeNow = new Date();
    console.log(timeNow);
    for (let i = 0; i < time.length; i++) {
        const arrival = time[i].innerHTML;
        const eta = parseInt(arrival.split(":")[0] + arrival.split(":")[1]) - parseInt(addZero(timeNow.getHours()) + "" + addZero(timeNow.getMinutes()));
        time[i].innerHTML = eta + " min";
        console.log(arrival, eta);
    }
    setTimeout(updateEta, 60000);
}

getData();
