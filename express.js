var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var p = require('path');
// chokidar 
var getImg
var chokidar = require('chokidar');
var watcher = chokidar.watch('public', {ignored: /[\/\\]\./, persistent: true});

app.use(require('express').static(p.join(__dirname, 'public/')));

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');

});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  console.log(data);

  });
});


watcher.
on('add', function(path) {
    path = path.replace('public',''); 
    div = path.replace(/\/|.jpg/g , '');
    div = "photo-" +div;

    //div = div.replace('.jpg','');// so client-side can access public folder
    console.log('File', path, 'has been added');
    io.sockets.emit("toImg",{src:path,string:div});
    })
.on('unlink', function(path) {
	console.log('File', path, 'has been removed');

    path = path.replace('public',''); 
    div = path.replace(/\/|.jpg/g , '');
    div = "photo-" +div;
  	
  	    io.sockets.emit("removeImg",{src:path,string:div});
    })
  .on('error', function(error) {console.error('Error happened', error);})

