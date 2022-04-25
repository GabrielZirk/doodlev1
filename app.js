const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

let names = [];
let codes = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {names: names,
  codes: codes});
});


app.post("/", (req, res) => {
  console.log(req.body)
  let name = req.body.name;

  if (!names.includes(name)) {
    names.push(name)

    if (req.body.sat && req.body.sun) {
      codes.push(1);
    }
    else if (req.body.sun) {
      codes.push(2);
    }
    else if (req.body.sat) {
      codes.push(3);
    }
    else if (! (req.body.sat || req.body.sun)) {
      codes.push(4);
    }
  }

  else if (names.includes(name)) {
    let nameIndex = names.indexOf(name);
    if (req.body.sat && req.body.sun) {
      codes[nameIndex] = 1;
    }
    else if (req.body.sun) {
      codes[nameIndex] = 2;
    }
    else if (req.body.sat) {
      codes[nameIndex] = 3;
    }
    else if (! (req.body.sat || req.body.sun)) {
      codes[nameIndex] = 4;
    }
  }

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running.")
});
