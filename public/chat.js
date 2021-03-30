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
    var message = document.getElementById('message');
    var send_button = document.getElementById('send');

    // Adding event to send message
    send_button.addEventListener('click', function(){
        createChatElement('user', message.value);

        // emit method takes two parameters: event name, and data to be sent
         /* the name chat-message is user-defined and is implemented 
        as an event below so that the Client could also respond to the Server. */
        //alert('hii');
        clientSocket.emit('chat-message', {message: message.value, handle: ''});
       
        message.value = "";      // resetting message input field
        //alert('sent');     // DEBUGING
    });

    // RESPONDING TO SERVER'S MESSAGES
    clientSocket.on('chat-message', function(data){
         createChatElement('bot', data);
        //alert('server message: ', data.message);      // DEBUGGING
    });

}

// function to create user/bot chat elements and display them
function createChatElement(userType, message){
     // creating references to DOM elements
     var chat_body = document.getElementById('chat-body');
     // creating div element to contain user and message
     var chat_div = document.createElement('div');
     // creating div element to contain image
     var img_div = document.createElement('div');
     var profile_image = document.createElement('img');
     // creating element for message
     var message_element = document.createElement('p');

    if(userType.localeCompare('user') == 0){   // if the type is client/user
        // add appropriate classes to display user image and message  
        chat_div.classList.add('chat');
        chat_div.classList.add('self');       
        img_div.classList.add('user-photo');          
        profile_image.src = 'images/user-small.png';
        img_div.appendChild(profile_image);        
        message_element.classList.add('chat-message');        
    }
    else{              // the type is bot
        // add appropriate classes to display bot image and message  
        chat_div.classList.add('chat');
        chat_div.classList.add('friend');     
        img_div.classList.add('user-photo');     
        profile_image.src = 'images/drlecter-small.png';
        img_div.appendChild(profile_image);    
        message_element.classList.add('chat-message');
    }

    // displaying user's message
    message_element.innerHTML = message;
    chat_div.appendChild(img_div);
    chat_div.appendChild(message_element);
    chat_body.appendChild(chat_div); 

}




