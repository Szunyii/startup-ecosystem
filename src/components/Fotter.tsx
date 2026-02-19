import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-[#011321] flex flex-col lg:flex-row justify-between pt-12 px-6 md:px-12 lg:px-32 pb-12 lg:pb-20 gap-y-10 lg:gap-y-0">

      {/* Logos Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center lg:items-start">
        <div className="flex flex-col gap-y-6">
          <Image src={"/niu-logo.png"} width={250} height={160} alt="niu" className="w-[200px] md:w-[250px] h-auto" />

          {/* Social Links */}
          <div className="flex justify-between gap-x-6">
            <Link href={"https://www.facebook.com/nemzetiinnovaciosugynokseg"} target="_blank">
              <Image src={"/fb.svg"} width={24} height={24} alt="facebook" className="hover:opacity-80 transition-opacity" />
            </Link>
            <Link href={"https://youtube.com/@hungarianinnovationagency?si=1pJ3dlq90bHwJlXr"} target="_blank">
              <Image src={"/youtube.svg"} width={24} height={24} alt="youtube" className="hover:opacity-80 transition-opacity" />
            </Link>
            <Link href={"https://www.instagram.com/nemzetiinnovaciosugynokseg/"} target="_blank">
              <Image src={"/instagram.svg"} width={24} height={24} alt="instagram" className="hover:opacity-80 transition-opacity" />
            </Link>
            <Link href={"https://www.linkedin.com/company/nationalinnovationagency"} target="_blank">
              <Image src={"/linkedin.svg"} width={24} height={24} alt="linkedin" className="hover:opacity-80 transition-opacity" />
            </Link>
          </div>
        </div>

        <Image src={"/NKFIA-logo.png"} width={320} height={170} alt="NKFIA" className="w-[250px] md:w-[320px] h-auto object-contain" />
      </div>

      {/* Info Section */}
      <div className="flex flex-col lg:items-end gap-y-6 text-white">
        <div>
          <Link
            href={"/disclaimer"}
            className="text-base md:text-lg text-white/80 hover:text-white hover:underline transition-colors"
          >
            Disclaimer
          </Link>
        </div>

        <div className="flex flex-col gap-y-2 lg:items-end">
          <p className="text-[#afe202] font-bold text-xl mb-1">Contact</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-x-6 lg:justify-end">
            <a className="hover:underline hover:text-[#afe202] transition-colors" href="mailto:info@niu.hu">
              info@niu.hu
            </a>
            <a className="hover:underline hover:text-[#afe202] transition-colors" href="mailto:sajto@niu.hu">
              sajto@niu.hu
            </a>
          </div>
          <a
            className="hover:underline hover:text-[#afe202] transition-colors flex items-start lg:justify-end"
            href="https://maps.app.goo.gl/BhxV7LeYYrAtEnFj6"
            target="_blank"
          >
            <Image
              src={"/marker.png"}
              width={16}
              height={20}
              alt={"location"}
              className="lg:-mr-4"
            />
            <span className="max-w-[250px] lg:text-right">Office: 1077 Budapest, Kéthly Anna tér 1.</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
