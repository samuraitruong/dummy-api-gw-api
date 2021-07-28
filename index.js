var express = require('express');
var morgan = require('morgan');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: process.env.SERVICE_NAME || 'dummy service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

var app = express();

morgan.token('json', function (req, res) {
  return JSON.stringify({
    url: req.url,
    method: req.method,
    httpVersion: req.httpVersion,
  });
});

app.use(morgan('combined'));

app.all('*', function (req, res) {
  logger.log({
    level: 'info',
    message: 'incoming request',
    headers: req.headers,
  });
  const raw = req.headers['x-response-raw'] || req.query?.['x-response-raw'];
  const body = {
    url: req.originalUrl,
    serverTime: new Date(),
    method: req.method,
    path: req.path,
    success: true,
    headers: req.headers,
  };

  res.json(
    raw
      ? body
      : {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
  );
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is up and running at ', port);
});
