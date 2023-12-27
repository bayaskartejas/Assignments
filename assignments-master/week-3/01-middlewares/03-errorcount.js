const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint


app.get('/user', function(req, res) {
  throw new Error("User not found");
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

//Error hanling middleware:
/*Why is it positioned here ? 
The middleware functions and route handlers are executed in the order they are defined.
When an error occurs within a route handler (such as the throw new Error("User not found");
line in the /user GET endpoint), Express will immediately skip to the next error-handling middleware.*/

app.use((err,req,res,next)=>{
  res.status(404)
  errorCount++
})
module.exports = app;