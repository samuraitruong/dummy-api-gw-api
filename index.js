var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('combined'));

app.all('*', function (req, res) {
  res.json({
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      method: req.method,
      path: req.path,
      success: true,
      headers: req.headers,
    }),
  });
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is up and running at ', port);
});
