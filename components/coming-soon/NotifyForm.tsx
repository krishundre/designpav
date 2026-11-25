"use client";

import { useState, type FormEvent } from "react";

/**
 * EmailJS settings. The public key is meant to be used in browser code.
 * Override with NEXT_PUBLIC_EMAILJS_* environment variables on Vercel if they change.
 */
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_5sbcjgi",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_1zob6mc",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "cRleCTMvd4xznaH7P",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "sent" | "error" | "invalid";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            user_email: value,
            signup_time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
            page_url: window.location.href,
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      setEmail("");
    } catch (err) {
      console.error("EmailJS send failed", err);
      setStatus("error");
    }
  };

  return (
    <form className="cs-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="cs-email" className="cs-sr">
        Email address
      </label>
      <input
        id="cs-email"
        type="email"
        placeholder="you@brand.com"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== "sending") setStatus("idle");
        }}
        disabled={status === "sending"}
      />
      <button className="cs-btn cs-lime" type="submit" data-magnetic disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Notify me"}
      </button>
      <div className="cs-msg" aria-live="polite">
        {status === "sent" && "You're on the list — we'll email you when the kitchen opens."}
        {status === "invalid" && "That email looks half-cooked — check it and try again."}
        {status === "error" && (
          <>
            Something went wrong. Please email us at <a href="mailto:chef@designpav.in">chef@designpav.in</a>.
          </>
        )}
        {(status === "idle" || status === "sending") && (
          <>
            Or email <a href="mailto:chef@designpav.in">chef@designpav.in</a>
          </>
        )}
      </div>
    </form>
  );
}
