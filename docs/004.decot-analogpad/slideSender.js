navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var peer = new Adawarp();
var conn;
var call;

var localStream;
var connectedCall = null;

var myID;
var partnerID;
var acc = [90, 90];


window.onload = function(){
    displayMyCamera();
    peer.on('open', function(){
        document.getElementById("myID").innerHTML = peer.id;
    });
    peer.login();
    let analogPad1 = new AnalogPad(document.querySelector('#controller'));
    analogPad1.subscribe(function(e){
        //console.log("analog1: ",e.x);
        acc[0] = parseInt(e.x);
        acc[1] = parseInt(e.y);
        //socket.emit('servo', e);
        if(conn != null) conn.send(JSON.stringify(acc));
    });
}

function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        document.getElementById("myVideo").src = URL.createObjectURL(stream);
    }, function() { alert("Error!"); });
}

function callStart(){
    conn = peer.connect(partnerID);
    partnerID = document.getElementById("partner-id-input").value;
    var call = peer.call(partnerID, localStream);
    connectedCall = call;
    call.on('stream', function(stream){
        document.getElementById("partnerID").innerHTML = partnerID;
        var url = URL.createObjectURL(stream);
        document.getElementById("partnerVideo").src = url;
    });
}

function callEnd() {
    conn.close();
    connectedCall.close();
}