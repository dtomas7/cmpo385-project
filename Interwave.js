let waveArray = []
let waveVisualArray = [];
let uiSet = [];
let octaveSplit = 24;
let spectrum, fft;
//let waveSelected = 0;
let maxWaves = 7;
let waveSelect;
let waveSelected = 0;
let waveTypeSelect, typeLabel, amountLabel;
let waveAmount = 1;
let addBut, minusBut;
let globalSustaining;
let lpf, hpf;
let lpfSlider, hpfSlider, lResSlider, hResSlider;
let lpfCheckbox, hpfCheckbox;
let hResLabel, lResLabel;
let adsrLabel, adsrCheckbox;
let a = {value:0.5},d = {value:1.0} ,s = {value:0.0}, r = {value:0.0};
let labelA, labelD, labelS, lavelR;
let inputA, inputD, inputS, inputR;


function setup() {
  let cnv = createCanvas(800 * 2, 1000);
  cnv.mouseClicked(toggleWave);

  lpf = new p5.LowPass();
  hpf = new p5.HighPass();

  for (let i = 0; i < maxWaves; i++) { //setting up all things relating to a specific wave
    let tempWave = new Wave((i+1) * 55);
    waveArray.push(tempWave);
    let tempWaveVisual =new WaveVisual(tempWave);


    waveVisualArray.push(tempWaveVisual);
    let slidePairAmp = new SlidePair(10, height + 10, "Amp slider:", waveArray[i]);
    let slidePairFreq = new SlidePair(10, height + 60, "Freq slider:", waveArray[i]);
    let waveTypeSelectPair = new SelectPair(350, height + 10, tempWave, tempWaveVisual); 
    uiSet.push([slidePairAmp, slidePairFreq, waveTypeSelectPair]);
  }

  //creating for wave select

  typeLabel = createSpan("Wave Selected:");
  typeLabel.position(450, height + 10);

  waveSelect = createSelect();
  waveSelect.position(450, height + 40);
  waveSelect.selected("1");
  waveSelect.option("1");
  waveSelect.option("2");
  waveSelect.option("3");
  waveSelect.option("4");
  waveSelect.option("5");
  waveSelect.option("6");
  waveSelect.option("7");
  waveSelect.disable("2");
  waveSelect.disable("3");
  waveSelect.disable("4");
  waveSelect.disable("5");
  waveSelect.disable("6");
  waveSelect.disable("7");
  waveSelect.changed(waveSelectEvent);


  //For creating wave amount
  globalSustaining = false;
  amountLabel = createSpan("Waves: 1");
  amountLabel.position(570, height + 10);

  minusBut = createButton(' - ');
  minusBut.position(575, height + 40);
  minusBut.mousePressed(minusWave);

  addBut = createButton('+');
  addBut.position(600, height + 40);
  addBut.mousePressed(addWave);

  //for the overall visualisation
  fft = new p5.FFT(0.75, 1024 * 8); 
  octaveBands = fft.getOctaveBands(octaveSplit);
  bandsNumber = octaveBands.length;

  //for the filters. Instantiated above
  //chain is osc -> hpf -> lpf

  hpf.disconnect();
  hpf.connect(lpf);

  lpf.freq(20000);
  hpf.freq(0);

  //lpf and hpf UI
  lpfSlider = createSlider(50,1000,500);
  lpfSlider.position(830, height + 25);
  lpfSlider.style('width', '200px');

  lResLabel = createSpan("Resonance");
  lResLabel.position(1050, height + 25);
  lResSlider = createSlider(0, 25, 0);
  lResSlider.position(1130, height + 25);

  hpfSlider = createSlider(500,15000,500);
  hpfSlider.position(830, height + 75);
  hpfSlider.style('width', '200px');
  
  hResLabel = createSpan("Resonance");
  hResLabel.position(1050, height + 75);
  hResSlider = createSlider(0, 25, 0);
  hResSlider.position(1130, height + 75);


  lpfCheckbox = createCheckbox('Low Pass Filter', false);
  lpfCheckbox.changed(toggleLpf);
  lpfCheckbox.position(700, height + 20);

  hpfCheckbox = createCheckbox('High Pass Filter', false);
  hpfCheckbox.changed(toggleHpf);
  hpfCheckbox.position(700, height + 70);
  

  forLoopUtil ((index) => {
    waveArray[index].osc.disconnect();
    waveArray[index].osc.connect(hpf);
  });

  //adsr ui
  adsrCheckbox = createCheckbox('ADSR', false);
  adsrCheckbox.changed(toggleADSR);
  adsrCheckbox.position(1275, height + 20);


  labelA = createSpan('Attack: ');
  labelA.style('display', 'block'); // Make it a block-level element
  labelA.position(1350, height + 20);    // Set the width
  
  inputA = createInput();
  inputA.attribute('placeholder', 'broke');
  inputA.position(1400, height + 20);
  inputA.style('width', '40px');
  inputA.input(() => validateInput(a, inputA));

  labelD = createSpan('Decay: ');
  labelD.style('display', 'block'); // Make it a block-level element
  labelD.position(1450, height + 20);    // Set the width
  
  inputD = createInput();
  inputD.attribute('placeholder', 'broke');
  inputD.position(1500, height + 20);
  inputD.style('width', '40px');
  inputD.input(() => validateInput(d, inputD));

  labelS = createSpan('Sustain: ');
  labelS.style('display', 'block'); // Make it a block-level element
  labelS.position(1350, height + 75);    // Set the width
  
  inputS = createInput();
  inputS.attribute('placeholder', 'broke');
  inputS.position(1400, height + 75);
  inputS.style('width', '40px');
  inputS.input(() => validateInput(s, inputS));

  labelR = createSpan('Release:');
  labelR.style('display', 'block'); // Make it a block-level element
  labelR.position(1450, height + 75);    // Set the width
  
  inputR = createInput();
  inputR.attribute('placeholder', 'broke');
  inputR.position(1500, height + 75);
  inputR.style('width', '40px');
  inputR.input(() => validateInput(r, inputR));
  
}

function draw() {
  // console.log("a: "  + a);
  // console.log("d: "  +d);
  // console.log("s: "  + s);
  // console.log("r: "  + r);
  background(220);
  forLoopUtil((index) => waveVisualArray[index].display());

  //drawing the ftt
  spectrum = fft.analyze();
  drawOctaveBand();

  forLoopUtil((index) => {
    if (index != waveSelected){ // for every unselected wave
      uiSet[index][0].hide(); //hide amp slider
      uiSet[index][1].hide(); // hide freq slider
      uiSet[index][2].hide(); // hide wave chooser

      waveVisualArray[index].setSelected(false); // unselect wave visual
    }
  });

  //show all elements for the selected wave
  uiSet[waveSelected][0].show();
  uiSet[waveSelected][1].show();
  uiSet[waveSelected][2].show();
  waveVisualArray[waveSelected].setSelected(true); // select wave visual
  

  //changing the filter vals
  if (lpfCheckbox.checked()) {
    lpf.freq(lpfSlider.value());
    lpf.res(lResSlider.value())
  }

  if (hpfCheckbox.checked()) {
    hpf.freq(hpfSlider.value());
    hpf.res(hResSlider.value())
  }
  
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

}

function toggleWave(){
  for(let i = 0; i < waveAmount; i++) {
    waveArray[i].trigger();
  }
  if (!adsrCheckbox.checked()) {
    globalSustaining = !globalSustaining;
  }
}

//turning on/off lpf
function toggleLpf(){
  if (lpfCheckbox.checked()) {
    lpf.freq(lpfSlider.value());
  } else {
    lpf.freq(20000);
  }
}

//turning on/off hpf
function toggleHpf(){
  if (hpfCheckbox.checked()) {
    hpf.freq(hpfSlider.value());
  } else {
    hpf.freq(0);
  }
}

//having everything play as adsr
function toggleADSR(){
  forLoopUtil((index) => waveArray[index].changeMode());
  if (adsrCheckbox.checked()) {
    globalSustaining = true;
  }
  else {
    globalSustaining = false;
  }
}


//Selects a different wave
function waveSelectEvent() {
  waveSelected = parseInt(waveSelect.value()) - 1;
  console.log(waveSelected);
}

//adds a wave to work with
function addWave() {
  if (waveAmount < 7) {
    
    if (globalSustaining) {
      waveArray[waveAmount].osc.start();
      waveArray[waveAmount].sustaining = true;
    }
    
    waveAmount++;
    waveSelect.enable("" + waveAmount);
    waveSelect.selected("" + waveAmount);
    waveSelected = waveAmount - 1;
    amountLabel.html("Waves: " + waveAmount);
    
  }
  

}
//takes away a wave
function minusWave() {
  if(waveAmount > 1) {
    waveSelect.disable("" + waveAmount);
    waveArray[waveAmount - 1].sustaining = false;
    waveArray[waveAmount - 1].osc.stop();
    
    if (waveSelected == waveAmount - 1) { // if the current wave is being taken away
      waveVisualArray[waveSelected - 1].setSelected(true); // select wave visual 
      waveSelected--; 
      waveSelect.selected("" + (waveAmount - 1) );
    }
    waveAmount--;
    amountLabel.html("Waves: " + waveAmount);
    
    
  }
  
}

function validateInput(adsrParam, inputField) {
  let inputValue = inputField.value();
  // Use parseFloat to attempt to parse the input value as a float
  let floatValue = parseFloat(inputValue);
  
  if (isNaN(floatValue)) {
    // If it's not a valid float, clear the input field
    inputField.value('');
  }
  else{
    adsrParam.value = inputValue;
    console.log("a: "  + a.value);

   // forLoopUtil((index) => waveArray[index].env.setADSR(a.value, d.value, s.value, r.value));
  }
}

function centToFreq (cents) { //converts from cents to freq
    let lowestFreq = 41.2;
    let newFreq = lowestFreq * (Math.pow(2, cents/1200));
    return newFreq;
}

function forLoopUtil(func){
  for(let i = 0; i < maxWaves; i++) {
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

// function keyTyped() {
//   switch (key){
//     case  "a":
//       forLoopUtil((index) => waveVisualArray[index].setWaveType("sine"));
//       forLoopUtil((index) => waveArray[index].changeWaveForm("sine"));
//       break;

//     case  "s":
//       forLoopUtil((index) => waveVisualArray[index].setWaveType("square"));
//       forLoopUtil((index) => waveArray[index].changeWaveForm("square"));
//       break;
//     case  "d":
//       forLoopUtil((index) => waveVisualArray[index].setWaveType("saw"));
//       forLoopUtil((index) => waveArray[index].changeWaveForm("saw"));
//       break;
//     case  "f":
//       forLoopUtil((index) => waveVisualArray[index].setWaveType("tri"));
//       forLoopUtil((index) => waveArray[index].changeWaveForm("tri"));
//       break;
//     default:
//       console.log("Switch case keypress ");
//   }
// }