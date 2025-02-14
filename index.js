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


function parseUnixOrDate(input) {
  try {
    // Handle undefined or empty input: return current Unix timestamp and UTC time
    if (typeof input === "undefined" || input.length === 0) {
      let currentDate = new Date();
      return { unix: currentDate.getTime(), utc: currentDate.toUTCString() };
    }

    if (typeof input !== "string") return { error: "Invalid Date" };

    // Check if the input is a valid Unix timestamp
    if (!isNaN(input) && input >= 0 && input <= 9999999999999) {
      let date = new Date(Number(input));
      return { unix: date.getTime(), utc: date.toUTCString() };
    }

    // Check if input follows YYYY-MM-DD format
    let parts = input.split("-");
    if (parts.length === 3) {
      let [year, month, day] = parts.map(Number);
      let date = new Date(`${year}-${month}-${day}`);
      
      // Validate date and return result
      return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day
        ? { unix: date.getTime(), utc: date.toUTCString() }
        : { error: "Invalid Date" };
    }

    return { error: "Invalid Date" };
  } catch (error) {
    return { error: "Invalid Date" };
  }
}

app.get("/api/:date?", (req, res, next) => {
  req.params.date;
  next();
}, (req, res, next) => {
  res.json(parseUnixOrDate(req.params.date));
});


// Listen on port set in environment letiable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
