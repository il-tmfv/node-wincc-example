var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

require('./wincc-server')(io, 1000);

server.listen(3000); 
