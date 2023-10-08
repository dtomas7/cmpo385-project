class SlidePair {
    constructor(posX, posY, labelStr, wave) {   
        this.posX = posX;
        this.posY = posY;
        this.labelStr  = labelStr;
        this.wave = wave;
        this.label = createSpan(this.labelStr);
        if (labelStr == "Amp slider:"){
            this.slider = createSlider(0, 100, map(this.wave.amplitude, 0, 1, 0, 100),  1);
        }
        else{
            this.slider = createSlider(0, 100, map(this.wave.freq, 40, 5000, 0, 100),  0.01);
        }
        
        this.label.position(this.posX, this.posY);
        this.slider.position(this.posX, this.posY + 30)
        this.slider.style('width', '300px'); // Set the width of the slider
    }

    hide(){
        this.label.hide();
        this.slider.hide();
    }

    show(){
        this.label.show();
        this.slider.show();
    }

    

    // udpateWave() {
    //     this.slider.label
    // }
}
  