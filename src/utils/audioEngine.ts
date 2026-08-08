/**
 * Web Audio API synth engine for ambient nature sounds and interactive eco-chimes.
 * No external MP3 files required!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play pleasant eco success chime on action
  playChime(type: 'waste' | 'water' | 'energy' | 'nature' | 'community' | 'heal' = 'heal') {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      let freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      if (type === 'water') freqs = [440, 554.37, 659.25, 880];
      if (type === 'energy') freqs = [587.33, 739.99, 880, 1174.66];
      if (type === 'nature') freqs = [392.00, 493.88, 587.33, 783.99];

      freqs.forEach((f, i) => {
        const o = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.08);

        g.gain.setValueAtTime(0.12, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

        o.connect(g);
        g.connect(this.ctx!.destination);

        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.6);
      });
    } catch {
      // Audio fallback
    }
  }

  // Toggle ambient peaceful nature synthesizer pad
  toggleAmbient(enable: boolean) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      if (!enable) {
        if (this.ambientGain) {
          this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
          setTimeout(() => {
            this.ambientOsc1?.stop();
            this.ambientOsc2?.stop();
            this.isAmbientPlaying = false;
          }, 1000);
        }
        return;
      }

      if (this.isAmbientPlaying) return;

      const now = this.ctx.currentTime;
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(220, now); // A3

      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(329.63, now); // E4

      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.05, now + 2);

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start(now);
      this.ambientOsc2.start(now);
      this.isAmbientPlaying = true;
    } catch {
      // Fallback
    }
  }
}

export const soundEngine = new SoundEngine();
