import { z } from "zod";

export const startupFormSchema = z.object({
  companyName: z.string().min(2).max(50),
  brandName: z.string().min(2).max(50),
  websiteUrl: z.string().min(2).max(50),
  contactEmail: z.string().min(2).max(50),
  contactName: z.string().min(2).max(50),
  dealroomUrl: z.string().min(2).max(50),
  startupType: z.string().min(2).max(50),
});

export type startupFormValues = z.infer<typeof startupFormSchema>;

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
});

export type ecosystemFormValues = z.infer<typeof ecosystemFormSchema>;

// .refine((files) => {
//   return files?.[0]?.size <= MAX_FILE_SIZE;
// }, `Max image size is 5MB.`)
// .refine(
//   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
//   "Only .jpg, .jpeg and .png formats are supported."
// ),
