/**
 * High-fidelity Deep Sea Hydrophone & Acoustic Soundscape Engine
 * Implemented using pure Web Audio API (zero external network dependencies)
 */

class HydrophoneAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter simulating deep water sound absorption
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);
      this.filterNode.connect(this.masterGain);

      // Drone Gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.droneGain.connect(this.filterNode);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.droneGain || !this.filterNode) return;

    if (this.isPlaying) return;
    this.isPlaying = true;

    // 1. Create sub-bass oceanic drone oscillator
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(48, this.ctx.currentTime); // 48Hz deep ocean rumble

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(54, this.ctx.currentTime); // 54Hz beat frequency

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.droneGain);

    osc1.start();
    osc2.start();

    // 2. Pink noise oceanic surf & current
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(this.droneGain);
    noiseSource.start();
    this.noiseNode = noiseSource;
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;
    this.isPlaying = false;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public updateDepth(depthMeters: number) {
    if (!this.ctx || !this.filterNode) return;
    // As depth increases from 0 to 11000m, cutoff frequency narrows from 600Hz down to 90Hz
    const normalized = Math.min(depthMeters / 11000, 1);
    const targetFreq = 500 - normalized * 410;
    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
  }

  /**
   * Triggers an authentic acoustic sonar ping with water reverberation
   */
  public pingSonar() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Sonar frequency sweep 940Hz -> 820Hz
    osc.frequency.setValueAtTime(940, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 0.15);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.8);
  }

  /**
   * Triggers an underwater bubble sound
   */
  public playBubble() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 220 + Math.random() * 180;
    const endFreq = startFreq + 350 + Math.random() * 150;
    
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const soundEngine = new HydrophoneAudioEngine();
