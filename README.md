# Simple JS (Now in Typescript) Clock

A clock replacement for the office of ACM@UIC

## Features

* Time and Date
* CTA Bus and Train Arrival Times
* Weather from OpenWeatherMap

## Dependencies

* nodeJS
* `express` package required
* `typescript` package required to build the application

## Installation

1. Clone the repository
2. Navigate to the repository directory
3. Create a `config.ts` file refer to `config.template.ts`

    ```ts
    export const config = {
        port: '3000',               // application port
        ctaTrainApiKey: '',         // api key for CTA trains
        ctaBusApiKey: '',           // api key for CTA buses
        openWeatherMapKey: '',      // api key for Open Weather Map
        colors: ["#303030", "#01579B", "#006064", "#304FFE", "#004D40"],            // background colors to cycle
        busStops: ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"],   // bus stops to display
        trainStations: ["40350"],   // train stations to display
        city: "Chicago",            // city for weather
    }
    ```

4. Run `npm install` to install dependencies

## Configuration

Modify the constants located at the top of `site\main.js` to change background colors, bus stops, train stations and the weather location


## How to use

1. Run `npm run start` to start the npm server.
2. navigate the browser to `index.html` located in `site/index.html`