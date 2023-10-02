let waveArray = []
let waveVisual;

function setup() {
  let cnv = createCanvas(400,400);
  cnv.mouseClicked(toggleWave);
  for (let i = 0; i < 5; i++) {
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    //visualArray.push(new Node(tempWave, posArray[i])); 
  }
  waveVisual = new WaveVisual();

  

  this.osc = new p5.Oscillator("sine");
      this.osc.amp();
      this.osc.freq(this.freq);
  

}

function draw() {
  background(220);
  waveVisual.display();

  
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
      waveVisual.setWaveType("sine");
      forLoopUtil((index) => waveArray[index].changeWaveForm("sine"));
      break;

    case  "s":
      waveVisual.setWaveType("square");
      forLoopUtil((index) => waveArray[index].changeWaveForm("square"));
      break;
    case  "d":
      waveVisual.setWaveType("saw");
      forLoopUtil((index) => waveArray[index].changeWaveForm("saw"));
      break;
    case  "f":
      waveVisual.setWaveType("tri");
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