# Outside

A clock/weather app for my raspberry pi touchscreen.

## Building/running

- `git clone git@github.com:pifantastic/outside.git && cd outside` – Clone the repo
- `npm install` – Install dependencies
- `webpack` – Build static assets
- `npm run start` – Start the server
- Go to http://localhost:3000/

## Configuration

For this to work, you'll need to get a [DarkSky API key](https://darksky.net/dev/) and figure out the
coordinates of your location. Once you have those, you'll need to copy and update the
sample configuration.

- `cp config.js.sample config.js` – Copy the sample configuration
- `vim config.js` – Update it with your values.

## Raspberry PI "kiosk"

I run this on a raspberry pi touchscreen. To have it automatically start on boot I followed the
helpful instructions @ https://github.com/elalemanyo/raspberry-pi-kiosk-screen.

## Screenshot

![screenshot](https://raw.githubusercontent.com/pifantastic/outside/master/screenshot.png)

## NOTEPAD

- To reload the browser on the pi: `xte -x :0 "key F5"`
