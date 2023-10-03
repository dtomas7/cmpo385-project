let instances = 0;
class WaveVisual {
    constructor() {
        instances++;
        this.xSize = 50;
        this.ySize = 200;
        this.xPos = (instances - 1) * this.xSize;
        console.log(this.xPos)
        this.yPos  = 0;//height - this.ySize;
        

        this.angle = 0;
        this.amplitude = this.xSize / 2;
        this.frequency = 1.5;
        //this.yOff = 0.0;
        this.angleAdd = this.frequency/20
        this.waveType = "sine"
        this.waveAmpValues  = [];
        this.horizontalSpeed = 0;
        
    }


    display () {
        // Increment the angle over time to make the sine wave move
        

        // Calculate the y-coordinate of the sine wave
        //let y = eval("this.get" + this.waveType + "Y()");
        let amp;
        switch (this.waveType){
            case  "sine":
                this.angle -= this.angleAdd;
                this.angle += 0.05;
                amp = this.getSineY();
               
                break;
            case  "square":
                amp = this.getSquareY();
                break;
            case  "tri":
                amp = this.getTriY();
                break;
            case  "saw":
                amp = this.getSawY();
                break;
            default:
                console.log("You messed up switchcase visual");
        }
        this.waveAmpValues.unshift(amp);
        if(this.waveAmpValues.length > this.ySize){
            this.waveAmpValues.pop();
        }
        

        // //sawtooth y 
        // let y2 = this.getSawY();


        // //Square Wave y
        // let y3 =  this.getSquareY();

        // let y4 = this.getTriY();
    
        // console.log(y3)
        // Draw the sine wave horizonatlly 
    //     translate(0, height / 2);
    //     noFill();
    //     stroke(0);
    //     beginShape();
    //    //rect(0, 0, width, y);
    //     for (let i = 0; i < this.waveAmpValues.length; i++) {
    //         vertex(i, this.waveAmpValues[i]);
    //     }
    //     endShape();
    //     stroke(255,0,0)
    //     line(0,0,width,0)

        
        
        stroke(0)
        fill(150);
        rect(0, this.yPos, this.xSize + 1, this.ySize);
        this.angle += this.angleAdd;
        this.angle += this.horizontalSpeed;
        noFill();
        stroke(0);
        beginShape();

        translate(this.xSize/2, this.yPos/2);
       //rect(0, 0, width, y);
       //draw it vertically 
        for (let i = 0; i < this.waveAmpValues.length; i++) {
            vertex(this.waveAmpValues[i], this.ySize - i);
        }
        endShape();
        stroke(255,0,0);
        line(0, 0, 0, this.ySize);

        translate(this.xSize/2 + 1, this.yPos/2);
      
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
  