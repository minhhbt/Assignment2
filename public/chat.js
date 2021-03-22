// this file serves as the Client, which connects to the server
// this script is loaded in the index.html file, which forms the interface between the Client and the Server
// technically, this file (chat.js) and the index.html serve as the frontend of the app

// define Client socket and connect to the Server (at port# 4000)
var clientSocket = io.connect('http://localhost:4000');
//alert('Hi');     // DEBUGGING
window.onload = function(){
    // working with the message
    // creating references to DOM elements
    var chat_body = document.getElementById('chat-body');
    var user_handle = document.getElementById('user-handle');
    var message = document.getElementById('message');
    var send_button = document.getElementById('send');

    // Adding event to send message
    send_button.addEventListener('click', function(){
        // emit method takes two parameters: event name, and data to be sent
         /* the name chat-message is user-defined and is implemented 
        as an event below so that the Client could also respond to the Server. */
        //alert('hii');
        clientSocket.emit('chat-message', {message: message.value, handle: user_handle.value});
        chat_body.innerHTML += '<p><strong>' + user_handle.value + ': </strong>' + message.value + '</p>';

       // message = "";
        //alert('sent');     // DEBUGING
    });

    // RESPONDING TO SERVER'S MESSAGES
    clientSocket.on('chat-message', function(data){
        chat_body.innerHTML += '<p><strong>' + 'Dr. Lecter: ' + '</strong>' + data + '</p>';
        //alert('server message: ', data.message);      // DEBUGGING

    });

}




