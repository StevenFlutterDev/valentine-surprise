/**
 * A tiny, dependency-free music box.
 *
 * If you drop an audio file at `public/music/song.mp3` the site plays that.
 * If the file isn't there, this generates a soft, slow arpeggio with the
 * Web Audio API so the music button always does something lovely.
 */

const PROGRESSION: number[][] = [
  [174.61, 261.63, 349.23, 440.0], // F  major
  [130.81, 196.0, 261.63, 329.63], // C  major
  [98.0, 196.0, 246.94, 392.0], // G  major
  [110.0, 220.0, 261.63, 329.63], // A  minor
];

const PATTERN = [0, 2, 3, 2, 1, 2, 3, 2];

export class MusicBox {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private nextNoteTime = 0;

  private readonly noteLength = 0.42; // seconds between notes
  private readonly lookahead = 0.22;

  get running() {
    return this.timer !== null;
  }

  async start(volume = 0.16) {
    if (this.timer !== null) return;

    if (!this.ctx) {
      type WithWebkit = typeof window & { webkitAudioContext?: typeof AudioContext };
      const Ctor =
        window.AudioContext ?? (window as WithWebkit).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();

      this.master = this.ctx.createGain();
      this.master.gain.value = 0;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;
      filter.Q.value = 0.4;

      this.master.connect(filter);
      filter.connect(this.ctx.destination);
    }

    await this.ctx.resume();

    const now = this.ctx.currentTime;
    this.master!.gain.cancelScheduledValues(now);
    this.master!.gain.setValueAtTime(this.master!.gain.value, now);
    this.master!.gain.linearRampToValueAtTime(volume, now + 1.4);

    this.nextNoteTime = now + 0.1;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stop() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.master) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 0.9);
    }
  }

  dispose() {
    this.stop();
    this.ctx?.close();
    this.ctx = null;
    this.master = null;
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    while (this.nextNoteTime < ctx.currentTime + this.lookahead) {
      this.playStep(this.step, this.nextNoteTime);
      this.nextNoteTime += this.noteLength;
      this.step = (this.step + 1) % (PATTERN.length * PROGRESSION.length);
    }
  }

  private playStep(step: number, time: number) {
    const chord = PROGRESSION[Math.floor(step / PATTERN.length)];
    const idx = PATTERN[step % PATTERN.length];
    const freq = chord[idx];

    // music-box bell
    this.voice(freq, time, 2.4, 0.5, "triangle");
    this.voice(freq * 2, time, 1.6, 0.14, "sine");

    // a soft pad on the downbeat of every bar
    if (step % PATTERN.length === 0) {
      this.voice(chord[0] / 2, time, 3.4, 0.22, "sine");
      this.voice(chord[1], time, 3.4, 0.1, "sine");
    }
  }

  private voice(
    freq: number,
    time: number,
    dur: number,
    peak: number,
    type: OscillatorType,
  ) {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(gain);
    gain.connect(this.master);

    osc.start(time);
    osc.stop(time + dur + 0.05);
  }
}
