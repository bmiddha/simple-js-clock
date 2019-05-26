import getData from "./getData";

import "./main.scss";


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
    updateTime();
    getData();
    switcher();
    setInterval(updateTime, 5000);
    setInterval(getData, 60000);
    setInterval(switcher, 5000);
}