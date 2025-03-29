const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('../routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.set('trust proxy', true)

const ROOT_DOMAIN = '/api/v1';

app.use(ROOT_DOMAIN, (req, res, next) => {
    next();
});

/* API Documentation */
app.use(`${ROOT_DOMAIN}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get(`${ROOT_DOMAIN}/docs.json`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Use the routes from the `routes` folder with a base path `/api/v1`
app.use(`${ROOT_DOMAIN}`, routes);

app.listen(80, () => {
    console.log(`Accepting requests on port 80 with root domain ${ROOT_DOMAIN}`);
});
