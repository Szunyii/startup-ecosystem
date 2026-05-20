"use client";

import { useState, useTransition } from "react";
import { sendWelcomeMail } from "./actions";

export default function MailerTestForm() {
  const [to, setTo] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "ok"; messageId?: string; emailError?: string }
    | { kind: "error"; error: string }
  >({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "idle" });
    startTransition(async () => {
      const res = await sendWelcomeMail({
        to,
        recipientName: recipientName.trim() || undefined,
      });
      if (res.ok)
        setStatus({
          kind: "ok",
          messageId: res.messageId,
          emailError: res.emailError,
        });
      else setStatus({ kind: "error", error: res.error });
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="to">
          Recipient
        </label>
        <input
          id="to"
          type="email"
          required
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="someone@example.com"
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="recipientName">
          Recipient name (optional)
        </label>
        <input
          id="recipientName"
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="Anna"
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send welcome email"}
      </button>

      {status.kind === "ok" && (
        <div className="text-sm space-y-1">
          <p className="text-green-600">
            Saved to newsletter table.
            {status.messageId && (
              <>
                {" "}
                Email sent — messageId: <code>{status.messageId}</code>
              </>
            )}
          </p>
          {status.emailError && (
            <p className="text-amber-600">
              Subscription saved, but welcome email failed: {status.emailError}
            </p>
          )}
        </div>
      )}
      {status.kind === "error" && (
        <p className="text-sm text-red-600">Error: {status.error}</p>
      )}
    </form>
  );
}
