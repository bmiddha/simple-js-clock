# Simple JS Clock

A clock replacement for the office of ACM@UIC

## Features

* Time and Date
* CTA Bus and Train Arrival Times
* Weather from OpenWeatherMap

## Dependencies

* nodeJS
* `dotenv` and `express` packages required

## Installation

1. Clone the repository
2. Navigate to the repository directory
3. Create a `.env` file 
```
CTA_TRAIN_API_KEY=<cta train api key>
CTA_BUS_API_KEY=<cta bus api>
OPEN_WEATHER_MAP_API_KEY=<open weather map api key>
```
4. Run `npm install` to install dependencies

## Configuration
Modify the constants located at the top of `site\main.js` to change background colors, bus stops, train stations and the weather location
```
const colors = ["#303030", "#01579B", "#006064", "#304FFE", "#004D40"];
const busStops = ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"];
const trainStations = ["40350"];
const city = "Chicago";
```

## How to use

1. Run `npm run start` to start the npm server.
2. navigate the browser to `index.html` located in `site/index.html`