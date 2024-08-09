const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./router/userRoutes');
const colorRoutes = require('./router/colorRoutes');
const subcategoryRoutes = require('./router/subcategoryRoutes');


//Autoriser la lecture des objets au format JSON
app.use(bodyParser.json());

//Autorisé la communication avec d'autres serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//Association d'URL avec des routes 
app.use('/user', userRoutes);
app.use('/color', colorRoutes);
app.use('/sub-category', subcategoryRoutes);

module.exports = app;
