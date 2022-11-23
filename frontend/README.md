# Front end interactive web app

A front end application built on reactjs and tailwind CSS that provides access to back-end functionalities for url shortener by calling back-end APIs.

# Reference

Notus React <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20" target="_blank">![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)</a>

![version](https://img.shields.io/badge/version-1.1.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) <a href="https://github.com/creativetimofficial/notus-react/issues?q=is%3Aopen+is%3Aissue" target="_blank">![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/notus-react.svg)</a> <a href="https://github.com/creativetimofficial/notus-react/issues?q=is%3Aissue+is%3Aclosed" target="_blank">![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/notus-react.svg)</a> <a href="https://gitter.im/creative-tim-general/Lobby" target="_blank">![Join the chat at https://gitter.im/NIT-dgp/General](https://badges.gitter.im/NIT-dgp/General.svg)</a> <a href="https://discord.gg/E4aHAQy" target="_blank">![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)</a>

![Notus React](https://github.com/creativetimofficial/public-assets/blob/master/notus-react/notus-react.jpg?raw=true)

## Software Requirements:
- React 17.0.1 (64-bit)

## Required packages and their respective versions are specified in the package.json file for installation

## Licensing

- Copyright 2021 <a href="https://www.creative-tim.com/?ref=nr-readme" target="_blank">Creative Tim</a>

- Licensed under <a href="https://github.com/creativetimofficial/notus-react/blob/main/LICENSE.md" target="_blank">MIT</a>

### Get Started (To run project locally)

- Install NodeJS **LTS** version from <a href="https://nodejs.org/en/download/">NodeJs Official Page</a>
- Download the product on this page
- Unzip the downloaded file to a folder in your computer
- Open Terminal
- Go to your file project - frontend folder (where you’ve unzipped the product)
- (If you are on a linux based terminal) Simply run `npm run install:clean`
- (If not) Run in terminal `npm install`
- (If not) Run in terminal `npm run build:tailwind` (each time you add a new class, a class that does not exist in `src/assets/styles/tailwind.css`, you will need to run this command)
- (If not) Run in terminal `npm start`
- Navigate to https://localhost:3000

## Module Details:
Acts as a gateway to backend functionality with an easy to understand and use UI.

The application is divided into 2 sections: Create New Link, All Links

1. Create New Link: is a front-end gateway to convert a long url into a short url

2. All Links: a dashboard to allow users view all the short urls created
- View Report: a link report for each short url to track the number of clicks, originating geolocation and timestamp of each visit to a Short URL