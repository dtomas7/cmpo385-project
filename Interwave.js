let waveArray = []
let waveVisualArray = [];
let octaveSplit = 24;
let spectrum, fft;

function setup() {
  let cnv = createCanvas(800 * 2, 600 * 2);
  cnv.mouseClicked(toggleWave);
  for (let i = 0; i < 7; i++) {
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    waveVisualArray.push(new WaveVisual(tempWave));
    
  }

  //waveVisual = new WaveVisual();
  fft = new p5.FFT(0.75, 1024 * 8); 
  octaveBands = fft.getOctaveBands(octaveSplit);
  bandsNumber = octaveBands.length;

  

  this.osc = new p5.Oscillator("sine");
  this.osc.amp();
  this.osc.freq(this.freq);
  

  // let label = createSpan('Slider Label:');
  // label.position(10, 10);
  
  // // Create the slider
  // slider = createSlider(0, 100, 50);
  // slider.position(10, 60);

  // // Associate the label with the slider using "for" and "id"
  // label.attribute('for', 'slider');
  // slider.attribute('id', 'slider');

}

function draw() {
  background(220);
  forLoopUtil((index) => waveVisualArray[index].display());

  spectrum = fft.analyze();
  drawOctaveBand();


  
  // let val = slider.value();
  // text('Value: ' + val, 10, 70);

  
  // let spectrum = fft.analyze();
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i< spectrum.length; i++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = map(spectrum[i], 0, 255,0,  height/2);
  //   rect(x, height, width / spectrum.length, -h )
  // }
}

function toggleWave(){
  for(let i = 0; i < waveArray.length; i++) {
    waveArray[i].trigger();
    
  }
}

  
function keyTyped() {
  
  switch (key){
    case  "a":
      forLoopUtil((index) => waveVisualArray[index].setWaveType("sine"));
      forLoopUtil((index) => waveArray[index].changeWaveForm("sine"));
      break;

    case  "s":
      forLoopUtil((index) => waveVisualArray[index].setWaveType("square"));
      forLoopUtil((index) => waveArray[index].changeWaveForm("square"));
      break;
    case  "d":
      forLoopUtil((index) => waveVisualArray[index].setWaveType("saw"));
      forLoopUtil((index) => waveArray[index].changeWaveForm("saw"));
      break;
    case  "f":
      forLoopUtil((index) => waveVisualArray[index].setWaveType("tri"));
      forLoopUtil((index) => waveArray[index].changeWaveForm("tri"));
      break;
    default:
      console.log("Switch case keypress ");
  }
}
function forLoopUtil(func){
  for(let i = 0; i < waveArray.length; i++) {
    func(i);
  }
}

function drawOctaveBand(){
  //get the octave bands of our spectrum - average all bins in a particular octave band
  //and we store those averages in our groupedFrequencies array 
  groupedFrequencies = fft.logAverages(octaveBands);
  
  forLoopUtil((a) => {
    pop();
    pop();
  })
  for(let i = 0; i < bandsNumber; i++){
    stroke(255);
    fill(255);
    
    //rectangle height represents the avg value of this frequency range
    let h = map(groupedFrequencies[i], 0, 255, 0, height/4/2);
    stroke(0,255,0);
    rect((i*width/bandsNumber), height/2, 1, -h);
    if (i % octaveSplit == 0){
      stroke(255,0,0)
      line(i*width/bandsNumber, 0, i*width/bandsNumber, height/2)
    } 
  }
}