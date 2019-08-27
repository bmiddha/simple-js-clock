import { getData } from "./getData";
import "./main.scss";

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface StringIndexes {
    [key: string]: string;
}

const demoData: StringIndexes = {
    "bus": '<li class=busItem><span class="icon route">8</span><span class=eta>19m</span><span class=direction>Test</span><li class=busItem><span class="icon route">8</span><span class=eta>19m</span><span class=direction>Test</span><li class=busItem><span class="icon route">8</span><span class=eta>19m</span><span class=direction>Test</span><li class=busItem><span class="icon route">8</span><span class=eta>9m</span><span class=direction>Test</span><li class=busItem><span class="icon route">8</span><span class=eta>9m</span><span class=direction>Test</span><li class=busItem><span class="icon route">8</span><span class=eta>9m</span><span class=direction>Test</span>',
    "train": '<li class=trainItem><i class="fa fa-train icon"style=background-color:#00f></i><span class=eta style=color:#00f;border-color:#00f>19m</span><span class=direction>O\'Hare</span><li class=trainItem><i class="fa fa-train icon"style=background-color:#00f></i><span class=eta style=color:#00f;border-color:#00f>19m</span><span class=direction>O\'Hare</span><li class=trainItem><i class="fa fa-train icon"style=background-color:#00f></i><span class=eta style=color:#00f;border-color:#00f>19m</span><span class=direction>O\'Hare</span><li class=trainItem><i class="fa fa-train icon"style=background-color:#00f></i><span class=eta style=color:#00f;border-color:#00f>19m</span><span class=direction>O\'Hare</span>',
    "weather": '<i class="owi owi-04n"id=weather-icon></i><p id=weather-condition>Cloudy<p id=weather-temperature>72 °F<br>32 °C',
    "messages": '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eveniet pariatur sed expedita</p>',
    "events": '<ul><li class="event happeningNow"><div class=eventName><span>Test Event 1</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 2</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 3</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 4</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 5</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 6</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 7</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div><li class=event><div class=eventName><span>Test Event 8</span></div><div class=eventDate><i class="fas icon fa-calendar-alt"></i><span>May 25</span></div><div class=eventTime><i class="fas icon fa-clock"></i><span>02:00 PM - 04:00 PM</span></div><div class=eventLocation><i class="fas icon fa-map-marker-alt"></i><span>SELE 2264</span></div></ul>'
}

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
    const mode = window.location.pathname.split("/")[1];
    updateTime();
    setInterval(updateTime, 5000);
    if (switcherElements.length > 1) {
        switcher();
        setInterval(switcher, 10000);
    }

    switch (mode) {
        case "demo":
            for (let key in demoData) {
                document.getElementById(`${key}`).innerHTML = demoData[key];
            }
        case "offline":
            document.getElementById(`${mode}Mode`).style.display = "block";
            break;
        default:
            getData();
            setInterval(getData, 60000);
            break;
    }

    window.onkeydown = (e: KeyboardEvent): void => {
        switch (e.code) {
            case "KeyR":
                window.location.reload();
                break;
            case "KeyD":
                if (confirm("Are you sure that you want to load the default configuration?"))
                    window.location.pathname = "/";
                break;
            case "KeyC":
                document.getElementById("config").style.display = "block";
                break;
            case "Escape":
                document.getElementById("config").style.display = "none";
                break;
        }
    }

    setInterval((): void => {
        window.location.reload();
    }, 7200000); 
}