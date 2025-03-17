// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function identifyFormat(value) {
  if (!isNaN(Number(value)) && value.length >= 12) {
    return "timestamp";
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "date";
  } else {
    return "invalid";
  }
}

// Timestamp Microservice
app.get("/api/:date_string?", function (req, res) {
  let date_string = req.params.date_string;

  let date;
  let result = identifyFormat(date_string);

  if (date_string === undefined) {
    date = new Date();
  } else if (result === "timestamp") {
    date = new Date(parseInt(date_string));
  } else if (result === "date") {
    date = new Date(date_string);
  }
  else {
    res.json({ error: "Invalid Date" });
    return;
  }

  if (result === "timestamp")
  {
    res.json({ unix: date_string, utc: new Date(date).toUTCString() });
    return;
  }
  else if (result === "date") 
  {
    res.json({ unix: parseInt(date.getTime()), utc: date.toUTCString() });
  }
}
);



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
