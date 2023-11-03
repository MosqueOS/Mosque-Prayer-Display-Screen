# Mosque Prayer Display Screen App

'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ

In the Name of Allah the Merciful, the Compassionate.

This project has been open sourced as a form of sadaqah jariyah - may Allah reward every single contribution, technical, non-technical and those who share with others.

## Introduction

This application allows mosques to run a prayer display screen for the worshipers and also an offline progressive web app that runs on any modern web browser.

This version of the application superseeds the [original version](https://github.com/Mosque-Screens/Mosque-Screen) which was created in association with [East London Mosque](https://www.eastlondonmosque.org.uk/).

The original contributors of this project can be found [here](https://github.com/Mosque-Screens/Mosque-Screen#contributors-wall-of-fame).

A special thanks should be given to the [UK Government Digital Service](https://www.gov.uk/government/organisations/government-digital-service) who provided voluntary days which allowed the original project to come to life.

## Screenshots

### Mosque views

<img src="./public/demo-mosque-view-1.png" />

<img src="./public/demo-mosque-view-2.png" />


### Mobile app

<img src="./public/demo-mobile-view.png" width="500px" />


## How to get set up as a Mosque

### Prerequsites

- Google Account

### Step 1: Make a copy of prayer times spreadsheet

Go to the following link and make a copy of the spreadsheet:
[https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/copy](https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/copy).

### Step 2: Share "viewer" access to the spreadsheet with our Google Account

Click on the share button and add `mosque.screens786@gmail.com` as a viewer. We don't need any write access, so please do not give us this.

This allows our API to access your spreadsheet and read your data.

### Step 3: Generate API Endpoint

To generate the API endpoint, you need to extract the spreadsheet ID from your spreadsheet link.

For example, if your spreadsheet url is:

```
https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/edit
```

You ID would be:

```
1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg
```

You then add this ID to the following URL, like this:

```
https://api.mosque.tech/mosque-data/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg
```

You can use the following tool to automatically generate you an API endpoint:
https://codepen.io/DilwoarH/full/mdvOexr

Note: You don't need to use our API endpoint, you can generate your own endpoint but please make sure it has all the required properties.

### Step 4: Deploy your app

We currently use Vercel (we found others not to work as well).

Click on the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMosqueOS%2FMosque-Prayer-Display-Screen&env=MOSQUE_API_ENDPOINT&envDescription=The%20Mosque%20API%20Key%20can%20be%20generated%20by%20following%20the%20README%20documents&envLink=https%3A%2F%2Fgithub.com%2FMosqueOS%2FMosque-Prayer-Display-Screen&project-name=mosque-prayer-display-screen&repository-name=Mosque-Prayer-Display-Screen)

### Step 5: Test your display

Once your app has deployed, visit the URL and test your screen.
Make sure it works on the TV you want to use for the mosque. Our app is designed for 1080p Full HD TV screens.

### Optional things you might want to do

#### Custom domain

You can set up custom domains like: prayertime.mymosque.com

If you want to update your domain, you can do so by following the Vercel documentation:
[https://vercel.com/docs/projects/domains/add-a-domain](https://vercel.com/docs/projects/domains/add-a-domain)

#### Environment variables

|KEY|VALUE|DEFAULT|DESCRIPTION|
|-|-|-|-|
|MOSQUE_API_ENDPOINT|https://api.mosque.tech/mosque-data/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg|REQUIRED - NO DEFAULT|Data from Mosque API|
|BLACKOUT_PERIOD|13|13 minutes|How long your mosque screen dims / blacks out during congregation prayer|
|UPCOMING_PRAYER_DAY|3|3 upcoming days shown in slider|How many upcoming days it shows in the sliding section|
|SLIDE_TRANSITION_TIME|7|7 seconds|How long each slide shows for in the sliding section|

## Dev set up

```sh
cp .env.local.example .env.local
```

```sh
npm install
```

```sh
npm run dev
```

## Raspberry Pi Setup

Raspberry Pi (RPI) is an easy way to get the screen running, the screen doesn't need too much power - a lightweight computer like an RPI is enough.

You can buy one from the official suppliers: https://www.raspberrypi.com/products/

We recommend you buy a case with a fan or some heat-cooling solution - the screen will run all day so it's good to have a good cooling solution.

### RPI set up steps

0. Install [Raspberry Pi OS](https://www.raspberrypi.com/software/) on the SD Card
1. Install [chromium-browser](https://www.chromium.org/getting-involved/download-chromium) - **Do this step only if you do not have Chromium**
2. Open Terminal
3. `cd .config`
4. `sudo mkdir -p lxsession/LXDE-pi`
5. `sudo nano lxsession/LXDE-pi/autostart`
6. Add the following line at the end of the file:

```sh
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
point-rpi
@chromium-browser --noerrdialogs --noerrors --disable-session-crashed-bubble --disable-features=InfiniteSessionRestore --disable-infobars --start-fullscreen --start-maximized --app=https://mosque-prayer-display-screen.vercel.app
```

(not to replace the `--app=https://mosque-prayer-display-screen.vercel.app` with your URL)

7. `sudo reboot`
8. Once it reboots, it should start with start-up to your screen automatically.

## Still need help?

We don't provide any official free support, you can join our discord channel at:

If you would like paid support, you can contact us here for pricing: [mosque.screens786@gmail.com](mailto:mosque.screens786@gmail.com).
