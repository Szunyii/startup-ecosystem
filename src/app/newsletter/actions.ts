"use server";

import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { sendWelcomeEmail } from "@/lib/email/welcome";

const newsletterSchema = z.object({
  email: z.string().email().max(255),
  recipientName: z.string().max(120).optional(),
});

export type NewsletterResult =
  | { ok: true; messageId?: string; emailError?: string }
  | { ok: false; error: string };

export async function createNewsletterSub(
  input: z.infer<typeof newsletterSchema>,
): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid email address." };
  }

  try {
    await prisma.newsletter.create({
      data: { email: parsed.data.email },
    });
  } catch (e) {
    console.error("newsletter subscription failed", e);
    return { ok: false, error: "Could not save subscription. Try again later." };
  }

  const mailRes = await sendWelcomeEmail({
    to: parsed.data.email,
    recipientName: parsed.data.recipientName,
  });

  if (!mailRes.ok) {
    console.error("welcome email failed", mailRes.error);
    return { ok: true, emailError: mailRes.error };
  }

  return { ok: true, messageId: mailRes.messageId };
}
