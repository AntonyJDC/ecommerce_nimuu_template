import { Button } from "../../components/ui/button";
import InputGroup from "../../components/ui/input-group";
import { cn } from "@/lib/utils";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 container mx-auto bg-primary rounded-[20px]">
      <p
        className={cn([
          "font-bold text-[32px] md:text-[33px] text-primary-content mb-9 md:mb-0",
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex items-center">
        <div className="flex flex-col w-full mx-auto">
          <InputGroup className="flex bg-white mb-[14px] p-2 rounded-md">
            <InputGroup.Text>
              <img
                loading="lazy"
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
            />
            <Button
              className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full border border-transparent bg-primary transition-all duration-500 ease-in-out
             before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white before:transition-all before:duration-500 before:ease-in-out
             hover:before:w-full hover:border-black group"
              aria-label="Subscribe to Newsletter"
              type="button"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="relative z-10 w-6 h-6 transition-all duration-500 fill-white group-hover:fill-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L22 12L12 22L10 20L18 12L10 4L12 2Z" />
              </svg>
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
