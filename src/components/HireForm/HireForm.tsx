"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check } from "pixelarticons/react/Check.js";
import { Mail } from "pixelarticons/react/Mail.js";
import { WarningDiamond } from "pixelarticons/react/WarningDiamond.js";

import { Block, PixelButton, PixelIcon } from "@components/pixel";
import { useHireLevel } from "@components/HireLevel";
import { playSfx } from "@lib/sound";
import { cn } from "@lib/utils/tailwindUtils";

import { hireServices } from "@configs/hireServices";

// cell in public/game/ui/powerups.png (order fixed by game-assets.md U5)
const POWERUP_CELL: Record<string, number> = {
  "ai-agentic-integration": 0,
  "frontend-architecture": 1,
  "react-next-development": 2,
  performance: 3,
  consulting: 4,
  mentoring: 5,
};

function PowerUp({ id }: { id: string }) {
  return (
    <span
      aria-hidden="true"
      className="px-sprite"
      style={
        {
          "--sprite-src": "url(/game/ui/powerups.png)",
          "--sprite-w": "32px",
          "--sprite-h": "32px",
          "--sprite-sheet-w": "192px",
          "--sprite-sheet-h": "32px",
          "--sprite-x": `${-(POWERUP_CELL[id] ?? 0) * 32}px`,
          "--sprite-y": "0px",
        } as React.CSSProperties
      }
    />
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="m-0 mt-2 flex items-center gap-2 text-sm text-[#ffc8bc]">
      <PixelIcon icon={WarningDiamond} className="text-px-coin" />
      {message}
    </p>
  );
}

type THireFormProps = {
  email: string;
  /** server-rendered hero victory sprite for the COURSE CLEAR! banner */
  victory: React.ReactNode;
};

export function HireForm({ email, victory }: THireFormProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [collected, setCollected] = useState<{ id: string; n: number } | null>(null);
  // the item info box shows whichever item was last hovered, focused or toggled
  const [infoId, setInfoId] = useState(hireServices[0].id);
  const { setCleared } = useHireLevel();
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState<string | null>(null);
  const handoff = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(handoff.current), []);

  const toggleService = (id: string) => {
    const adding = !selected.includes(id);
    setInfoId(id);
    setSelected((prev) => (adding ? [...prev, id] : prev.filter((s) => s !== id)));
    if (adding) {
      setCollected((prev) => ({ id, n: (prev?.n ?? 0) + 1 }));
      playSfx("coin");
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!senderEmail.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Tell me a bit about your project.";
    setErrors(next);
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invalid = validate();
    const firstInvalid = (["name", "email", "message"] as const).find((f) => invalid[f]);
    if (firstInvalid) {
      document.getElementById(`hire-${firstInvalid}`)?.focus();
      return;
    }

    const selectedLabels = hireServices
      .filter((s) => selected.includes(s.id))
      .map((s) => s.label)
      .join(", ");

    const subject = `Project inquiry from ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${senderEmail}`,
      selectedLabels ? `Interested in: ${selectedLabels}` : null,
      "",
      message,
    ].filter((line) => line !== null);

    const href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // COURSE CLEAR! first, then the same mailto: hand-off as before
    setMailto(href);
    setCleared(true);
    playSfx("clear");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    handoff.current = window.setTimeout(() => {
      window.location.href = href;
    }, reduced ? 600 : 1400);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
        {/* Services: power-up items in item boxes */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="px-label mb-4 p-0 text-px-coin">
            What can I help with? <span className="text-px-stone">(select any)</span>
          </legend>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {hireServices.map((service) => {
              const isActive = selected.includes(service.id);
              return (
                <li key={service.id} className="p-0">
                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    onMouseEnter={() => setInfoId(service.id)}
                    onFocus={() => setInfoId(service.id)}
                    aria-pressed={isActive}
                    aria-describedby={`hire-item-${service.id}`}
                    className="px-frame px-switch relative flex h-full w-full cursor-pointer items-center gap-3 py-2 pl-2 pr-3 text-left"
                  >
                    <span className="relative flex-none">
                      <Block size={48} used={isActive}>
                        <PowerUp id={service.id} />
                      </Block>
                      {collected?.id === service.id && isActive && (
                        <span key={collected.n} className="px-collect absolute left-2 top-2">
                          <PowerUp id={service.id} />
                        </span>
                      )}
                    </span>
                    <span className="px-title flex-1 text-base font-bold leading-tight">
                      {service.label}
                    </span>
                    {/* selected = sunken shape + check mark, never colour alone */}
                    {isActive && (
                      <span className="px-frame px-frame--coin grid h-8 w-8 flex-none place-items-center">
                        <PixelIcon icon={Check} />
                      </span>
                    )}
                  </button>
                  <span id={`hire-item-${service.id}`} className="sr-only">
                    {service.description}
                  </span>
                </li>
              );
            })}
          </ul>
          {/* item info: visual only, screen readers get each description on its button */}
          <ItemInfo service={hireServices.find((s) => s.id === infoId) ?? hireServices[0]} selected={selected.includes(infoId)} />
        </fieldset>

        {/* Contact fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="hire-name" className="px-label text-px-paper">
              Name
            </label>
            <input
              id="hire-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "hire-name-error" : undefined}
              className="px-frame px-input"
            />
            <FieldError id="hire-name-error" message={errors.name} />
          </div>
          <div>
            <label htmlFor="hire-email" className="px-label text-px-paper">
              Email
            </label>
            <input
              id="hire-email"
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "hire-email-error" : undefined}
              className="px-frame px-input"
            />
            <FieldError id="hire-email-error" message={errors.email} />
          </div>
        </div>

        <div>
          <label htmlFor="hire-message" className="px-label text-px-paper">
            Project details
          </label>
          <textarea
            id="hire-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Tell me about your project, timeline, and goals…"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "hire-message-error" : undefined}
            className="px-frame px-input resize-y"
          />
          <FieldError id="hire-message-error" message={errors.message} />
        </div>

        <div className="flex flex-col gap-4">
          <PixelButton type="submit" variant="primary" className="w-full">
            <PixelIcon icon={Mail} />
            Send via email
          </PixelButton>
          <p className="m-0 text-center text-xs text-px-stone">
            Opens your email app with everything pre-filled — no data is stored.
          </p>
        </div>
      </form>

      {mailto && (
        <CourseClear
          mailto={mailto}
          victory={victory}
          onClose={() => {
            window.clearTimeout(handoff.current);
            setMailto(null);
            setCleared(false);
          }}
        />
      )}
    </>
  );
}

function ItemInfo({
  service,
  selected,
}: {
  service: (typeof hireServices)[number];
  selected: boolean;
}) {
  return (
    <div aria-hidden="true" className="px-frame px-frame--paper-2 mt-4 flex items-start gap-3 p-4">
      <PowerUp id={service.id} />
      <div className="min-w-0 flex-1">
        <p className="px-hud-text m-0 mb-1.5 text-[10px] text-lv-muted">
          Item info {selected ? "· in your bag" : ""}
        </p>
        <p className="px-title m-0 font-bold leading-tight">{service.label}</p>
        <p className="m-0 mt-1 text-sm leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
}

function CourseClear({
  mailto,
  victory,
  onClose,
}: {
  mailto: string;
  victory: React.ReactNode;
  onClose: () => void;
}) {
  // portalled to <body>: the message box's drop-shadow filter would otherwise become
  // the containing block of this position:fixed overlay
  return createPortal(
    <div
      className="px-clear-overlay"
      data-escape-owner
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-clear-title"
        aria-describedby="course-clear-text"
        className={cn("px-clear-box px-frame px-frame--msg w-full max-w-md p-6 text-center md:p-8")}
      >
        <div className="mb-5 flex justify-center">{victory}</div>
        <p id="course-clear-title" className="px-hud-text m-0 text-[20px] text-px-coin">
          Course clear!
        </p>
        <p id="course-clear-text" className="mb-2 mt-5 text-sm">
          Opening your email app with everything filled in…
        </p>
        <p className="m-0 mb-6 text-sm text-px-stone">
          Didn&apos;t open?{" "}
          <a href={mailto} className="text-px-coin-light underline">
            Use this email link
          </a>
          .
        </p>
        <PixelButton type="button" variant="secondary" autoFocus onClick={onClose}>
          Continue
        </PixelButton>
      </div>
    </div>,
    document.body
  );
}
