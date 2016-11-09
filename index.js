'use strict';
const path = require('path');
const PORT = 3339;

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/docs/index.html'));
});
app.use("/", express.static(path.join(__dirname, 'docs')));

app.listen(PORT);
console.log('listening on port ' + PORT);