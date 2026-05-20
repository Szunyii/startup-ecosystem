"use server";

import { prisma } from "@/lib/db/prisma";
import { kkvRegistryFormValues } from "@/lib/validation";

// export async function createTst(value: tstValue) {
//   const text = await prisma.pelda.create({ data: { ...value } });

//   return text;
// }

export async function createKKVReg({
  about,
  company_name,
  contact_email,
  tax_number,
  category,
  sub_categories,
  website,
}: kkvRegistryFormValues) {
  // TODO: `category` and `sub_categories` are collected by the form but
  // not yet persisted — the `kkv_registry` MySQL table does not have these
  // columns. Add them via ALTER TABLE + `prisma db pull` + `generate`, then
  // include them in the create payload below.
  const newStartup = await prisma.kkv_registry.create({
    data: {
      about,
      contact_email,
      company_name,
      tax_number,
      website,
      category,
      // sub_categories is a LongText column → serialize the array to JSON
      // so we can JSON.parse it back when reading.
      sub_categories: JSON.stringify(sub_categories ?? []),
    },
  });

  return newStartup;
}

// export async function createStartupReg({
//     brandName,
//     companyName,
//     contactEmail,
//     contactName,
//     dealroomUrl,
//     startupType,
//     websiteUrl,
// }: Omit<startupFormValues, "acceptTerms">) {
//     const newStartup = await prisma.startupRegistry.create({
//         data: {
//             company_name: companyName,
//             brand_name: brandName,
//             contact_email: contactEmail,
//             contact_person_name: contactName,
//             dealroom_url: dealroomUrl,
//             request_type: startupType,
//             website_url: websiteUrl,
//         },
//     });

//     return newStartup;
// }
