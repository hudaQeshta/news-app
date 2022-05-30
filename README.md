
# News App
Front end Web app to view top stories, divided into 2 categories ( world, science )

## Installation:

1. Clone this repo.
2. Run `cd news-app`
3. Make sure you have node package manager installed.
4. Run `npm install`
5. Copy the `.env.example` file in the root, and rename the copied file to `.env`
6. Head to https://api.nytimes.com/svc and create an account, create an app, and copy the api-key.
7. In `news-app`, fill in the ```REACT_APP_NYTIMES_API_KEY``` in `.env` with the api-key you copied from your app.
8. Clone this repo https://github.com/techiediaries/fake-api-jwt-json-server
9. Run `cd fake-api-jwt-json-server`
10. Run `npm install`
11. Run `npm run start-auth`
12. Copy the server url from `server.js` file.
13. In `news-app`, Fill in the ```REACT_APP_BASE_FAKE_AUTH_URL``` in `.env` file with the server url you copied.
6. In `news-app`, Run `npm run start`

**The ui will run on http://localhost:3000/ if prot 3000 wasn't allocated**

