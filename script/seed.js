const startups = require("./startups.json");
const operatindData = require("./operatings.json");
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

    operatindData.map(async (op) => {
      await prisma.operatingResult.create({
        data: {
          id: op.id,
          balanceSheet: op.balanceSheet,
          startupId: op.startupId,
          value: op.value,
          year: op.year,
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
