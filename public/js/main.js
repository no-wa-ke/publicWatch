var counter = 0;

//  var s = io.connect(); //remote
var s = io.connect('http://10.0.1.2'); //local

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
})

s.on("removeImg", function(data) { // erase only removed ones.

    $("." + data.string).remove();

})


function removerImage (){

        for (var i = 0; i < counter.length; i++) {
            $(".counter" + i).remove();
        }
        counter = 0;
        console.log(counter);

}

/* //chat app

  //クライアントからイベント送信（イベント名は自由に設定できます）
  function sendMessage() {
    var msg = $("#message").val(); //取得
    $("#message").val(""); //空白にする
    s.emit("C_to_S_message", {value:msg}); //サーバへ送信
  }
 
  function sendBroadcast() {
    var msg = $("#message").val(); //取得
    $("#message").val(""); //空白にする
    s.emit("C_to_S_broadcast", {value:msg}); // サーバへ送信
  }
 
  //jqueryでメッセージを追加
  function addMessage (value,color,size) {
    var msg = value.replace( /[!@$%<>'"&|]/g, '' ); //タグ記号とかいくつか削除
    $("#msg_list").prepend("<div class='msg'>" + msg + "</div>");
    // $("#imgContainer").append('<img src=' + img + "/>") 
  }    
  
  function duplicaDetect(element){


}

*/