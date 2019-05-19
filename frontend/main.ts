import getData from "./getData";

import "./main.scss";
import "../public/images/asfalt-light.png";


const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const mapElement = document.getElementById("map");
const ctaElement = document.getElementById("cta");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function startTime(): void {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes().toString().padStart(2,"0");
    const sec = now.getSeconds().toString().padStart(2,"0");
    const date = now.getDate().toString().padStart(2,"0");
    const month = (now.getMonth() + 1).toString().padStart(2,"0");
    const year = now.getFullYear();
    const day = days[now.getDay()];
    const hourstr = ((hour > 12) ? (hour - 12) : hour).toString().padStart(2,"0");
    
    timeElement.innerHTML = `${hourstr}:${min}:${sec}`;
    dateElement.innerHTML = `${day}, ${month}/${date}/${year}`;
}

let curOpacity = 1;
function transitMapSwitch(): void {
    if (curOpacity == 0) {
        curOpacity = 1;
        ctaElement.style.display = "none";
        mapElement.style.display = "block";
        ctaElement.style.opacity = "1";
        mapElement.style.opacity = curOpacity.toString();
    } else {
        curOpacity = 0;
        ctaElement.style.display = "block";
        mapElement.style.display = "none";
        ctaElement.style.opacity = "1";
        mapElement.style.opacity = curOpacity.toString();
    }

}

setInterval(startTime, 500);
setInterval(transitMapSwitch, 15000);
setInterval(getData, 60000);