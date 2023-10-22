let waveArray = []
let waveVisualArray = [];
let uiSet = [];
let octaveSplit = 24;
let spectrum, fft;
//let waveSelected = 0;
let maxWaves = 7;
let waveSelect;
let waveSelected = 0;
let waveTypeSelect, typeLabel;


function setup() {
  let cnv = createCanvas(800 * 2, 600 * 2);
  cnv.mouseClicked(toggleWave);
  for (let i = 0; i < maxWaves; i++) {
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    let tempWaveVisual =new WaveVisual(tempWave);
    waveVisualArray.push(tempWaveVisual);
    let slidePairAmp = new SlidePair(10, height + 10, "Amp slider:", waveArray[i]);
    //SlidePairAmp.hide();
    let slidePairFreq = new SlidePair(10, height + 60, "Freq slider:", waveArray[i]);
    //SlidePairFreq.hide();
    let waveTypeSelectPair = new SelectPair(350, height + 10, tempWave, tempWaveVisual); 
    uiSet.push([slidePairAmp, slidePairFreq, waveTypeSelectPair]);


    

    // waveTypeSelect = createSelect();
    // waveTypeSelect.position(450 , height + 50);
    // waveTypeSelect.selected("sine");
    // waveTypeSelect.option("sine");
    // waveTypeSelect.option("tri");
    // waveTypeSelect.option("saw");
    // waveTypeSelect.option("square");
    // waveTypeSelect.changed(waveTypeSelectEvent);

  }

  typeLabel = createSpan("Wave Selected:");
  typeLabel.position(450, height + 10);

  waveSelect = createSelect();
  waveSelect.position(450, height + 40);
  waveSelect.selected(1);
  waveSelect.option(1);
  waveSelect.option(2);
  waveSelect.option(3);
  waveSelect.option(4);
  waveSelect.option(5);
  waveSelect.option(6);
  waveSelect.option(7);
  waveSelect.changed(waveSelectEvent);

  //waveVisual = new WaveVisual();
  fft = new p5.FFT(0.75, 1024 * 8); 
  octaveBands = fft.getOctaveBands(octaveSplit);
  bandsNumber = octaveBands.length;

  

  this.osc = new p5.Oscillator("sine");
  this.osc.amp();
  this.osc.freq(this.freq);
  

  // let label = createSpan('Amplitude Slider');
  // label.position( 10, height + 10);
  
  // // Create the slider
  // slider = createSlider(0, 100, 50, 1);
  // slider.position(10, height + 30);
  // slider.style('width', '200px'); // Set the width of the slider
  
  

  // Associate the label with the slider using "for" and "id"
  // label.attribute('for', 'slider');
  // slider.attribute('id', 'slider');

}

function draw() {
  background(220);
  forLoopUtil((index) => waveVisualArray[index].display());

  spectrum = fft.analyze();
  drawOctaveBand();

  forLoopUtil((index) => {
    if (index != waveSelected){
      uiSet[index][0].hide();
      uiSet[index][1].hide();
      uiSet[index][2].hide();
    }
  });
  uiSet[waveSelected][0].show();
  uiSet[waveSelected][1].show();
  uiSet[waveSelected][2].show();
  

  //changing the amplitdue stuff
  
  let ampVal = uiSet[waveSelected][0].slider.value();
  waveArray[waveSelected].changeAmp(ampVal);
  uiSet[waveSelected][0].setAmount(ampVal);


  //changing the frequency
  let centVal = uiSet[waveSelected][1].slider.value();
  //waveArray[waveSelected].changeFreq(map(freqVal, 0, 100, 40, 5000));  // make this some how linear to pitch
  uiSet[waveSelected][1].setAmount(centToFreq(centVal));
  waveArray[waveSelected].changeFreq(centToFreq(centVal)); // using cents
  //ive alrady done freq to cents, just need to proagbaly to cents to freq


  
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
  // uiSet[0][0].hide();
  // uiSet[0][1].hide();
}

function waveSelectEvent() {
  waveSelected = waveSelect.value() -1;
  console.log(waveSelected);
}

function centToFreq (cents) { //converts from cents to freq
    let lowestFreq = 41.2;
    let newFreq = lowestFreq * (Math.pow(2, cents/1200));
    return newFreq;
}

  
function keyTyped() {
  // uiSet[0][0].show();
  // uiSet[0][1].show();
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