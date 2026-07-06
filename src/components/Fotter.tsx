import Image from "next/image";
import Link from "next/link";
import SubscribeButton from "./SubscribeButton";

const socialLinks = [
  {
    href: "https://www.facebook.com/nemzetiinnovaciosugynokseg",
    icon: "/fb.svg",
    label: "Facebook",
  },
  {
    href: "https://youtube.com/@hungarianinnovationagency?si=1pJ3dlq90bHwJlXr",
    icon: "/youtube.svg",
    label: "YouTube",
  },
  {
    href: "https://www.instagram.com/nemzetiinnovaciosugynokseg/",
    icon: "/instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/nationalinnovationagency",
    icon: "/linkedin.svg",
    label: "LinkedIn",
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#011321] text-white">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-24">
          {/* Brand column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="https://niu.hu/" className="inline-block w-fit">
              <Image
                src="/niu-logo.png"
                width={250}
                height={160}
                alt="niu"
                className="w-[200px] md:w-[230px] h-auto"
              />
            </Link>

            <div className="flex items-center justify-between w-[200px] md:w-[230px]">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Image src={s.icon} width={22} height={22} alt="" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="text-[#afe202] font-bold text-lg">Stay updated</p>
            <SubscribeButton>Subscribe to newsletter →</SubscribeButton>
            <Link
              href="/disclaimer"
              className="text-sm text-white/70 hover:text-white hover:underline transition-colors w-fit"
            >
              Disclaimer
            </Link>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="text-[#afe202] font-bold text-lg">Contact</p>
            <a
              href="mailto:info@niu.hu"
              className="text-white/85 hover:text-[#afe202] hover:underline transition-colors w-fit"
            >
              info@niu.hu
            </a>
            <a
              href="mailto:sajto@niu.hu"
              className="text-white/85 hover:text-[#afe202] hover:underline transition-colors w-fit"
            >
              startup@niu.hu
            </a>
            <a
              href="https://maps.app.goo.gl/BhxV7LeYYrAtEnFj6"
              target="_blank"
              className="text-white/85 hover:text-[#afe202] transition-colors flex items-start gap-2 w-fit group"
            >
              <Image
                src="/marker.png"
                width={14}
                height={18}
                alt=""
                className="mt-1 flex-shrink-0"
              />
              <span className="group-hover:underline">
                Office: 1077 Budapest, Kéthly Anna tér 1.
              </span>
            </a>
          </div>
        </div>

        {/* Copyright + partner */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-white/50 order-2 md:order-1">
            © {new Date().getFullYear()} Hungarian Innovation Agency. All rights
            reserved.
          </p>
          <Link
            href="https://nkfih.gov.hu/palyazoknak"
            className="inline-block w-fit opacity-90 hover:opacity-100 transition-opacity order-1 md:order-2"
          >
            <Image
              src="/NKFIA-logo.png"
              width={320}
              height={170}
              alt="NKFIA"
              className="w-[200px] md:w-[230px] h-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
