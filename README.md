# Api Status Page

In this project I created a status page that updates every 15 seconds to check the status of each given api.

One thing to note here is that given the CORS issues I ran into, I used a CORS plugin for chrome to proxy the requests so they would go through.

## Getting Started

In order to run this app you just need to:

1. clone the repository onto your local machine
2. Install the dependencies via `npm install`
3. Start up the app using `npm start` and a window should pop up on your browser. (Make sure you are running a CORS proxy)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

The app will automatically start with initial api call(s) and will update every 15 seconds until the page is closed.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
