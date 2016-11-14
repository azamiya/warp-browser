var ButtonIdMap = {
  "38": "Forward",
  "40": "Back",
  "37": "Left",
  "39": "Right"
}

var acc = [90, 90];

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
  vol = parseInt(vol);
  acc[0] = "servo";
  acc[1] = vol;
  if(conn != null) conn.send(acc);
}