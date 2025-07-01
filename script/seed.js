const startups = require("./startups.json");
const operatindData = require("./operatings.json");
const companys = require("./companys.json");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    // startups.map(async (startup) => {
    //   await prisma.startup.create({
    //     data: {
    //       id: startup.id,
    //       companyName: startup.companyName,
    //       taxNumber: startup.taxNumber,
    //     },
    //   });
    // })

    companys.map(async (op) => {
      await prisma.companys.create({
        data: {
          startupId: op.startupId,
          companyName: op.companyName,
          taxNumber: op.taxNumber,
          income_2023: op.income_2023,
          salary_2023: op.salary_2023,
          tax_2023: op.tax_2023,
          person_2023: op.person_2023,
          income_2024: op.income_2024,
          salary_2024: op.salary_2024,
          tax_2024: op.tax_2024,
          person_2024: op.person_2024,
          income_YoY: op.income_YoY,
          salary_YoY: op.salary_YoY,
          tax_YoY: op.tax_YoY,
          person_YoY: op.person_YoY,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
