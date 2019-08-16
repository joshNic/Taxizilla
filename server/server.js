var express = require('express');
var path = require('path');
var bodyPaser = require('body-parser');

var socket_io = require('socket.io');
var io = socket_io();

var index = require('./routes/index');
var bookings = require('./routes/bookings');

var app = express();

var port = 3000;

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Body paser MW

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

//Routes

app.use('/', index);
app.use('/api', bookings);

io.listen(
  app.listen(port, function() {
    console.log('Server running on port', port);
  })
);

app.io = io.on('connection', function(socket) {
  console.log('Socket Connected: ' + socket.id);
});
