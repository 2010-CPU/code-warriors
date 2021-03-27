require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();
const server = express();

const jwt = require('jsonwebtoken');
const {getUserById} = require('../db');
const {JWT_SECRET = 'nevertell'} = process.env;

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: ""
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const {id} = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }

    } catch (error) {
      next(error);
    }
  } else {
    next({message: `Authorization token must start with ${prefix}`})
  }
})

const productsRouter = require('./products'); 
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

server.use((req, res, next) => {
  res.status(404).send({message: 'Not Found'});
});

server.use((error, req, res, next) => {
  if (res.StatusCode < 400) {
    res.status(500).send({message: error.message});
  }
});

module.exports = apiRouter;
