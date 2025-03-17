import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { MdKeyboardArrowRight } from "react-icons/md";

type DressStyle = {
  title: string;
  slug: string;
};

const dressStylesData: DressStyle[] = [
  {
    title: "Relax",
    slug: "/shop?style=relax",
  },
  {
    title: "Cuidado Facial",
    slug: "/shop?style=cuidado-facial",
  },
  {
    title: "Cuidado Corporal",
    slug: "/shop?style=cuidado-corporal",
  },
  {
    title: "Cuidado Capilar",
    slug: "/shop?style=cuidado-capilar",
  },
];

const DressStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-base-content font-bold text-xl hover:no-underline p-0 py-0.5">
          Style
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-base-content/60 space-y-0.5">
            {dressStylesData.map((dStyle, idx) => (
              <NavLink
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
                to={dStyle.slug}
                className="flex items-center justify-between py-2"
              >
                {dStyle.title} <MdKeyboardArrowRight />
              </NavLink>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
