let waveArray = []
let waveVisualArray = [];
let octaveSplit = 24;
let spectrum, fft;

function setup() {
  let cnv = createCanvas(800,600);
  cnv.mouseClicked(toggleWave);
  for (let i = 0; i < 5; i++) {
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    
  }

  forLoopUtil(() => waveVisualArray.push(new WaveVisual()));
  //waveVisual = new WaveVisual();
  fft = new p5.FFT(0.75, 1024 * 8); 
  octaveBands = fft.getOctaveBands(octaveSplit);
  bandsNumber = octaveBands.length;

  

  this.osc = new p5.Oscillator("sine");
      this.osc.amp();
      this.osc.freq(this.freq);
  

}

function draw() {
  background(220);
  forLoopUtil((index) => waveVisualArray[index].display());
  //waveVisual.display();

  spectrum = fft.analyze();
  drawOctaveBand();

  
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
    let h = map(groupedFrequencies[i], 0, 255, 0, height/4);
    stroke(0,255,0);
    rect((i*width/bandsNumber), height/2, 1, -h);
    if (i % octaveSplit == 0){
      stroke(255,0,0)
      line(i*width/bandsNumber, 0, i*width/bandsNumber, height/2)
    } 
  }
}