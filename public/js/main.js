var counter = 0;
var audio = new Audio('media/apple_newmail.mp3');
 var s = io.connect(); //remote
// var s = io.connect('http://10.0.1.2'); //local home
// var s = io.connect('http://10.0.1.2'); //local school


s.on("available_channnel",function(channels){
  console.log(channels);
})

// connect with sockets
s.on("connect", function() {});
s.on("disconnect", function(client) {});
s.on("S_to_C_message", function(data) { // for chat communication
    addMessage(data.value);
});
s.on("toImg", function(data) { //append uploaded contents

    $("#imgContainer").prepend($('<div class = "' + data.string + ' ' + data.style + ' counter' + counter + '"><img src="' + data.src + '"/></div>').fadeIn('slow'));
    console.log(data.src);
    console.log(data.string);
    console.log(data.style);
    console.log(counter);
    counter = counter + 1;

    if (counter >= 50) {
     
      removerImage();
   
    }

    audio.play();


})

s.on("removeImg", function(data) { // erase only removed ones.

    $("." + data.string).remove();

})


function removerImage (){ // function for counter

        for (var i = 0; i < 50; i++) {
            $(".counter" + i).remove();
        }
        counter = 0;
        console.log(counter);

}

/* //chat app

  function sendMessage() {
    var msg = $("#message").val(); //get
    $("#message").val(""); //空白にする
    s.emit("C_to_S_message", {value:msg}); 
  }
 
  function sendBroadcast() {
    var msg = $("#message").val(); //get
    $("#message").val(""); //空白にする
    s.emit("C_to_S_broadcast", {value:msg}); 
  }
 

  function addMessage (value,color,size) {
    var msg = value.replace( /[!@$%<>'"&|]/g, '' ); 
    $("#msg_list").prepend("<div class='msg'>" + msg + "</div>");
    // $("#imgContainer").append('<img src=' + img + "/>") 
  }    
  
  function duplicaDetect(element){

}

*/
