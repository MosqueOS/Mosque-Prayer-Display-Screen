# Mosque Prayer Display Screen App

'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ

In the Name of Allah the Merciful, the Compassionate.

This project has been open-sourced as a form of sadaqah jariyah - may Allah reward every single contribution, technical,
non-technical and those who share with others.

## Introduction

This application allows mosques to run a prayer display screen for the worshipers and also an offline progressive web
app that runs on any modern web browser.

This version of the application supersedes the [original version](https://github.com/Mosque-Screens/Mosque-Screen) which
was created in association with [East London Mosque](https://www.eastlondonmosque.org.uk/).

The commentary on why we built this version, can be found in the following
blog: [https://medium.com/mosque/design-concept-direction-for-mosque-screens-51c4f9bb82](https://medium.com/mosque/design-concept-direction-for-mosque-screens-51c4f9bb82).

The original contributors of this project can be
found [here](https://github.com/Mosque-Screens/Mosque-Screen#contributors-wall-of-fame).

A special thanks should be given to
the [UK Government Digital Service](https://www.gov.uk/government/organisations/government-digital-service) who provided
voluntary days which allowed the original project to come to life.

## Features

To keep track of features implemented and in the pipeline, please have a look at our project board:
https://github.com/orgs/MosqueOS/projects/1/views/1

If you want to request a new feature, please raise an issue on this repo with a description of what you want.

## Demo

You can see a working demo here:
[https://mosque-prayer-display-screen.vercel.app/](https://mosque-prayer-display-screen.vercel.app/)

All of the code sits here:
[https://github.com/MosqueOS/Mosque-Prayer-Display-Screen](https://github.com/MosqueOS/Mosque-Prayer-Display-Screen)

## Screenshots

### Mosque views

<img src="./public/demo-mosque-view-1.png" />

<img src="./public/demo-mosque-view-2.png" />

### Mobile app

<img src="./public/demo-mobile-view.png" width="500px" />

## How to get set up as a Mosque

### Prerequisites

- Google Account
- Google Cloud Project (Optional for Admin interface)

### Step 1: Make a copy of the prayer times spreadsheet

Go to the following link and make a copy of the spreadsheet:
[https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/copy](https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/copy).

### Step 2: Share "viewer" access to the spreadsheet with our Google Account

Click on the share button and add `mosque.screens786@gmail.com` as a viewer. We don't need any write access, so please
do not give us this.

This allows our API to access your spreadsheet and read your data.

### Step 3: Generate API Endpoint

To generate the API endpoint, you need to extract the spreadsheet ID from your spreadsheet link.

For example, if your spreadsheet URL is:

```
https://docs.google.com/spreadsheets/d/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg/edit
```

Your ID would be:

```
1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg
```

You then add this ID to the following URL, like this:

```
https://api.mosque.tech/mosque-data/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg
```

You can use the following tool to automatically generate an API endpoint:
https://codepen.io/DilwoarH/full/mdvOexr

Note: You don't need to use our API endpoint, you can generate your own endpoint but please make sure it has all the
required properties.

### Step 4: Deploy your app

We currently use Vercel (we found others not to work as well).

Click on the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMosqueOS%2FMosque-Prayer-Display-Screen&env=MOSQUE_API_ENDPOINT&envDescription=The%20Mosque%20API%20Key%20can%20be%20generated%20by%20following%20the%20README%20documents&envLink=https%3A%2F%2Fgithub.com%2FMosqueOS%2FMosque-Prayer-Display-Screen&project-name=mosque-prayer-display-screen&repository-name=Mosque-Prayer-Display-Screen)

### Step 5: Test your display

Once your app has deployed, visit the URL and test your screen.
Make sure it works on the TV you want to use for the mosque. Our app is designed for 1080p Full HD TV screens.

## Admin Interface Setup

The Admin interface will allow you to manage the screen from your phone these include:

- Showing Announcements

### Prerequisites

- Google Account
- Google Cloud Project (Optional for Admin interface)

### Step 1: Setup Google Cloud project

You can follow the steps provided by Google here:
https://developers.google.com/workspace/guides/create-project

### Step 2: Enable the Google Sheets API in Google Cloud

You can follow the steps provided by Google here:
https://developers.google.com/workspace/guides/enable-apis

### Step 3: Create a service account & env vars

You'll need to download your private key which will be part of the credentials.json file,
that you'll receive after creating the service account.

In your deployment environment vars set

- `GOOGLE_AUTH_PRIVATE_KEY` as the private key in your environment vars
- `GOOGLE_AUTH_EMAIL` as the newly created service account email

```
e.g.

GOOGLE_AUTH_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n******\n-----END PRIVATE KEY-----\n"
GOOGLE_AUTH_EMAIL=XXXX@XXXX-XXXX.iam.gserviceaccount.com
```

You'll also need to set a username and password for authenticaion, these will also be stored in env vars

```
AUTH_USERNAME=myuser 
AUTH_PASSWORD=secret
```

###        

## Optional things you might want to do

#### Custom domain

You can set up custom domains like: prayertime.mymosque.com

If you want to update your domain, you can do so by following the Vercel documentation:
[https://vercel.com/docs/projects/domains/add-a-domain](https://vercel.com/docs/projects/domains/add-a-domain)

#### Environment variables

| KEY                         | VALUE                                                                            | DEFAULT                         | DESCRIPTION                                                                     |
|-----------------------------|----------------------------------------------------------------------------------|---------------------------------|---------------------------------------------------------------------------------|
| MOSQUE_API_ENDPOINT         | https://api.mosque.tech/mosque-data/1o9dngtGJbfkFGZK_M7xdlo2PtRuQknGEQU3FxpiPVbg | REQUIRED - NO DEFAULT           | Data from Mosque API                                                            |
| BLACKOUT_PERIOD             | 13                                                                               | 13 minutes                      | How long your mosque screen dims / blacks out during congregation prayer        |
| UPCOMING_PRAYER_DAY         | 3                                                                                | 3 upcoming days shown in slider | How many upcoming days it shows in the sliding section                          |
| SLIDE_TRANSITION_TIME       | 7                                                                                | 7 seconds                       | How long each slide shows for in the sliding section                            |
| THEME_COLOR_PRIMARY         | #0F715D                                                                          | #0F715D                         | The primary color to be used for the background of the screen                   |
| THEME_COLOR_PRIMARY_ALT     | #0C5A4B                                                                          | #0C5A4B                         | The primary alternative color to be used for the containers/cards on the screen |
| THEME_COLOR_ON_PRIMARY      | #FFFFFF                                                                          | #FFFFFF                         | The text color to be used when the background color is primary                  |
| THEME_COLOR_ON_PRIMARY_ALT  | #FFFFFF                                                                          | #FFFFFF                         | The text color to be used when the background color is primary alternative      |
| THEME_COLOR_HIGHLIGHT       | #10b981                                                                          | #10b981                         | The color used to highlight upcoming prayer                                     |
| THEME_COLOR_HIGHLIGHT       | #10b981                                                                          | #10b981                         | The color used to highlight upcoming prayer                                     |
| ADMIN_GOOGLE_SA_PRIVATE_KEY | "-----BEGIN PRIVATE KEY-----\n******\n-----END PRIVATE KEY-----\n"               |                                 | Required as part of Admin interface to interact with your google sheets         |
| ADMIN_GOOGLE_SA_EMAIL       | XXXX@XXXX-XXXX.iam.gserviceaccount.com                                           |                                 | Required as part of Admin interface to interact with your google sheets         |
| AUTH_USERNAME               | myuser                                                                           | myuser                          | Required as part of Admin interface to login to admin page                      |
| AUTH_PASSWORD               | secret                                                                           | secret                          | Required as part of Admin interface to login to admin page                      |
| AUTH_SECRET                 |                                                                                  |                                 | Required as part of Admin interface to encrypt auth JWT token                   |

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

Raspberry Pi (RPI) is an easy way to get the screen running, the screen doesn't need too much power - a lightweight
computer like an RPI is enough.

You can buy one from the official suppliers: https://www.raspberrypi.com/products/

We recommend you buy a case with a fan or some heat-cooling solution - the screen will run all day so it's good to have
a good cooling solution.

### RPI set up steps

0. Install [Raspberry Pi OS](https://www.raspberrypi.com/software/) on the SD Card
1. Install [chromium-browser](https://www.chromium.org/getting-involved/download-chromium) - **Do this step only if you
   do not have Chromium**
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

(make sure to replace the `--app=https://mosque-prayer-display-screen.vercel.app` with your URL)

7. `sudo reboot`
8. Once it reboots, it should start with start-up to your screen automatically.

## Still need help?

We don't provide any free support, you can join our discord channel to get help from the community using the following
invite link: [https://discord.gg/CG7frj2](https://discord.gg/CG7frj2).

If you would like paid support, you can contact us here for
pricing: [mosque.screens786@gmail.com](mailto:mosque.screens786@gmail.com).
