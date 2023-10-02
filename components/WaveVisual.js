class WaveVisual {
    constructor() {
        this.angle = 0;
        this.amplitude = 100;
        this.frequency = 1;
        this.yOff = 0.0;
    }


    display () {
        // Increment the angle over time to make the sine wave move
        this.angle += 0.05;

        // Calculate the y-coordinate of the sine wave
        let y = this.amplitude * sin(this.frequency * this.angle);

        //sawtooth y 
        let y2 = map(this.angle % TWO_PI, 0, TWO_PI, -this.amplitude, this.amplitude);


        //Square Wave y
        let y3 =  map(this.angle  % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
        y3 = y3 > 0 ? this.amplitude : -this.amplitude;

        let y4 = map(this.angle * 2 % (TWO_PI), 0, TWO_PI, -this.amplitude, this.amplitude);
        if (this.angle % (TWO_PI) > PI) {
            y4 = map(this.angle % (TWO_PI), PI, TWO_PI, this.amplitude, -this.amplitude);
        }
    
        // console.log(y3)
        // Draw the sine wave
        translate(0, height / 2);
        for (let x = 0; x < width; x += 10) {
            //sine
            stroke(0);
            line(x, 0, x, y);
            //saw
            stroke(255,0,0)
            line(x, 0, x, y2);
            //square
            stroke(0,255,0);
            line(x, 0, x, y3);

            //triganle
            stroke(0,0,255);
            line(x, 0, x, y4);

            this.yOff += 0.01; // Offset to create the appearance of motion
        }
    }
}