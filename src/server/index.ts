require('dotenv').config();
const express = require('express');
const app = express();

module.exports = (async function () {
    // Use express.json() middleware to parse incoming request bodies
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    const incomingCallsRouter = require('../routers/call/incoming-call');
    app.use(incomingCallsRouter);
    return app;
})();