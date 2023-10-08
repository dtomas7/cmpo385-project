class SelectPair {
    constructor(posX, posY, wave, waveVisual) {   
        this.posX = posX;
        this.posY = posY;
        this.wave = wave;
        this.waveVisual = waveVisual;
        this.label = createSpan("WaveType:");
        this.label.position(this.posX, this.posY);

        this.waveTypeSelect = createSelect();
        this.waveTypeSelect.position(this.posX, this.posY + 30);
        this.waveTypeSelect.selected("sine");
        this.waveTypeSelect.option("sine");
        this.waveTypeSelect.option("tri");
        this.waveTypeSelect.option("saw");
        this.waveTypeSelect.option("square");
        this.waveTypeSelect.changed(() => this.waveTypeSelectEvent());
    }

    hide(){
        this.label.hide();
        this.waveTypeSelect.hide()
    }

    show(){
        this.label.show();
        this.waveTypeSelect.show();
    }

    waveTypeSelectEvent() {
        console.log(this.wave.waveType + " selsect");
        //console.log(instanceof this.wave);
        this.wave.changeWaveForm(this.waveTypeSelect.value()); 
        this.waveVisual.setWaveType(this.waveTypeSelect.value()); 
      }

    // udpateWave() {
    //     this.slider.label
    // }
}
  