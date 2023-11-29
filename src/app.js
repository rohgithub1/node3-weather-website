const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const port = process.env.PORT || 3000;

const geoCode = require("./util/geocode");
const forecast = require("./util/forecast");

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewTemplateName = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//using hbs / handlebars with node js
//app.set will use 2 parameters type 1-> engine name and 2-> extension of the file to be rendered
//Set up handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewTemplateName);
hbs.registerPartials(partialPath);

//Set up static directory tp serve
app.use(express.static(publicDirectoryPath));

//app.get function of express js uses 2 parameters 1-> route path for the file, 2-> callback function having request and response parameters
app.get("", (req, res) => {
  //using render function while using handlebars, render function uses 2 parameter, 1-> name of the file which need to be viewed 2-> data to be passed to the page to be viewed.
  res.render("index", {
    title: "Weather",
    name: "Rohit Khimavat",
    message: "Use this site to get your weather!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rohit Khimavat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Welcome to help page, how can we help you ?",
    name: "Rohit Khimavat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
      return res.send({
      error: "Need to provide address term",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address, 
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    "error message": "Help article not found",
    name: "Rohit Khimavat",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    "error message": "Page not found",
    name: "Rohit Khimavat",
  });
});

app.listen(port, () => {
  console.log("Server is up on port "+port);
});
