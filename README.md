# Food with Friends README


## Project Description

Food with Friends is an e-commerce store providing customers with meal kits and cocktails for any time of the day. Not sure what you want for dinner? Or maybe you don't want to have a ton of leftover ingredients after making a single meal. Sick of having a bottle of liquor stored in your freezer for a year? Food With Friends will solve these problems for you!

### Built With

* PostgreSQL database
* Express server
* ReactJS front end


## Setting Up
To set up Food With Friends locally, you can follow the below steps:

* Clone this repository on your local machine
* Run `npm install` in the terminal for the appropriate node modules files
* Edit db/index.js to change the value of `DB_NAME` to whatever your heart desires
* Run `createdb` in the terminal to create the database
* Run `npm run server:dev` in the terminal to start up the Express server

* Open a second terminal
* Run `npm run client:dev` to start up the ReactJS server

This project is run on a proxy using axios. This allows you to make calls to the API without using absolute paths.

Both the Express and ReactJS servers will restart automatically after each save with the help of `nodemon` and `react-scripts`.


### Project Structure

```bash
├── db
│   ├── index.js
│   └── init_db.js
├── index.js
├── package.json
├── public
│   └── index.html
├── routes
│   └── index.js
└── src
    ├── api
    │   └── index.js
    ├── components
    │   ├── App.js
    │   └── index.js
    └── index.js
```

Top level `index.js` is your Express Server. This should be responsible for setting up your API, starting your server, and connecting to your database.

Inside `/db` you have `index.js` which is responsible for creating all of your database connection functions, and `init_db.js` which should be run when you need to rebuild your tables and seed data.

Inside `/routes` you have `index.js` which is responsible for building the `apiRouter`, which is attached in the express server. This will build all routes that your React application will use to send/receive data via JSON.

Lastly `/public` and `/src` are the two puzzle pieces for your React front-end. `/public` contains any static files necessary for your front-end. This can include images, a favicon, and most importantly the `index.html` that is the root of your React application.

### Command Line Tools

In addition to `client:dev` and `server:dev`, you have access to `db:build` which (you will write to) rebuilds the database, all the tables, and ensures that there is meaningful data present.


## Deployment

### Setting up Heroku (once)

```bash
heroku create hopeful-project-name

heroku addons:create heroku-postgresql:hobby-dev
```

This creates a heroku project which will live at https://hopeful-project-name.herokuapp.com (note, you should change this to be relevant to your project).

It will also create a postgres database for you, on the free tier.


### Deploying

Once you've built the front-end you're ready to deploy, simply run `git push heroku master`. Note, your git has to be clean for this to work (which is why our two git commands live as part of getting ready to deploy, above).

This will send off the new code to heroku, will install the node modules on their server, and will run `npm start`, starting up your express server.

If you need to rebuild your database on heroku, you can do so right now with this command:

```bash
heroku run npm run db:build
```

Which will run `npm run db:build` on the heroku server.

Once that command runs, you can type `heroku open` to get a browser to open up locally with your full-stack application running remotely.

