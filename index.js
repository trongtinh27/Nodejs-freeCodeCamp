// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();
let bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({extended: false}))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function isValidUnixOrDate(input) {
  try {
      if (typeof input !== "string") return false;
      if (/^\d+$/.test(input)) {  
          let timestamp = Number(input);
          if (timestamp >= 0 && timestamp <= 9999999999999) return true;
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
          let date = new Date(input);
          let [year, month, day] = input.split("-").map(Number);
          return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
      }
      return false;
  } catch (error) {
      console.error("Error in isValidUnixOrStrictDate:", error);
      return false;
  }
}

app.get("/api/:date?", (req, res, next) => {
  req.params.date;
  next();
}, (req, res, next) => {
  res.json({ echo: typeof(req.params.date) });
});


// Listen on port set in environment letiable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
