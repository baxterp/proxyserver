const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 80;

//const HOST = "proxyserverbrp.herokuapp.com";
const HOST = "localhost";
const API_SERVICE_URL = "http://brpsoft.co.uk/services2/products";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

 // Proxy endpoints
app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
