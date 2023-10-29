class Wave {
    constructor(freq) {
      console.log("in waveConstructor")
      this.amplitude = 0.1; 
      this.freq = freq;
      this.waveType = "sine";
      this.modeFunc = this.sustainMode;
      this.sustaining = false;
  
      this.env = new p5.Envelope();// AR Envelope
      this.env.setADSR(0.5, 1.0, 0 , 0 ); //setting it up as adsr
      this.env.setExp(true); //making all the differences exponential
      this.env.setRange(this.amplitude, 0);
  
      this.osc = new p5.Oscillator(this.waveType);
      this.osc.amp(this.amplitude);
      this.osc.freq(this.freq);

      //this.disconnect();

      
      //this.osc.start();
      //this.osc.disconnect();
    }
    // add() {
    //   console.log("in add");
    //   this.osc.connect();
    //   console.log("in connect")
    // }
    delete() {
      this.osc.disconnect();
      console.log("in disconnect")
    }
    changeMode() { 
      console.log("in changeMode")
      this.osc.stop();
  
      this.modeFunc = (this.modeFunc === this.sustainMode) ? this.adsrMode : this.sustainMode; //change mode
      if(this.modeFunc === this.sustainMode) {//sustain mode
        this.sustaining = false;
        this.osc.amp(this.amplitude); 
      }
      else{ //  adsr mode
        this.osc.amp(this.env);
        this.osc.start();
      }
    }
   
    trigger() {
      console.log("in trigger")
      this.modeFunc();
    }
  
    adsrMode(){
      console.log("in adsr mode");
      this.env.triggerAttack();
    }
  
    sustainMode(){
      console.log("in sustain mode");
      this.sustaining ? this.osc.stop() : this.osc.start();
      this.sustaining = !this.sustaining;
    }
  
    changeAmp (a){
      this.amplitude = a;
      if (this.modeFunc === this.sustainMode){ 
        this.osc.amp(a);
      }
      else {
        this.env.setRange(this.amplitude, 0.3);
      }
    }
  
    changeFreq(f){
      this.freq = f;
      console.log("In changeFreq to: " + f);
      this.osc.freq(this.freq);
    }
  
    changeWaveForm(type){
        this.waveType = type;
    //   console.log("in change wvae");
    //   if (this.waveType == "sine") {
    //     this.waveType == "triangle"
    //     this.osc.setType("triangle");
    //   }
    //   else {
    //     this.waveType == "sine"
    //     this.osc.setType("sine");
    //   }

      switch (this.waveType){

        case "sine":
            this.osc.setType("sine");
            break;
        case "square":
            this.osc.setType("square");
            break;
        case "tri":
            this.osc.setType("triangle");
            break;
        case "saw":
            this.osc.setType("sawtooth");
            break;
        default:
            console.log("You messed up switchcase wave");
    }
    }
  }
  