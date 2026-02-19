"use client";

import { useState } from "react";

type ApiErrorResponse =
  | { success: true }
  | { success: false; message?: string; errors?: Record<string, string> };

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [statusHtml, setStatusHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusHtml("");

    const trimmed = email.trim();
    if (!trimmed) {
      setStatusHtml('<p style="color:red;">Email megadása kötelező!</p>');
      return;
    }

    setLoading(true);
    try {
      // 1) Hash + ts a saját Next API route-odtól
      const hashRes = await fetch("/api/generate-hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const hashData: {
        success: boolean;
        message?: string;
        hash?: string;
        ts?: number;
      } = await hashRes.json();

      if (!hashData.success || !hashData.hash || !hashData.ts) {
        setStatusHtml(
          `<p style="color:red;">${hashData.message ?? "Hash generálás sikertelen."}</p>`,
        );
        return;
      }

      // 2) Külső API hívás
      const apiRes = await fetch(
        "https://dev.niu.hu/api/external/feliratkozas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmed,
            hash: hashData.hash,
            ts: hashData.ts,
          }),
        },
      );

      const data: ApiErrorResponse = await apiRes.json();

      if ("success" in data && data.success) {
        setStatusHtml('<p style="color:green;">Sikeres feliratkozás!</p>');
      } else {
        let html = "";
        if ("errors" in data && data.errors) {
          for (const key of Object.keys(data.errors)) {
            html += `<p style="color:red;">${data.errors[key]}</p>`;
          }
        } else if ("message" in data && data.message) {
          html += `<p style="color:red;">${data.message}</p>`;
        } else {
          html += `<p style="color:red;">Ismeretlen hiba.</p>`;
        }
        setStatusHtml(html);
      }
      //   eslint-disable-next-line
    } catch (err: any) {
      setStatusHtml(
        `<p style="color:red;">Hiba történt: ${err?.message ?? String(err)}</p>`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: "Arial", margin: 50 }}>
      <h1>Feliratkozás teszt (Next.js)</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          type="email"
          required
          placeholder="teszt@pelda.hu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8, fontSize: 16, margin: "5px 0", width: 320 }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: 8, fontSize: 16, margin: "5px 0" }}
        >
          {loading ? "Folyamatban..." : "Feliratkozás"}
        </button>
      </form>

      <div
        style={{
          marginTop: 20,
          padding: 10,
          border: "1px solid #ccc",
          background: "#f9f9f9",
        }}
        dangerouslySetInnerHTML={{ __html: statusHtml }}
      />
    </main>
  );
}
