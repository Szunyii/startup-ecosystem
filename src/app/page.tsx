// import EventSection from "@/components/EventSection";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/why-hungary");
  return (
    // <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />
    <div>
      {/* <div className="w-full min-h-screen max-h-screen z-10 text-white flex justify-center">
        <div className="mt-36">
          <h2 className="text-6xl font-bold max-w-3xl text-center ">
            Facilitating Hungarian startups visibility on the global ecosystem
            map
          </h2>
        </div>
      </div>
      <section>
        <EventSection />
      </section> */}
    </div>
  );
}
