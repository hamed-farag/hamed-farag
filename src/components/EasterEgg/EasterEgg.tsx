"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Close } from "pixelarticons/react/Close.js";
import { Heart } from "pixelarticons/react/Heart.js";

import { PixelIcon } from "@components/pixel";

const loveMessages = [
  "Mai, you light up my world like nobody else 💖",
  "Every moment with you is pure magic, Mai ✨",
  "You're the best thing that's ever happened to me 🌹",
  "Your smile makes my heart skip a beat 💝",
  "You're my favorite person in the whole world 🌍",
  "Life is beautiful because you're in it, Mai 🌸",
  "You make every day special just by being you 💫",
  "My heart belongs to you, forever and always 💕",
  "You're my sunshine on cloudy days ☀️",
  "I fall in love with you more each day 💘",
  "You're my dream come true, Mai 🌈",
  "Your love makes my life complete 💞",
  "You're the missing piece to my puzzle 🧩",
  "Every love song reminds me of you 🎵",
  "You're my favorite hello and hardest goodbye 👋",
];

function getRandomMessageIndex(): number {
  return Math.floor(Math.random() * loveMessages.length);
}

export function EasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [typedKeys, setTypedKeys] = useState("");
  const secretWord = "maizein";

  function showMessage() {
    // heart-themed message box (the toast frame switches to the "love" variant)
    toast.custom(
      (t) => (
        <div className="relative w-full pr-12 text-px-ink">
          <h3 className="px-title m-0 mb-2 flex items-center gap-2 text-lg font-bold">
            <PixelIcon icon={Heart} className="text-px-love" />
            A Secret Message to Mai 💌
          </h3>
          <p className="m-0 text-wrap">{loveMessages[getRandomMessageIndex()]}</p>
          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            aria-label="Close"
            className="px-frame px-btn px-btn--secondary absolute -right-1 -top-1 min-h-0 p-1.5"
          >
            <PixelIcon icon={Close} />
          </button>
        </div>
      ),
      { className: "px-frame--love" }
    );
  }

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Left click only
      if (e.button === 0) {
        const now = Date.now();

        setClickCount((prev) => {
          // Reset if more than 2 seconds between clicks
          if (now - lastClickTime > 2000) {
            return 1;
          }

          const newCount = prev + 1;
          if (newCount === 15) {
            showMessage();
            return 0; // Reset counter after success
          }
          return newCount;
        });
        setLastClickTime(now);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      setTypedKeys((prev) => {
        const now = Date.now();

        const newTyped = (prev + e.key).toLowerCase();
        // Keep only the last N characters where N is the length of secretWord
        const trimmed = newTyped.slice(-secretWord.length);

        // Reset if more than 500ms between keystrokes
        if (now - lastClickTime > 500) {
          return e.key.toLowerCase();
        }

        if (trimmed && trimmed.toLowerCase() === secretWord) {
          showMessage();
          return ""; // Reset after success
        }
        return trimmed;
      });

      setLastClickTime(Date.now());
    };

    // Add global event listeners
    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [lastClickTime]);

  // Component doesn't need to render anything visible
  return null;
}
