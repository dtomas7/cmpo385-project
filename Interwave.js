let waveArray = []
let waveVisualArray = [];

function setup() {
  let cnv = createCanvas(400,400);
  cnv.mouseClicked(toggleWave);
  for (let i = 0; i < 5; i++) {
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    //visualArray.push(new Node(tempWave, posArray[i])); 
  }

  forLoopUtil(() => waveVisualArray.push(new WaveVisual()));
  //waveVisual = new WaveVisual();

  

  this.osc = new p5.Oscillator("sine");
      this.osc.amp();
      this.osc.freq(this.freq);
  

}

function draw() {
  background(220);
  forLoopUtil((index) => waveVisualArray[index].display());
  //waveVisual.display();

  
}

function toggleWave(){
  for(let i = 0; i < waveArray.length; i++) {
    waveArray[i].trigger();
    console.log(waveVisual.waveYValues);
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