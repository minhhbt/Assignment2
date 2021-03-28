const PatientMessage = require('./PatientMessage.js');
const Doctor = require('./Doctor.js');
var replyFunction = replyMessage;
var doctor=new Doctor();


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
var serverReply = null;
// setup event listener after connection to ther Server has been made
// the "on" method is like the "addEventListener" function for sockets.
serverSocket.on('connection', function (socket) {
    console.log('Connection established...');
    // respond to Client's message. We've named this event as "chat-message".
    socket.on('chat-message', onMessage);
});

function onMessage(data){
    const setReply = async () => {
        let patientMessage = new PatientMessage(data.message);
        await doctor.setMessage(patientMessage);

        await replyFunction(doctor,serverSocket); //  get a reply message to send to the client
        // serverSocket.emit('chat-message', serverReply);
        console.log('Client message: ', data.message);
        console.log('Server reply: ', serverReply);
    }
    setReply();
}

// simple function to reply to Client's message
async function replyMessage(doctor,serverSocket) {

    // var response=await defaultReply(clientMessage);
    // console.log(getIntent(response))
    // serverReply = String(response['answer']);

    serverReply = doctor.getReply();

    // var entities = await patientMessage.getNER();
    // if (entities["LOCATION"] != null) {
    //     serverReply = serverReply.concat("\nI have never been to " + entities["LOCATION"][0] + ", have you?");
    // }
    //need for test
    for(var i=0;i<serverReply.length;i++){
        serverSocket.emit('chat-message', serverReply[i]);
    }
    return serverReply;
}


//used for testing
exports.replyMessage = replyMessage;
//exports.server= server;
function handler() {
    server.close();
}
exports.handler = handler;
