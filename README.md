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
3. Create a `.env` file refer to `.env.example`

    ```env
    # application port
    PORT=3000
    # api key for CTA trains
    CTA_TRAIN_API_KEY=
    # api key for CTA buses
    CTA_BUS_API_KEY=
    # api key for metra trains
    METRA_TRAIN_API_KEY=
    # api key for Open Weather Map
    OPEN_WEATHER_API_KEY=
    # background colors to cycle
    COLORS=303030 01579B 006064 304FFE 004D40
    # bus stops to display
    BUS_STOPS=6700 6627 307 332 4640 14487 6347 206
    # train stations to display
    TRAIN_STATIONS=40350
    # city for weather
    CITY=Chicago
    # Temperature unites metric or imperial or both
    UNITS=both
    ```

4. Run `npm install` to install dependencies

## How to use

1. Run `npm run start` to start the npm server.
2. navigate the browser to `locahost:3000` or the port specified in the config.
