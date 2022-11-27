const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loggerMorgan = require('morgan');

const port = process.env.PORT || 3001;

// Les differents codes
const youpi = require('./src/youpi');
const compress = require('./src/compress');
const memory = require('./src/memory');

// Initialize server
const app = express();

// logger
const logger = require('./src/utils/logger');

app.use(loggerMorgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utilsation des codes
app.use('/youpi', youpi);
app.use('/compress', compress);
app.use('/memory2', memory);

// Une petite page par défaut histoire de voir que ça marche
app.get('/', (req, res) => {
  res.send('<h1>Bonjour</h1>');
});
app.all('*', (req, res) => {
  res.status(404).send('<h1>Oups 404!</h1>');
});

// Hop on démarre
app.listen(port, () => {
  logger.log(`Runnning on ${port}`);
});

module.exports = app;
