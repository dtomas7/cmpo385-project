class WaveVisual {
    constructor() {
        this.angle = 0;
        this.amplitude = 100;
        this.frequency = 1;
        //this.yOff = 0.0;
        this.angleAdd = this.frequency/20
        this.waveType = "sine"
    }


    display () {
        // Increment the angle over time to make the sine wave move
        this.angle += this.angleAdd;

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

        // //sawtooth y 
        // let y2 = this.getSawY();


        // //Square Wave y
        // let y3 =  this.getSquareY();

        // let y4 = this.getTriY();
    
        // console.log(y3)
        // Draw the sine wave
        translate(0, height / 2);
        for (let x = 0; x < width; x += 1) {
            //sine
            stroke(0);
            line(x, 0, x, y);
            //saw
            // stroke(255,0,0)
            // line(x, 0, x, y2);
            // //square
            // stroke(0,255,0);
            // line(x, 0, x, y3);

            // // //triganle
            // stroke(0,0,255);
            // line(x, 0, x, y4);

            //this.yOff += 0.01; // Offset to create the appearance of motion
        }
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