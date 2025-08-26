import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex justify-center">
      <div className="mt-32 flex-col flex gap-6 w-1/2 items-center">
        <h2 className="text-3xl font-bold">Not Found</h2>

        <p>Could not find requested resource</p>
        <Link className={buttonVariants({})} href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
