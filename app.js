// without express. not working yet.


var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");
var mkdirp = require('mkdirp');
var getImg;var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// chokidar 
var chokidar = require('chokidar');

 // start server
var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output); }).listen(3000, "10.0.1.2" );

 //mkdir
 mkdirp('./uploads', function(err){
    if (err) console.error(err);
    else console.log('folder created');
});
var io = socketio.listen(server);

 
 var watcher = chokidar.watch('./uploads', {ignored: /[\/\\]\./, persistent:true});
watcher.on('add', function(path) {
    
    getImg = path; 
    console.log('File', getImg, 'has been added');
    io.sockets.emit("toImg",{src:getImg});
      /* Act on the event */
    });


io.sockets.on("connection", function (socket) {


  
 
 console.log("connection established")
  // メッセージ送信（送信者にも送られる）
    socket.on("C_to_S_message", function (data) {
    
    io.sockets.emit("S_to_C_message", {value:data.value});
    console.log(data);
 

    });

  
  // ブロードキャスト（送信者以外の全員に送信）
  socket.on("C_to_S_broadcast", function (data) {
    socket.broadcast.emit("S_to_C_message", {value:data.value});
    console.log(data);
  });
 
  // 切断したときに送信
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
 console.log("user disconnected")
  });


});
