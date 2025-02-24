import { cn } from "@/lib/utils";
import React from "react";
import { NavLink } from "react-router-dom";

type DressStyleCardProps = {
  title: React.ReactNode;
  url: string;
  className?: string;
};

const DressStyleCard = ({ title, url, className }: DressStyleCardProps) => {
  return (
    <NavLink
      to={url}
      className={cn([
        "w-full md:h-full rounded-[20px] bg-top text-2xl md:text-3xl font-bold text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover bg-base-100 text-base-content border border-base-300 hover:bg-black hover:bg-opacity-15 transition-all duration-300 ease-in-out hover:border-primary",
        className,
      ])}
    >
      {title}
    </NavLink>
  );
};

export default DressStyleCard;
