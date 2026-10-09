import { useSyncExternalStore } from "react";

// Sound is off by default and the choice is remembered per browser.
// Effects are synthesised square waves, so there are no audio files to load.

const STORAGE_KEY = "hw-sound";
const listeners = new Set<() => void>();
let enabled: boolean | null = null;

function getSnapshot() {
  if (enabled === null) {
    try {
      enabled = window.localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      enabled = false;
    }
  }
  return enabled;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    // storage blocked: the choice lasts for this page view
  }
  listeners.forEach((listener) => listener());
}

type TSfx = "blip" | "coin" | "clear";

// [frequency in Hz, length in ms]
const SFX: Record<TSfx, Array<[number, number]>> = {
  blip: [[660, 50]],
  coin: [[1046.5, 60], [1568, 140]],
  clear: [[523.25, 110], [659.25, 110], [783.99, 110], [1046.5, 260]],
};

let audio: AudioContext | null = null;

export function playSfx(name: TSfx) {
  if (!getSnapshot()) return;
  try {
    audio ??= new AudioContext();
    let at = audio.currentTime;
    for (const [frequency, ms] of SFX[name]) {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "square";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, at);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + ms / 1000);
      osc.connect(gain).connect(audio.destination);
      osc.start(at);
      osc.stop(at + ms / 1000);
      at += ms / 1000;
    }
  } catch {
    // no Web Audio: stay silent
  }
}
