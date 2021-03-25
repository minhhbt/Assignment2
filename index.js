const PatientMessage=require('./PatientMessage.js');

var express = require('express');
var socket = require('socket.io'); // a socket brings in message from the client.

// App setup
var app = express();
var server = app.listen(4000, function () {          // listens to a given port number
    console.log('listening to port # 4000');
});

// Static files: files/content provided by the Server to its Clients
// static files are usually stored within the public folder
app.use(express.static('public'));

// creating Server Socket
var serverSocket = socket(server);
var serverReply=null;
// setup event listener after connection to ther Server has been made
// the "on" method is like the "addEventListener" function for sockets.
serverSocket.on('connection', function (socket) {
    console.log('Connection established...');

    // respond to Client's message. We've named this event as "chat-message".
    socket.on('chat-message', function (data) {
        const setReply = async () => {
            await replyMessage(data.message); //  get a reply message to send to the client
            serverSocket.emit('chat-message', serverReply);    
            console.log('Client message: ', data.message);    
            console.log('Server reply: ', serverReply);
        }
        setReply();
        
    });
});

// simple function to reply to Client's message
async function replyMessage(clientMessage) {
    
    // var response=await defaultReply(clientMessage);
    // console.log(getIntent(response))
    // serverReply = String(response['answer']);
    
   
    let patientMessage=new PatientMessage(clientMessage);
    var reply=await patientMessage.getServerReply();
    serverReply=reply;

    var entities=await patientMessage.getNER();
    if (entities["LOCATION"]!=null){
        serverReply=serverReply.concat("\nI have never been to "+entities["LOCATION"][0]+", have you?");
    }
   

}


