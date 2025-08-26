// import { prisma } from "@/lib/db/prisma";
// import { getData } from "@/lib/external";
import { redirect } from "next/navigation";

export default async function Home() {
  // const allStartups = await prisma.startups.findMany();
  // const sshData = await getData();
  // console.log(sshData);

  redirect("ecosystem");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* {sshData.map((el) => el.szoveg)} */}
      {/* {allStartups.map((el) => el.companyName)} */}

      <main className="flex justify-center items-center flex-col gap-8 row-start-2 w-full">
        {/* <Formtest /> */}
      </main>
    </div>
  );
}
