const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const port = process.env.PORT || 8080;

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

if(process.env.NODE_ENV === 'development'){
  require('./build/dev.js')(app);
}

if(process.env.NODE_ENV === 'production'){
  require('./build/prod.js')(app);
}

app.listen(port, () => {
  console.log(`Server is running at %d.`, port);
});
