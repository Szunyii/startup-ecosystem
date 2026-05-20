import MailerTestForm from "./MailerTestForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mailer Test",
  description: "Internal SMTP / welcome email testing page.",
  robots: { index: false, follow: false, nocache: true },
};

export default function MailerTestPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Welcome email test</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Renders the <code>WelcomeEmail</code> React component and sends it via
        the configured SMTP transport. Configure
        <code className="mx-1">SMTP_HOST</code>,<code className="mx-1">SMTP_PORT</code>,
        <code className="mx-1">SMTP_USER</code>,<code className="mx-1">SMTP_PASS</code>,
        and optionally <code className="mx-1">SMTP_FROM</code> in <code>.env</code>.
      </p>
      <MailerTestForm />
    </main>
  );
}
