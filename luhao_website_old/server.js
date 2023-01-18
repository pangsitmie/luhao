const http = require("http");
const express = require("express");
var path = require('path');
const app = express();
app.use("/", express.static(__dirname));

const server = http.createServer(app);
server.listen(8001);
console.log("listen on 8001");

