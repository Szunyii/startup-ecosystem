import "server-only";
import { render } from "@react-email/render";
import WelcomeEmail from "@/components/email/WelcomeEmail";
import { sendMail, type SendResult } from "@/lib/mailer";

export async function sendWelcomeEmail(opts: {
  to: string;
  recipientName?: string;
}): Promise<SendResult> {
  const element = <WelcomeEmail recipientName={opts.recipientName} />;
  const html = await render(element);
  const text = await render(element, { plainText: true });
  return sendMail({
    to: opts.to,
    subject: "Üdvözlünk a Hungarian Startup Ecosystemben",
    html,
    text,
  });
}
