import { getData, Config } from "./getData";

import "./main.scss";

const defaultConfig: Config = {
    ctaBusStops: ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"],
    ctaTrainStations: ["40350"],
    weatherCity: "Chicago",
    eventCalendars: ["kc72g1ctfg8b88df34qqb62d1s@group.calendar.google.com"],
}

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateTime(): void {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes().toString().padStart(2, "0");
    const date = now.getDate().toString().padStart(2, "0");
    const hourstr = ((hour > 12) ? (hour - 12) : hour).toString().padStart(2, "0");

    timeElement.innerHTML = `${hourstr}:${min}`;
    dateElement.innerHTML = `${days[now.getDay()]} | ${months[now.getMonth()]} ${date}`;
}

const switcherElements = document.querySelectorAll<HTMLDivElement>("#switcher > div");
let counter = 0;
function switcher(): void {
    if (counter == switcherElements.length) counter = 0;
    let previous = (counter == 0) ? switcherElements.length - 1 : counter - 1;
    switcherElements[previous].style.left = "-1500px";
    switcherElements[counter].style.left = "0px";
    counter++;
}

window.onload = (): void => {
    const urlParams = new URLSearchParams(window.location.search);

    updateTime();
    switcher();
    setInterval(updateTime, 5000);
    setInterval(switcher, 5000);

    if (urlParams.has("offline")) {
        document.getElementById("offlineMode").style.display = "block";
    } else {
        document.getElementById("offlineMode").style.display = "none";
        let config: Config = defaultConfig;
        if (urlParams.has("config")) {
            config = {
                ctaBusStops: urlParams.get("ctabusstops").split(","),
                ctaTrainStations: urlParams.get("ctatrainstations").split(","),
                weatherCity: urlParams.get("weathercity"),
                eventCalendars: urlParams.get("eventcalendars").split(","),
            };
            console.log("a", config);
        }
        getData(config);
        console.log(config);
        // TODO: Pass config parameter
        setInterval(getData, 60000, config);
    }
}