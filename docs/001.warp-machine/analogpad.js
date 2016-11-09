var acc = [90, 90];

window.onload = function(){
  let analogPad1 = new AnalogPad(document.querySelector('#controller'));
  /*let analogPad2 = new AnalogPad(document.querySelector('#controller'));
  let analogPad3 = new AnalogPad(document.querySelector('#controller'));
  let analogPad4 = new AnalogPad(document.querySelector('#controller'));*/
  
  analogPad1.subscribe(function(e){
    //console.log("analog1: ",e);
    acc[0] = e.x;
    acc[1] = e.y
    if(acc[0] > 30 && acc[0] < 150 && acc[1] > 30 && acc[1] < 150) {
        if(conn != null) conn.send(acc);
        //console.log(acc);
      }
  });
  displayMyCamera();

  /*analogPad2.subscribe(function(e){
    console.log("analog2: ",e);
  });
  analogPad3.subscribe(function(e){
    console.log("analog3: ",e);
  });
  analogPad4.subscribe(function(e){
    console.log("analog4: ",e);
  });*/
}; 

function AnalogPad(mountPoint){
  
  this.callback = null;
  this.stick = document.createElement("span");
  this.pad = document.createElement("div");

  this.stick.textContent = "●";
  this.stick.classList.add('stick');
  this.pad.classList.add('pad');

  this.pad.appendChild(this.stick);
  mountPoint.appendChild(this.pad);

  this.stickWidth = this.stick.clientWidth;
  this.stickHeight = this.stick.clientHeight;

  this.pad.onmouseleave = (e)=>{
    this.release();
    this.update(e);
  }

  this.pad.onmousedown = (e)=>{
    this.hold();
    this.update(e);
  }

  this.pad.onmousemove = (e)=>{
    this.update(e);
  }

  this.pad.onmouseup = (e)=>{
    this.release();
    this.update(e);
  }
  this.release();
}

AnalogPad.prototype = {
  setPos:function(position){
    this.stick.style.left = position.x - this.stickWidth/2 + "px";
    this.stick.style.top = position.y - this.stickHeight/2 + "px";
    if(this.callback){
      this.callback(position);
    }
  },

  hold:function(e){
    this.isStickControlled = true;
  },

  update:function(e){
    if(this.isStickControlled){
      let position = this.getCoordinateFromMouseEvent(e);
      this.setPos(position);
    }
  },

  release:function(){
    this.isStickControlled = false;
    //this.setPos({x:100,y:100});
  },

  getCoordinateFromMouseEvent:function(e){
    let target = e.target;
    if(target !== this.pad){
      target = e.target.parentNode;
    }
    return {
      x: e.clientX - target.offsetLeft + window.scrollX,
        y: e.clientY - target.offsetTop + window.scrollY
    };
  },

  subscribe: function(cb){
    if(typeof cb !== "function"){
      throw new Error("Cannot subscribe! :",cb);
    }
    this.callback = cb;
  }
}
