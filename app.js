const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { handleError, ErrorHandler } = require("./helper/error");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
  })
);
app.use(morgan('dev'));
app.get('/', function (req, res) { res.send('hello, world!') });
require("./routers/user")(app);

//bisa pakai ini
app.get("*", () => {
  throw new ErrorHandler(404, "Halaman tidak ada");
});

//atau ini :
app.get("*", (err, res) => {
  handleError({
    statusCode: 404, 
    message: "Halaman tidak ditemukan !"
  }, res);
});

module.exports = app;




