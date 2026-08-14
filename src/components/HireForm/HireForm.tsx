"use client";

import { useState } from "react";

import { hireServices } from "@configs/hireServices";

type THireFormProps = { email: string };

export function HireForm({ email }: THireFormProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!senderEmail.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) next.email = "Please enter a valid email.";
    if (!message.trim()) next.message = "Tell me a little about the project.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const selectedLabels = hireServices.filter((service) => selected.includes(service.id)).map((service) => service.label).join(", ");
    const body = [`Name: ${name}`, `Email: ${senderEmail}`, selectedLabels ? `Interested in: ${selectedLabels}` : null, "", message].filter((line) => line !== null).join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="editorial-hire-form" noValidate>
      <fieldset>
        <legend>WHAT CAN I HELP WITH? <span>(SELECT ANY)</span></legend>
        <div className="hire-options">
          {hireServices.map((service, index) => {
            const active = selected.includes(service.id);
            return (
              <button type="button" key={service.id} onClick={() => toggleService(service.id)} aria-pressed={active} className={active ? "active" : ""}>
                <small>0{index + 1}</small><span><strong>{service.label}</strong><i>{service.description}</i></span><b>{active ? "●" : "+"}</b>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="hire-field-pair">
        <label>YOUR NAME<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Jane Doe" aria-invalid={Boolean(errors.name)} />{errors.name && <span>{errors.name}</span>}</label>
        <label>EMAIL<input type="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} />{errors.email && <span>{errors.email}</span>}</label>
      </div>

      <label>PROJECT DETAILS<textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} placeholder="The idea, the timeline, the big unknown…" aria-invalid={Boolean(errors.message)} />{errors.message && <span>{errors.message}</span>}</label>

      <button type="submit" className="editorial-submit">OPEN DRAFT EMAIL <span>↗</span></button>
      <p>No forms into the void. This opens your email app with everything pre-filled.</p>
    </form>
  );
}
