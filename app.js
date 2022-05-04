
//import express library
const express = require("express");

//create express server
const app = express();

//initialize express server
const configureApp = async () => {
  // handle request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //ignore browser requests for favicon file
  app.get('/favicon.ico', (req, res) => res.status(204));


  //define a route
  app.get("/hello", (request, response) => {
    response.send("hello world!")
  });

  // Handle page not found:
  // gets triggered when a request is made to
  // an undefined route 
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware: 
  // all express errors get passed to this
  // when next(error) is called 
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  await configureApp();
};


// PROGRAM STARTS HERE


bootApp();


const PORT = 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));