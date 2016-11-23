navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var peer = new Adawarp();
var conn;
var call;

var localStream;
var connectedCall = null;

var myID;
var partnerID;


window.onload = function(){
    displayMyCamera();
    peer.on('open', function(){
        document.getElementById("myID").innerHTML = peer.id;
    });
    peer.login();
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

function outputUpdate(vol) {
  document.querySelector('#volume').value = vol;
  if(conn != null) conn.send(vol);
}