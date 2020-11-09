var socket = io.connect("https://localhost:8009");//initializing socket connection to server
socket.on("connect", (data)=>{
    socket.emit("join", "Hello server from client..");
});

//listener for 'thread' event which updates messages
socket.on("thread", function(data){
    $("#thread").append("<li>" + data + "</li>");
});

//sends message to server, resets, and prevents default form action
$("form").submit(function(){
    var message = $("#message").val();
    socket.emit("messages", message);
    this.reset();
    return false;
});

