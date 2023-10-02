class WaveVisual {
    constructor() {
        this.angle = 0;
        this.amplitude = 50;
        this.frequency = 0.5;
        //this.yOff = 0.0;
        this.angleAdd = this.frequency/20
        this.waveType = "sine"
        this.waveYValues  = [];
        this.horizontalSpeed = 0;
    }


    display () {
        // Increment the angle over time to make the sine wave move
        this.angle += this.angleAdd;
        this.angle += this.horizontalSpeed;

        // Calculate the y-coordinate of the sine wave
        //let y = eval("this.get" + this.waveType + "Y()");
        let y;
        switch (this.waveType){
            case  "sine":
                y = this.getSineY();
               
                break;
            case  "square":
                y = this.getSquareY();
                break;
            case  "tri":
                y = this.getTriY();
                break;
            case  "saw":
                y = this.getSawY();
                break;
            default:
                console.log("You messed up switchcase visual");
        }
        this.waveYValues.unshift(y);
        if(this.waveYValues.length > width){
            this.waveYValues.pop();
        }
        

        // //sawtooth y 
        // let y2 = this.getSawY();


        // //Square Wave y
        // let y3 =  this.getSquareY();

        // let y4 = this.getTriY();
    
        // console.log(y3)
        // Draw the sine wave
        translate(0, height / 2);
        noFill();
        stroke(0);
        beginShape();
       //rect(0, 0, width, y);
        for (let i = 0; i < this.waveYValues.length; i++) {
            // for (let j = 0; j < this.waveYValues[i]; j++) {
                vertex(i, this.waveYValues[i]);
                
            //}
           
        }
        endShape();
        stroke(255,0,0)
        line(0,0,width,0)
        //ver
    }

    setWaveType(type){
        this.waveType = type;
    }

    getSquareY(){
        let y = map(this.angle  % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
        y = y > 0 ? this.amplitude : -this.amplitude;
        return y;
    }

    getSineY(){
        return this.amplitude * sin(this.frequency * this.angle);
    }

    getTriY(){
        let y = map(this.angle * 2 % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
        if (this.angle % (TWO_PI) > PI) {
            y = map(this.angle % (TWO_PI), PI, TWO_PI, this.amplitude, -this.amplitude);
        }
        return y;
    }

    getSawY(){
        return map(this.angle % TWO_PI, 0, TWO_PI, this.amplitude, -this.amplitude);
    }
}
// class WaveVisual {
//     constructor() {
//       this.angle = 0;
//       this.amplitude = 50;
//       this.frequency = 0.5;
//       this.angleAdd = this.frequency / 20;
//       this.waveType = "sine";
//       this.waveYValues = [];
//       this.horizontalSpeed = 2.0; // Adjust this value to make waves move faster horizontally
//       this.xOffset = 0; // Initialize xOffset
//     }
  
//     display() {
//       // Calculate the x-coordinate for the vertex points based on xOffset
//       let x = this.xOffset;
  
//       // Calculate the y-coordinate of the sine wave based on your wave type
//       let y;
//       switch (this.waveType) {
//         case "sine":
//           y = this.getSineY();
//           console.log(y);
//           break;
//         case "square":
//           y = this.getSquareY();
//           break;
//         case "tri":
//           y = this.getTriY();
//           break;
//         case "saw":
//           y = this.getSawY();
//           break;
//         default:
//           console.log("You messed up switchcase visual");
//       }
  
//       // Add the new vertex to the array
//       this.waveYValues.unshift(y);
  
//       // Increment the xOffset to move the wave horizontally
//       this.xOffset += this.horizontalSpeed;
  
//       // If the xOffset exceeds the canvas width, reset it
//       if (this.xOffset > width) {
//         this.xOffset = 0;
//       }
  
//       // Ensure that the waveYValues array does not exceed the canvas width
//       if (this.waveYValues.length > width) {
//         this.waveYValues.pop();
//       }
  
//       // Draw the sine wave
//       translate(0, height / 2);
//       noFill();
//       stroke(0);
//       beginShape();
//       for (let i = 0; i < this.waveYValues.length; i++) {
//         vertex(x + i, this.waveYValues[i]);
//       }
//       endShape();
//       stroke(255, 0, 0);
//       //line(x, 0, x + width, 0);
//     }
  
//     setWaveType(type) {
//       this.waveType = type;
//     }
  
//     getSquareY() {
//       let y = map(this.angle % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
//       y = y > 0 ? this.amplitude : -this.amplitude;
//       return y;
//     }
  
//     getSineY() {
//       return this.amplitude * sin(this.frequency * this.angle);
//     }
  
//     getTriY() {
//       let y = map(this.angle * 2 % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
//       if (this.angle % (TWO_PI) > PI) {
//         y = map(this.angle % (TWO_PI), PI, TWO_PI, this.amplitude, -this.amplitude);
//       }
//       return y;
//     }
  
//     getSawY() {
//       return map(this.angle % TWO_PI, 0, TWO_PI, this.amplitude, -this.amplitude);
//     }
//   }
  