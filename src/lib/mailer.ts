import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally SMTP_FROM) in your .env file.",
    );
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from: from!,
  };
}

export function getMailer(): { transporter: Transporter; from: string } {
  if (cachedTransporter) {
    return { transporter: cachedTransporter, from: process.env.SMTP_FROM ?? process.env.SMTP_USER! };
  }
  const cfg = readSmtpConfig();
  cachedTransporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth,
  });
  return { transporter: cachedTransporter, from: cfg.from };
}

export type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

export async function sendMail(opts: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<SendResult> {
  try {
    const { transporter, from } = getMailer();
    console.log("[mailer] verifying SMTP connection...");
    await transporter.verify();
    console.log("[mailer] sending to", opts.to, "from", from);
    const info = await transporter.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    console.log("[mailer] sent", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return { ok: true, messageId: info.messageId };
  } catch (e) {
    console.error("[mailer] send failed", e);
    const error = e instanceof Error ? e.message : "Unknown SMTP error";
    return { ok: false, error };
  }
}
