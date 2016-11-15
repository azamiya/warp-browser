navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var user = location.hash.replace(/#?user=(\w+)/, "$1");
var peer = new Adawarp({
  credential: {
    username: user ? user : null
  }
});
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
    peer.on("updatePeerList", function(peers) {
        console.log(peers);
        setPeerList(peers);
    });
    peer.login();
}

function setPeerList(peerInfoList) {
  let list = document.getElementById("peer-list");
    
  list.innerHTML = "";
  for (let i in peerInfoList) {
    (function(info) { 
      if (peer.info.name === info.name) {
        return ;
      }
     let e = document.createElement("li");
     let text = document.createElement("span");
     e.textContent = `${i}: ${peerInfoList[i].name}`;
     let ringButton = document.createElement("button");
     ringButton.textContent = "Connect";
     ringButton.onclick = function() {
       document.getElementById("partner-id-input").value = info.id;
       callStart();
     };
     e.append(text);
     e.append(ringButton);
     list.appendChild(e);
    })(peerInfoList[i]);
  }
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

function LedOn(){
  if(conn != null) conn.send("LedOn");
}

function LedOff(){
  if(conn != null) conn.send("LedOff");
}
