var ButtonIdMap = {
  "38": "Forward",
  "40": "Back",
  "37": "Left",
  "39": "Right"
}

var acc = {
  yaw : 90,
  pitch : 90
};

var y = 90;

function keyPressed(key, pressed) {
  if (key < 37 || 40 < key) {
    return;
  }
  //console.log("Direction: " + ButtonIdMap[key] + ", pressed:" + pressed);
  let elem = document.getElementById(ButtonIdMap[key]);
  if (pressed) {
    //elem.style.backgroundColor = "red";
    if(conn != null) conn.send(ButtonIdMap[key]);
    console.log(ButtonIdMap[key]);
  } else {
    //elem.style.backgroundColor = "yellow";
    if(conn != null) conn.send("Stop");
    console.log("Stop");
  }
}

document.addEventListener("keydown", function (e) {
  keyPressed(e.which, true);
});
document.addEventListener("keyup", function (e) {
  keyPressed(e.which, false);
});

function outputUpdate(vol) {
  document.querySelector('#volume').value = vol;
  acc.yaw = parseInt(vol);
  acc.pitch = parseInt(180 - vol);
  //console.log(acc);
  y = parseInt(vol);
  console.log(typeof(y));
  if(conn != null) conn.send(y);
}