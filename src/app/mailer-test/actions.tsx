"use server";

import {
  createNewsletterSub,
  type NewsletterResult,
} from "@/app/newsletter/actions";

export type WelcomeMailInput = {
  to: string;
  recipientName?: string;
};

export async function sendWelcomeMail(
  input: WelcomeMailInput,
): Promise<NewsletterResult> {
  return createNewsletterSub({
    email: input.to,
    recipientName: input.recipientName,
  });
}
