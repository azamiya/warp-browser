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
    let analogPad1 = new AnalogPad(document.querySelector('#controller'));

    analogPad1.subscribe(function(e){
    //console.log("analog1: ",e);
    acc[0] = e.x;
    acc[1] = e.y
    if(acc[0] > 30 && acc[0] < 150 && acc[1] > 30 && acc[1] < 150) {
        if(conn != null) conn.send(acc);
        //console.log(acc);
      }
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

function Reset(){
    if(conn != null) conn.send("Reset");
}

function Passive(){
    if(conn != null) conn.send("Passive");
}

function Safe(){
    if(conn != null) conn.send("Safe");
}

function Full(){
    if(conn != null) conn.send("Full");
}

function Beep(){
    if(conn != null) conn.send("Beep");
}