const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const errorHandler = require('./helpers/error-handler')
const authJwt = require("./helpers/jwt");
// init
const app = express();

// permisões cors
app.use(cors())
app.options('*',cors())

// models
const Product = require('./models/products')
const Category = require('./models/categories')
const User = require('./models/users')

// routers
const productsRouter = require('./routers/products')
const categoryRouter = require('./routers/categories')
const usersRouter = require('./routers/user');

require("dotenv/config");

const api = process.env.API_URL;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authJwt())
app.use(errorHandler)
app.use(morgan("tiny"));
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/users`, usersRouter)




// start server
mongoose
  .connect(process.env.CONNECTION_URL,{
    userNewUrlParser:true,
    useUninfiedTopology:true,
    dbName:'node_mongo'
  })
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log("Something get wrong" + err);
  });
app.listen(3000, () => {
  console.log("App is running in http://localhost:3000");
});