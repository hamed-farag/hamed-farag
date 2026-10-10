"use client";

import { Volume2 } from "pixelarticons/react/Volume2.js";
import { VolumeX } from "pixelarticons/react/VolumeX.js";

import { PixelIcon } from "@components/pixel";
import { playSfx, setSoundEnabled, useSoundEnabled } from "@lib/sound";

/** Sound is off by default; turning it on plays a confirmation blip. */
export function SoundToggle() {
  const on = useSoundEnabled();

  return (
    <button
      type="button"
      aria-pressed={on}
      title={on ? "Sound on" : "Sound off"}
      onClick={() => {
        setSoundEnabled(!on);
        if (!on) playSfx("blip");
      }}
      className="px-frame px-btn px-btn--hud"
    >
      <PixelIcon icon={on ? Volume2 : VolumeX} />
      {/* static label: on/off is the icon, the pressed bevel and aria-pressed */}
      <span className="sr-only lg:not-sr-only">Sound</span>
    </button>
  );
}
