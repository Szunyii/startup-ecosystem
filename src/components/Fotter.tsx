import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-[#011321] flex flex-row justify-between pt-12 px-32 pb-20">
      <div className="flex flex-col gap-y-8">
        <Image src={"/niu-logo.png"} width={300} height={200} alt="facebook" />
        <div className="flex justify-between">
          <Link href={"https://www.facebook.com/nemzetiinnovaciosugynokseg"}>
            <Image src={"/fb.svg"} width={25} height={25} alt="facebook" />
          </Link>
          <Link
            href={
              "https://youtube.com/@hungarianinnovationagency?si=1pJ3dlq90bHwJlXr"
            }
          >
            <Image src={"/youtube.svg"} width={25} height={25} alt="youtube" />
          </Link>
          <Link href={"https://www.instagram.com/nemzetiinnovaciosugynokseg/"}>
            <Image
              src={"/instagram.svg"}
              width={25}
              height={25}
              alt="instagram"
            />
          </Link>

          <Link
            href={"https://www.linkedin.com/company/nationalinnovationagency"}
          >
            <Image
              src={"/linkedin.svg"}
              width={25}
              height={25}
              alt="linkedin"
            />
          </Link>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="text-white">
          <Link
            href={"/disclaimer"}
            className="text-lg text-white hover:underline overflow-hidden "
          >
            Disclaimer
          </Link>
        </div>

        <div className="flex-col flex justify-start text-white gap-0.5">
          <p className="text-[#afe202] font-bold text-xl">Contact</p>
          <div className="flex gap-x-4">
            <a className="hover:underline" href="mailto:info@niu.hu">
              info@niu.hu
            </a>
            <a className="hover:underline" href="mailto:sajto@niu.hu">
              sajto@niu.hu
            </a>
          </div>
          <p>Headquarters: 1133 Budapest, Pozsonyi út 56.</p>
          <a
            className="hover:underline flex gap-x-2 "
            href="https://maps.app.goo.gl/BhxV7LeYYrAtEnFj6"
            target="_blank"
          >
            <Image
              src={"/marker.png"}
              width={15}
              height={118}
              alt={"location"}
            />
            Office: 1077 Budapest, Kéthly Anna tér 1.
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
