## Backend
A URL shortener backend service like bit.ly and tinyurl.com.
The API service can take a long URL and convert it to a shorter URL as well as to provide a simple usage report tracking the number of clicks, originating geolocation and timestamp of each visit to a Short URL.

MongoDB is used as the database. 

The long URL, short URL, and other details such as metrics for each visit to the short url are stored in the database. When a long URL that is already stored in the database is passed again, it returns the older shortened URL. With each visit of url, the metrics are stored in the mongodb as well.

#### Required packages and their respective versions are specified in the package.json file under ./backend directory for installation

### Setting up the mongodb
- Go `https://account.mongodb.com/account/register` to sign up for a new MongoDB Atlas account.
- Fill in the registration form with your information and click Sign up.
- Click on Deploy a shared cloud database for Free
- Click on Create a Shared Cluster
- Click on Database access on the sidebar and Add New Database User
- Select Password then enter in a username and password detail for your user.
- Built-in Role select Atlas Admin
- Click the Add User button to create your new user
- Click on Network Access on the sidebar. To Allow Access From All IP Addresses
- Click on Add IP Address button
- Select ALLOW ACCESS FROM ANYWHERE
- Click the Confirm button.
- Click on Database on the sidebar
- Click the Connect button for your cluster
- In the popup modal, click on Connect your application.
- Copy the URI on the clipboard
- Lastly, all you need to do is replace the <password> field with the password you created previously.

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

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

| Variable                       | Description                                                                                |
| :----------------------------- | :----------------------------------------------------------------------------------------- |
| `PORT`                         | Port Number                                                                                |
| `MONGO_URI`                    | Mongodb URI to connect the application to mongodb cluster                                  |
| `BASE`                         | Base URL for Shortening (such as http://localhost:3333 if you running locally)             |
| `ABSTRACT_IP_GEO_API_KEY`      | API Key for Abstract IP Geolocation from `https://app.abstractapi.com/api/ip-geolocation/` |

## API Reference

### index.js

```http
  GET /:urlId
```

| Parameter    | Type     | Description     |
| :--------    | :------- | :-------------- |
| `urlId`      | `string` | Unique URL Code |

**Example:**

```http
GET http://localhost:3333/mReAWOFJiaSvWaW
```

**Response:**

Redirect to original URL

### metrics.js

```http
  GET /api/metrics/all
```

**Response:**
```
{
    [{
      country: "string",
      city: "string",
      location: Point,
      timestamp: Date
      }]
}
```

```http
  GET /api/metrics
```

| Query            | Type                  | Description                     |
| :--------------- | :-------------------- | :------------------------------ |
| `metricIds`      | `Array of Object Ids` | Array of Object Ids for Metrics |

**Response:**
```
{
    [{
      country: "string",
      city: "string",
      location: Point,
      timestamp: Date
      }]
}
```

### short_urls.js

```http
  POST /api/short
```

| Field | Type   | Description                               |
| :---- | :----- | :---------------------------------------- |
| Body  | `json` | Original Url, Title Tag of Url (Optional) |

**Example:**

```http
POST http://localhost:3333/api/short
Content-Type: application/json

{
    "origUrl": "https://www.youtube.com/watch?v=79nSbVole7Q"
}

```

**Response:**
```
{
  origUrl: "string",
  shortUrl: "string",
  urlId: "string",
  clicks: "integer",
  date: "Date",
  title: "string",
  metrics: [Object]
}
```

### urls.js
```http
  GET /api/urls/all/summary
```
**Response:**
```
{
    totalClicks: "string",
    topLink: "string",
    topLinkClicks: "string",
    topCountry: "string",
    countryCount: [{"string", "integer"}],
}
```

```http
  GET /api/urls/all
```
**Response:**
```
{
    [{
  origUrl: "string",
  shortUrl: "string",
  urlId: "string",
  clicks: "integer",
  date: "Date",
  title: "string",
  metrics: [Object]
      }]
}
```

```http
  GET /urls/:urlId/summary
```
**Response:**
```
{
    clicks: "integer",
    topCountry: "string",
    countryCount: [{"string", "integer"}],
    metricIds: [ObjectId],
}
```

```http
  GET /urls/:urlId
```

| Parameter    | Type     | Description     |
| :--------    | :------- | :-------------- |
| `urlId`      | `string` | Unique URL Code |

**Response:**
```
{
  origUrl: "string",
  shortUrl: "string",
  urlId: "string",
  clicks: "integer",
  date: "Date",
  title: "string",
  metrics: [Object]
}
```

## Module Details:
The backend directory acts as a controller and holds the API endpoints of the application. It consists of two main functionalities:

1. Create New Link: Take a long URL and convert it to a shorter URL

2. For each link, it track the metrics such as number of clicks, originating geolocation and timestamp of each visit to a Short URL