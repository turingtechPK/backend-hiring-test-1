const express = require('express')
router = require('./src/routes');
const http = require('http');
require("./src/config/database");
const voiceCall = require('./src/model/voiceCall');

app = express();
const port = 3000; // Change the port number as needed

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("--------------------------------------------------------------------------------------------------------------");
  console.log(`-----------------------------------     Server is running on port ${port}     -----------------------------------`);
  console.log("--------------------------------------------------------------------------------------------------------------");
});
