class SlidePair {
    constructor(posX, posY, labelStr, wave) {   
        this.amount;
        this.posX = posX;
        this.posY = posY;
        this.labelStr  = labelStr;
        this.wave = wave;
        
        if (labelStr == "Amp slider:"){
            this.amount = this.wave.amplitude;
            this.slider = createSlider(0, 1, this.amount,  0.01);
            this.slider.style('width', '300px'); // Set the width of the slider
        }
        else{
            this.amount = this.freqToCent();
            this.slider = createSlider(0, 1200 * 7, this.amount,  100);
            this.slider.style('width', '650px'); // Set the width of the slider
        }
        
        this.label = createSpan(this.labelStr + " " + this.amount);
        this.label.position(this.posX, this.posY);
        this.slider.position(this.posX, this.posY + 30)
        
    }

    hide(){
        this.label.hide();
        this.slider.hide();
    }

    show(){
        this.label.show();
        this.slider.show();
    }

    setAmount(amount) {
        this.amount = amount.toFixed(2);
        this.label.html(this.labelStr + " " + this.amount);
    }

    freqToCent () {
        let lowestFreq = 41.2;
        let relativeFreq = this.wave.freq / lowestFreq;
        let centDif =  1200 * (Math.log2(relativeFreq));
        return centDif;
    }

    

    // udpateWave() {
    //     this.slider.label
    // }
}
  