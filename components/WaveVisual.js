let instances = 0;
class WaveVisual {
    constructor(wave) {
        instances++;

        this.wave = wave;
        this.xSize = width / 8 ;
        this.ySize = height * 3 /8;
        this.xPos = (instances - 1) * this.xSize;
        console.log(this.xPos)
        this.yPos  = height - this.ySize;
        this.padding = this.xSize / 10;
        

        this.angle = 0;
        //this.amplitude = this.xSize / 2;
        this.amplitude = this.findAmp();
        //this.frequency = 5;
        this.frequency = this.findFreq();
        //this.yOff = 0.0;
        this.angleAdd = this.frequency/20
        this.waveType = "sine"
        this.waveAmpValues  = [];
        this.horizontalSpeed = 0;
        
    }


    display () {
        //let tempAmp;
        if(!this.wave.sustaining) {
            this.amplitude = 0;
        }
        else{
            this.amplitude = this.findAmp();
        }
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
        
        this.angle += this.angleAdd;
        this.angle += this.horizontalSpeed;
        
        stroke(50)
        fill(150);
        rect(-1, this.yPos, this.xSize + 2, this.ySize);

        
        push();
        translate(this.xSize/2, 0);

        stroke(255,0,0);
        line(0, this.yPos, 0, this.ySize + this.yPos);

        noFill();
        stroke(0,0,255);
        beginShape();
        
        
       //rect(0, 0, width, y);
       //draw it vertically 
        for (let i = 0; i < this.waveAmpValues.length; i++) {
            vertex(this.waveAmpValues[i], this.yPos + this.ySize - i);
        }
        endShape();
        
        
        push();
        translate(this.xSize/2 + this.padding, 0);
      
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

    findAmp() {
        return this.wave.sustaining ? map(this.wave.amplitude, 0, 1, 0, this.xSize / 2) : 0;;
    }

    findFreq() {
        let relativeFreq = this.wave.freq / 40;
        console.log("rf = " + relativeFreq)
        let centDif =  1200 * (Math.log(relativeFreq)/ Math.log(2));
        //console.log(1200 * (log(this.wave.freq)/log(2)));
        //return 2;
        console.log("cents did = " + centDif)
        console.log("map gioves : "+ map(centDif, 0, 1200 * 7, 0.5, 8))
        return map(centDif, 0, 1200 * 7, 0.5, 6);

    }
}
