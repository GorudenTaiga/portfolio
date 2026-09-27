"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Discord, GitHub, WhatsApp } from "../components/icons";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "sent" | "failed";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(v: { name: string; email: string; message: string }): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim()) e.name = "Name is required";
  if (!v.email.trim()) {
    e.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    e.email = "Invalid email format";
  }
  if (!v.message.trim()) e.message = "Message is required";
  return e;
}

const CHANNELS = [
  {
    label: "WhatsApp",
    handle: "+62 877-4316-0171",
    href: "https://wa.me/6287743160171",
    Icon: WhatsApp,
  },
  {
    label: "Discord",
    handle: "goruden_taiga",
    href: "https://discordapp.com/users/goruden_taiga",
    Icon: Discord,
  },
  {
    label: "GitHub",
    handle: "@GorudenTaiga",
    href: "https://github.com/GorudenTaiga",
    Icon: GitHub,
  },
];

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [k]: e.target.value };
      setValues(next);
      if (touched[k]) setErrors(validate(next));
    };

  const blur = (k: string) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }

    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

    const isPlaceholder = (v: string) => !v || v.startsWith("your_");
    if (isPlaceholder(serviceId) || isPlaceholder(templateId) || isPlaceholder(publicKey)) {
      console.error("EmailJS config missing or still using placeholder values.");
      setStatus("failed");
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, { ...values }, publicKey);
      setStatus("sent");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("failed");
    }
  };

  // Auto-reset "sent" status after 6 s
  useEffect(() => {
    if (status === "sent") {
      const t = setTimeout(() => setStatus("idle"), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const field = (
    k: keyof typeof values,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    area = false
  ) => {
    const err = touched[k] ? errors[k] : undefined;
    const common = {
      id: `f-${k}`,
      name: k,
      value: values[k],
      onChange: update(k),
      onBlur: blur(k),
      "aria-invalid": !!err || undefined,
      "aria-describedby": err ? `e-${k}` : undefined,
    };
    return (
      <div className="field">
        <label htmlFor={`f-${k}`}>{label}</label>
        {area ? (
          <textarea {...common} rows={5} />
        ) : (
          <input {...common} {...props} />
        )}
        {err && (
          <p id={`e-${k}`} className="field-error" role="alert">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      {field("name", "Name", { autoComplete: "name" })}
      {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
      {field("message", "Message", {}, true)}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <span className="spinner" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status === "sent" && "Sent! I'll reply within a day or two."}
        {status === "failed" && (
          <span className="field-error">
            Couldn&apos;t send. Please try again or message me on WhatsApp.
          </span>
        )}
      </p>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact-grid">
        {/* Left — headline + channel links */}
        <div data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="h2 big">
            Get in touch
          </h2>
          <p className="lede">
            Available for software engineering roles, technical architecture, or open-source collaboration.
          </p>
          <ul className="channels">
            {CHANNELS.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="channel">
                  <Icon />
                  <span className="channel-label">{label}</span>
                  <span className="mono muted channel-handle">{handle}</span>
                  <ArrowUpRight className="channel-arrow" width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — contact form */}
        <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
