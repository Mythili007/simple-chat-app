var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var PORT = 8009;
var fs = require("fs");
var path = require("path");

app.get("/", function (req, res, next) {
    // console.log("__dirname : ", __dirname + "/public/index.html")
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use(express.static("public"));

io.on("connection", function (client) {
    console.log("Client connected...");

    client.on("join", function (data) {
        console.log(data);
    });

    client.on("messages", function(data){
        client.emit("thread", data);
        client.broadcast.emit("thread", data);
    });
});

server.listen(PORT);
