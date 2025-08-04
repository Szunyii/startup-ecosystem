import { getData } from "@/lib/external";

export default async function Home() {
  const sshData = await getData();
  console.log(sshData);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {sshData.map((el) => el.szoveg)}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}
