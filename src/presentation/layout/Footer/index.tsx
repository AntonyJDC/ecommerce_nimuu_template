import { cn } from "@/lib/utils";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import LinksSection from "./LinksSection";
import NewsLetterSection from "./NewsLetterSection";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com/AntonyJDC",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="absolute bottom-0 w-full h-1/2 bg-base-200"></div>
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-base-200 px-4 pb-4">
        <div className="container mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <h1
                className={cn([
                  "text-[28px] lg:text-[32px] mb-6",
                ])}
              >
                LUMINADA
              </h1>
              <p className="text-base-content/60 text-sm mb-9">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <a
                    href={social.url}
                    key={social.id}
                    className="bg-transparent hover:bg-primary hover:text-primary-content transition-all mr-3 w-7 h-7 rounded-full border border-base-content/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[1px] border-t-base-content/10 mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
            <p className="text-sm text-center sm:text-left text-base-content/60 mb-4 sm:mb-0 sm:mr-1">
              Luminada © Made by{" "}
              <a
                href="https://github.com/AntonyJDC"
                className="text-base-content font-medium"
              >
                AntonyJDC
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
