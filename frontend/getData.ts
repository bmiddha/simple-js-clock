const busStops = ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"];
const trainStations = ["40350"];
const city = "Chicago";

interface StringIndexes {
    [key: string]: string;
}

const ctaRouteColors: StringIndexes = {
    Red: "#c10000",
    Blue: "#03396c",
    Brown: "#560d0d",
    Green: "#004a2f",
    Orange: "#ff6337",
    Pink: "#ff3e6d",
    Purple: "#866ec7",
    Yellow: "#e4c666",
}

interface CtaBusPrediction {
    "tmstmp": string;
    "typ": string;
    "stpnm": string;
    "stpid": string;
    "vid": string;
    "dstp": number;
    "rt": string;
    "rtdd": string;
    "rtdir": "Eastbound" | "Westbound" | "Northbound" | "Southbound";
    "des": string;
    "prdtm": string;
    "tablockid": string;
    "tatripid": string;
    "dly": boolean;
    "prdctdn": string;
    "zone": string;
}

interface CtaBusError {
    "stpid": string;
    "msg": string;
}

interface CtaBusPredictions {
    "bustime-response": {
        "prd": CtaBusPrediction[];
        "error"?: CtaBusError[];
    };
}

interface CtaTrainPrediction {
    "staId": string;
    "stpId": string;
    "staNm": string;
    "stpDe": string;
    "rn": string;
    "rt": string;
    "destSt": string;
    "destNm": string;
    "trDr": string;
    "prdt": Date;
    "arrT": Date;
    "isApp": string;
    "isSch": string;
    "isDly": string;
    "isFlt": string;
    "flags": boolean;
    "lat": string;
    "lon": string;
    "heading": string;
}

interface CtaTrainPredictions {
    "ctatt": {
        "tmst": string;
        "errCd": string;
        "errNm": number;
        "eta": CtaTrainPrediction[];
    };
}

interface Weather {
    "id": number;
    "main": string;
    "description": string;
    "icon": string;
}

interface WeatherForecast {
    "weather": Weather[];
    "main": {
        "temp": number;
        "pressure": number;
        "humidity": number;
        "temp_min": number;
        "temp_max": number;
    };
}

export default function getData(): void {
    document.getElementById("bus").innerHTML = "";
    fetch(`http://localhost:8080/api/ctaBus?bus=${busStops.join(",")}`).then((res): Promise<CtaBusPredictions> => res.json()).then((result): void => {
        const timeNow = new Date();
        for (let i = 0; i < result["bustime-response"].prd.length; i++) {
            const timeFromApi = result["bustime-response"].prd[i].prdtm;
            const prdTime = new Date(timeFromApi.slice(0, 4) + "/" + timeFromApi.slice(4, 6) + "/" + timeFromApi.slice(6, 16));
            const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
            document.getElementById("bus").innerHTML += `<li class='busItem'><span class='route icon'>${result["bustime-response"].prd[i].rt}</span><span class='eta'>${eta}m</span><span class='direction'>${result["bustime-response"].prd[i].rtdir}"</span></li>`;
        }
    });
    
    document.getElementById("train").innerHTML = "";
    for (let i = 0; i < trainStations.length; i++) {
        fetch(`http://localhost:8080/api/ctaTrain?train=${trainStations[i]}`).then((res): Promise<CtaTrainPredictions> => res.json()).then((result): void => {
            const timeNow = new Date();
            for (let j = 0; j < result.ctatt.eta.length; j++) {
                const prdTime = new Date(result.ctatt.eta[j].arrT);
                const eta = Math.floor(Math.abs(prdTime.valueOf() - timeNow.valueOf()) / 1000 / 60);
                const routeColor = ctaRouteColors[result.ctatt.eta[j].rt];
                document.getElementById("train").innerHTML += `<li class='trainItem'><i class='fa fa-train icon' style=background-color:${routeColor};></i><span class='eta' style=color:${routeColor};border-color:${routeColor};>${eta}m</span><span class='direction'>${result.ctatt.eta[j].destNm}</span></li>`;
            }
        });
    }
    fetch(`http://localhost:8080/api/weather?city=${city}`).then((res): Promise<WeatherForecast> => res.json()).then((result): void => {
        const temp = result.main.temp;
        const tempF = Math.round(temp * 9 / 5 - 459.67);
        const tempC = Math.round(temp - 273.15);
        document.getElementById("weather-icon").className = "owi owi-" + result.weather[0].icon;
        document.getElementById("weather-condition").innerHTML = result.weather[0].main;
        document.getElementById("weather-temperature").innerHTML = `${tempF} &#176;F<br>${tempC} &#176;C`;
    });
}