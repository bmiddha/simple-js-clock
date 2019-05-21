import getData from "./getData";

import "./main.scss";
import "../public/images/asfalt-light.png";


const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateTime(): void {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes().toString().padStart(2,"0");
    const date = now.getDate().toString().padStart(2,"0");
    const hourstr = ((hour > 12) ? (hour - 12) : hour).toString().padStart(2,"0");
    
    timeElement.innerHTML = `${hourstr}:${min}`;
    dateElement.innerHTML = `${days[now.getDay()]} | ${months[now.getMonth()]} ${date}`;
}

window.onload = (): void => {
    updateTime();
    getData();

    setInterval(updateTime, 5000);
    setInterval(getData, 60000);
}