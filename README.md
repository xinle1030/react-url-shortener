# URL Shortener - S-link

This is a monorepo containing 2 different projects as follows:
- frontend for the UI
- backend for URL shortener

This application is known as "S-link", carrying the meaning of the creation of Shorter Link - Sleeker Link.

## Backend
This is an URL shortener service like bit.ly and tinyurl.com.
The API service can take a long URL and convert it to a shorter URL as well as to provide a simple usage report tracking the number of clicks, originating geolocation and timestamp of each visit to a Short URL.

MongoDB is used as the database. 

The long URL, short URL, and other details such as metrics for each visit to the short url are stored in the database. When a long URL that is already stored in the database is passed again, it returns the older shortened URL. With each visit of url, the metrics are stored in the mongodb as well.

#### Required packages and their respective versions are specified in the package.json file under ./backend directory for installation

### Setting up the server locally
- Clone the project
- Install NodeJS **LTS** version from <a href="https://nodejs.org/en/download/">NodeJs Official Page</a>
- Download the product on this page
- Unzip the downloaded file to a folder in your computer
- Open Terminal
- Go to your file project - frontend folder (where you’ve unzipped the product)
- (If you are on a linux based terminal) Simply run `npm run install:clean`
- (If not) Run in terminal `npm install`
- (If not) Run in terminal `npm start`
- Navigate to https://localhost:3333

### Run Test Suite
- Clone the project
- Install NodeJS **LTS** version from <a href="https://nodejs.org/en/download/">NodeJs Official Page</a>
- Download the product on this page
- Unzip the downloaded file to a folder in your computer
- Open Terminal
- Go to your file project - backend folder (where you’ve unzipped the product)
- Run in terminal `npm test`

Details of this module can be found in the readme in ./backend directory.

## Frontend
A front end application built on reactjs and tailwind CSS that provides access to back-end functionalities for url shortener and analytics report by calling back-end APIs.

### Software Requirements:
React 17.0.1 (64-bit)

#### Required packages and their respective versions are specified in the package.json file under ./frontend directory for installation

### Setting up the server locally
- Clone the project
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

Details of this module can be found in the readme in ./frontend directory.