"use client";

import React, { useMemo, useState } from "react";

type ApiOk = { success: true; message?: string } & Record<string, any>;
type ApiErr = { success: false; message?: string } & Record<string, any>;
type ApiResp = ApiOk | ApiErr;

function isValidEmail(email: string) {
  // egyszerű, de korrekt validáció kliensen
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResp | null>(null);

  const emailTrimmed = useMemo(() => email.trim(), [email]);
  const emailOk = useMemo(() => isValidEmail(emailTrimmed), [emailTrimmed]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!emailOk) {
      setResult({
        success: false,
        message: "Kérlek adj meg egy érvényes email címet.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/feliratkozas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrimmed }),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResp;

      if (!res.ok) {
        setResult({
          success: false,
          message:
            (data as any)?.message ?? "Hiba történt a feliratkozás közben.",
          ...data,
        });
        return;
      }

      setResult({
        success: true,
        message: (data as any)?.message ?? "Sikeres feliratkozás!",
        ...data,
      });

      setEmail("");
    } catch {
      setResult({ success: false, message: "Hálózati hiba. Próbáld újra." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <form onSubmit={onSubmit}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pl. david@email.hu"
          autoComplete="email"
          inputMode="email"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading || !emailTrimmed}
          style={{
            marginTop: 12,
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #000",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Feliratkozás..." : "Feliratkozás"}
        </button>
      </form>

      {result && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 12,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        >
          <strong>{result.success ? "OK" : "Hiba"}</strong>
          <div style={{ marginTop: 6 }}>
            {result.message ?? (result.success ? "Siker" : "Hiba")}
          </div>
        </div>
      )}
    </div>
  );
}
