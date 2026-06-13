"use client";

import { useState } from "react";
import {
  Code2,
  Layers,
  Gauge,
  GraduationCap,
  Boxes,
  Check,
  Send,
} from "lucide-react";

import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { cn } from "@lib/utils/tailwindUtils";

import { hireServices } from "@configs/hireServices";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "frontend-architecture": <Layers className="h-5 w-5" />,
  "react-next-development": <Code2 className="h-5 w-5" />,
  performance: <Gauge className="h-5 w-5" />,
  consulting: <Boxes className="h-5 w-5" />,
  mentoring: <GraduationCap className="h-5 w-5" />,
};

type THireFormProps = {
  email: string;
};

export function HireForm({ email }: THireFormProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
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
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Services — selectable cards */}
      <div>
        <label className="font-display font-semibold text-sm text-muted-foreground">
          What can I help with?{" "}
          <span className="opacity-60">(select any)</span>
        </label>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hireServices.map((service) => {
            const isActive = selected.includes(service.id);
            return (
              <button
                type="button"
                key={service.id}
                onClick={() => toggleService(service.id)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 hover:shadow-md",
                  isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/50 hover:border-border"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {SERVICE_ICONS[service.id]}
                </span>
                <span className="flex-1">
                  <span className="block font-display font-semibold text-sm">
                    {service.label}
                  </span>
                  <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">
                    {service.description}
                  </span>
                </span>
                {isActive && (
                  <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="hire-name"
            className="font-display font-semibold text-sm text-muted-foreground"
          >
            Name
          </label>
          <Input
            id="hire-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="mt-1.5 h-10 rounded-xl"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="hire-email"
            className="font-display font-semibold text-sm text-muted-foreground"
          >
            Email
          </label>
          <Input
            id="hire-email"
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1.5 h-10 rounded-xl"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="hire-message"
          className="font-display font-semibold text-sm text-muted-foreground"
        >
          Project details
        </label>
        <textarea
          id="hire-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell me about your project, timeline, and goals…"
          className="mt-1.5 flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl font-display font-semibold transition-transform duration-300 hover:scale-[1.01]"
      >
        <Send className="h-4 w-4 mr-2" />
        Send via email
      </Button>
      <p className="text-center text-xs text-muted-foreground -mt-4">
        Opens your email app with everything pre-filled — no data is stored.
      </p>
    </form>
  );
}
