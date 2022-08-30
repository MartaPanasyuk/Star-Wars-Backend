const express = require('express'); //load express module
const corsMiddleWare = require('cors');
const characterRouter = require('./routers/characters');
const planetRouter = require('./routers/planets');

const app = express();

app.use(corsMiddleWare());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use('/movie', characterRouter);
app.use('/planets', planetRouter);

app.listen(4000, () => {
  console.log('server running at 4000');
});

module.exports = app;
