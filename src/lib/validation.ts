import { z } from "zod";

export const startupFormSchema = z.object({
  companyName: z.string().min(2).max(50),
  brandName: z.string().min(2).max(50),
  websiteUrl: z.string().min(2).max(50),
  contactEmail: z.string().min(2).max(50),
  contactName: z.string().min(2).max(50),
  dealroomUrl: z.string().min(2).max(50),
  startupType: z.string().min(2).max(50),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to submit this form.",
  }),
});

export type startupFormValues = z.infer<typeof startupFormSchema>;

//  company_name String? @db.VarChar(255)
//   tax_number   String? @db.VarChar(255)
//   website      String? @db.VarChar(255)
//   about        String? @db.VarChar(255)

export const kkvRegistry = z.object({
  company_name: z.string().min(2),
  tax_number: z.string().min(2),
  website: z.string(),
  contact_email: z.email(),
  about: z.string().max(500),
  category: z.string(),
  sub_categories: z.array(z.string()),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to submit this form.",
  }),
});

export type kkvRegistryFormValues = z.infer<typeof kkvRegistry>;

// const MAX_FILE_SIZE = 1024 * 1024 * 5;
// const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ecosystemFormSchema = z.object({
  companyName: z.string().min(2).max(50),
  websiteUrl: z.string().min(2).max(50),
  contactName: z.string().min(2).max(50),
  contactRole: z.string().min(2).max(50),
  contactEmail: z.string().min(2).max(50),
  stage: z.string().min(2),

  type: z.string().min(2),
  requestType: z.string().min(2),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to submit this form.",
  }),
});

export type ecosystemFormValues = z.infer<typeof ecosystemFormSchema>;

// .refine((files) => {
//   return files?.[0]?.size <= MAX_FILE_SIZE;
// }, `Max image size is 5MB.`)
// .refine(
//   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
//   "Only .jpg, .jpeg and .png formats are supported."
// ),
