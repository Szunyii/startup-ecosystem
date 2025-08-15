"use server";

import { prisma } from "@/lib/db/prisma";
import { ecosystemFormValues, startupFormValues } from "./../../lib/validation";

// export async function createTst(value: tstValue) {
//   const text = await prisma.pelda.create({ data: { ...value } });

//   return text;
// }

export async function createStartupReg({
  brandName,
  companyName,
  contactEmail,
  contactName,
  dealroomUrl,
  startupType,
  websiteUrl,
}: startupFormValues) {
  const newStartup = await prisma.startupRegistry.create({
    data: {
      company_name: companyName,
      brand_name: brandName,
      contact_email: contactEmail,
      contact_person_name: contactName,
      dealroom_url: dealroomUrl,
      request_type: startupType,
      website_url: websiteUrl,
    },
  });

  return newStartup;
}

export async function createEcosystemReg({
  contactRole,
  contactName,
  companyName,
  contactEmail,
  requestType,
  stage,
  type,
  websiteUrl,
}: ecosystemFormValues) {
  const newEcosystemMember = await prisma.ecosystemRegistry.create({
    data: {
      company_name: companyName,
      contact_name: contactName,
      contact_role: contactRole,
      contact_email: contactEmail,
      request_type: requestType,
      website_url: websiteUrl,
      stage: stage,
      type: type,
    },
  });

  return newEcosystemMember;
}
