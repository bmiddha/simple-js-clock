# Simple JS (Now in Typescript) Clock

A clock replacement for the office of ACM@UIC

## Features

* Time and Date
* CTA Bus and Train Arrival Times
* Weather from DarkSky

## Using with docker

1. `docker` and `docker-compose` should be installed.
2. Download just the `docker-compose.yaml` file or clone the repository.
3. Create a `.env` file based on `.env.example`.
4. Run `docker-compose up -d` (Run `docker build -t bmiddha/simple-js-clock:latest` before to include local changes).

`docker run` command
```
docker run -e HTTPS="false" -e KEY="/root/ssl/ssl.key" -e CERT="/root/ssl/ssl.crt" -e PORT="8080" -e CTA_TRAIN_API_KEY="82c43bcdd4814d328fee2c175230dd5d" -e CTA_BUS_API_KEY="iUwkkVCZweRugTAi6AxCrBXvd" -e METRA_TRAIN_ID="8a3eb7d0e90f053318b37002c21e2e26" -e METRA_TRAIN_SECRET="224b391d41749621bb2ccc4f97e108ff" -e DARK_SKY_API_KEY="9bd3cc7065798472aed0a5150fd122c4" -e COLORS="303030 01579B 006064 304FFE 004D40" -e BUS_STOPS="6700 6627 307 332 4640 14487 6347 206" -e TRAIN_STATIONS="40350" -e WEATHER_LAT_LONG="37.8267,-122.4233" -e UNITS="both" bmiddha/simple-js-clock
 ```

## Installation

1. Clone the repository.
2. Navigate to the repository directory.
3. Create a `.env` file based on `.env.example`.
4. Run `npm install` to install dependencies.

## How to use

1. Run `npm run start` to start the npm server or `npm run watch` to watch for changes.
2. Navigate the browser to `locahost:8080` or the port specified in the `.env` config.

## Offline Mode

Offline mode will disable api requests to the server leaving only the clock running. It can be activated by going to `/offline` path.

## Demo Mode
Demo mode works like offline mode but displays demo information instead of real data from apis. It can be activated by going to `/demo` path.

## Configuration
To override the default config, you can use the URL GET parameters or by pressing `c` to open the config options.

# Deployment on a Raspberry PI

## Step 0: Install Packages
```
sudo apt update && sudo apt upgrade -y
sudo apt install --no-install-recommends -y chromium-browser xserver-xorg x11-xserver-utils xinit
```

## Step 1: Enable auto-login
Use the `raspi-config` tool to enable auto-login to the console.
`sudo raspi-config` => Boot Options => Desktop / CLI => Console Autologin

## Step 2: Set console orientation
Edit the file `/boot/config.txt`
Add the following option:
```
display_rotate=3
```

```
display_rotate=0 Normal
display_rotate=1 90 degrees
display_rotate=2 180 degrees
display_rotate=3 270 degrees
```

## Step 4: `.xinitrc` file

`/home/pi/.xinitrc`
```
#!/bin/sh
xset -dpms
xset s off
xset s noblank

xrandr --output default --rotate left

setxkbmap -option "terminate:ctrl_alt_bksp"

unclutter &
chromium-browser http://server:8080 --window-size=1080,1920 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null
```
Replace `http://server:8080` with nodejs server.

## Reboot
