var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var p = require('path');
// socket = io.connect(server,{'forceNew': true });
// chokidar 
var getImg;

var chokidar = require('chokidar');

server.listen(80);
app.use(require('express').static(p.join(__dirname, 'public/')));

app.get('/', function (req, res) {

  res.sendfile(__dirname + '/index.html');

});

io.sockets.on('connection', function (socket) {

clientid = socket.id;
var watcher = chokidar.watch('public/img', {ignored: /[\/\\]\./, persistent: true}); // pay attention what's ignored.It can messup your output.
watcher.
on('add', function(path) {
    path = path.replace('public/','');
    div = path.replace(/\/|.jpg/g , '');
    div = "photo-" + div;
    _style ="appended";

    //div = div.replace('.jpg','');// so client-side can access public folder
    console.log('File', path, 'has been added');
    
    // io.sockets.emit("toImg",{src:path,string:div,style:_style}); // global broadcast
    socket.emit("toImg",{src:path,string:div,style:_style}); //only for you
    
    })
.on('unlink', function(path) {
	console.log('File', path, 'has been removed');

    path = path.replace('public/',''); 
    div = path.replace(/\/|.jpg/g , '');
    div = "photo-" +div;
  	
  	// io.sockets.emit("removeImg",{src:path,string:div});
  	socket.emit("removeImg",{src:path,string:div}); //only for you
   
    })
  .on('error', function(error) {console.error('Error happened', error);})

console.log('the server begins! ' + clientid);

});







