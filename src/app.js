const express = require('express');
const characterRouter = require('./routers/characters');

const app = express();

//Home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/movie', characterRouter);

app.listen(3000, () => {
  console.log('server running at 3000');
});

module.exports = app;
