const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const youpi = require("./youpi");
const compress = require("./compress");

// Initialize server
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/youpi", youpi);
app.use("/compress", compress);

app.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});
app.listen(port, function() {
  console.log("Runnning on " + port);
});
module.exports = app;
