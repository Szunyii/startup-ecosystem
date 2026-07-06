"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { createNewsletterSub } from "@/app/newsletter/actions";

const STORAGE_KEY = "niu-subscribe-popup-seen";
const DELAY_MS = 6000;
export const OPEN_EVENT = "niu:open-subscribe";

export default function SubscribePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onManualOpen = () => {
      setSubmitted(false);
      setError(null);
      setAcceptTerms(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onManualOpen);

    if (localStorage.getItem(STORAGE_KEY)) {
      return () => window.removeEventListener(OPEN_EVENT, onManualOpen);
    }

    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => {
      clearTimeout(t);
      window.removeEventListener(OPEN_EVENT, onManualOpen);
    };
  }, []);

  function markSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage may be unavailable (private mode, quota); ignore
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) markSeen();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    if (!acceptTerms) return;
    setError(null);

    startTransition(async () => {
      const res = await createNewsletterSub({ email: value });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSubmitted(true);
      markSeen();
      setTimeout(() => setOpen(false), 1800);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] z-50 bg-[#120937] border-white/10 text-white p-0 overflow-hidden">
        <div
          className="px-7 pt-8 pb-7"
          style={{
            background:
              "radial-gradient(600px 280px at 100% 0%, rgba(93,61,255,.35), transparent 60%)," +
              "radial-gradient(400px 220px at 0% 100%, rgba(175,226,0,.12), transparent 60%)",
          }}
        >
          <DialogHeader>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80 mb-3">
              <span className="relative inline-block w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[#afe200]" />
                <span className="absolute -inset-1 rounded-full bg-[#afe200] opacity-35 animate-ping" />
              </span>
              <span>NIU · Newsletter</span>
            </div>
            <DialogTitle className="text-2xl font-extrabold tracking-tight">
              Stay in the loop
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="mt-5 text-sm text-white/85">
              <p className="m-0">
                <span className="text-[#afe200] font-semibold">Thanks!</span>{" "}
                We&apos;ll be in touch.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Monthly updates on the Hungarian startup ecosystem — funding,
                programs and partners. No spam.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-2.5"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isPending}
                  className="w-full rounded-lg bg-black/30 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#afe200] disabled:opacity-60"
                />
                {error && (
                  <p className="text-xs text-red-400 font-mono m-0">{error}</p>
                )}
                <label className="flex flex-row items-center gap-3 mt-1  cursor-pointer">
                  <Checkbox
                    checked={acceptTerms}
                    onCheckedChange={(checked) =>
                      setAcceptTerms(checked === true)
                    }
                    disabled={isPending}
                    className="mt-0.5 "
                  />
                  <span className="text-xs text-white/75 leading-relaxed">
                    I acknowledge the{" "}
                    <a
                      target="_blank"
                      href="https://niu.hu/storage/GDPR/20250529_NIU_Privacy_Notice_EN_korrJOG.pdf"
                      className="underline hover:text-[#afe200] transition-colors"
                    >
                      General data protection statemt
                    </a>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isPending || !acceptTerms}
                  className="w-full rounded-lg bg-[#afe200] text-[#0b1027] px-4 py-3 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? "Subscribing…" : "Subscribe →"}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="text-white/55 text-xs font-mono hover:text-white/80 mt-1"
                >
                  Maybe later
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
