import React, { useState } from "react";
import { ArrowRight, Mail, Send } from "lucide-react";

const CONTACT_EMAIL = "connect@evonera.net";

interface BriefState {
  name: string;
  email: string;
  platform: string;
  projectUrl: string;
  blocker: string;
}

const PLATFORMS = [
  "Modern Website / Web App",
  "Lovable",
  "Emergent",
  "Bolt / v0",
  "Full-Stack Web App",
  "Other",
];

function buildMailto(data: BriefState) {
  const subject = `Project inquiry — ${data.platform}`;
  const body = [
    `Name: ${data.name || "Not provided"}`,
    `Reply to: ${data.email}`,
    `Project Type: ${data.platform}`,
    `Link / Reference: ${data.projectUrl || "Not provided"}`,
    "",
    "Project details & goals:",
    data.blocker || "Not provided",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

interface ProjectBriefFormProps {
  showHeader?: boolean;
}

export function ProjectBriefForm({ showHeader = false }: ProjectBriefFormProps) {
  const [formData, setFormData] = useState<BriefState>({
    name: "",
    email: "",
    platform: "Modern Website / Web App",
    projectUrl: "",
    blocker: "",
  });
  const [mailDraft, setMailDraft] = useState("");

  const updateField = (key: keyof BriefState, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = buildMailto(formData);
    setMailDraft(draft);
    window.location.href = draft;
  };

  if (mailDraft) {
    return (
      <section className="w-full max-w-2xl mx-auto rounded-xl border border-emerald-500/40 bg-ink-900 p-6 sm:p-8 text-center">
        <div className="size-12 rounded-full bg-ink-800 text-emerald-300 mx-auto flex items-center justify-center mb-4">
          <Mail className="size-6" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-medium text-neutral-100">Your email draft is ready</h2>
        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
          Send the draft from your email app to complete your request. If no email app opened, use the button below.
        </p>
        <a
          href={mailDraft}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
        >
          <Mail className="size-4" aria-hidden="true" />
          Open email draft
        </a>
        <p className="mt-4 text-xs text-neutral-400">
          Or email <a className="text-blue-300 underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto rounded-xl border border-white/15 bg-ink-900 p-6 sm:p-8 space-y-5"
    >
      {showHeader && (
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-300">Project inquiry</span>
          <h2 className="text-2xl font-medium text-neutral-100 mt-1">Tell us about your project.</h2>
          <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
            Whether you need a fast, reliable website or help finishing an app prototype, share your details below and we will reply within 24 hours.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-sm text-neutral-300">
          Your name
          <input
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink-950 px-3.5 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            placeholder="Name"
          />
        </label>
        <label className="block text-sm text-neutral-300">
          Email address <span className="text-blue-300">*</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink-950 px-3.5 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-sm text-neutral-300">
          Project type
          <select
            value={formData.platform}
            onChange={(event) => updateField("platform", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink-950 px-3.5 py-3 text-neutral-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
          >
            {PLATFORMS.map((platform) => <option key={platform}>{platform}</option>)}
          </select>
        </label>
        <label className="block text-sm text-neutral-300">
          Project link or reference <span className="text-neutral-500">(optional)</span>
          <input
            type="url"
            value={formData.projectUrl}
            onChange={(event) => updateField("projectUrl", event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink-950 px-3.5 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
            placeholder="https://"
          />
        </label>
      </div>

      <label className="block text-sm text-neutral-300">
        What are you building or trying to solve?
        <textarea
          rows={4}
          value={formData.blocker}
          onChange={(event) => updateField("blocker", event.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-white/15 bg-ink-950 px-3.5 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
          placeholder="For example: Building a new web app, or connecting authentication, database, and payments to an existing prototype."
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 shadow-md"
      >
        <Send className="size-4" aria-hidden="true" />
        Prepare project email
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      <p className="text-center text-xs text-neutral-400">
        This opens an email draft addressed to connect@evonera.net. You can review and edit before sending.
      </p>

      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
        <span>Prefer an instant message?</span>
        <a
          href="https://wa.me/919361664440?text=Hi%20Shakthi%2C%20I%20have%20a%20project%20inquiry%20for%20Evonera"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          <span>Chat on WhatsApp (+91 93616 64440) →</span>
        </a>
      </div>
    </form>
  );
}
