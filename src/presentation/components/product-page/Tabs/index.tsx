"use client";

import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { useState } from "react";
import ProductDetailsContent from "./ProductDetailsContent";
import ReviewsContent from "./ReviewsContent";
import FaqContent from "./FaqContent";

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Product Details",
  },
  {
    id: 2,
    label: "Rating & Reviews",
  },
  {
    id: 3,
    label: "FAQs",
  },
];

const Tabs = () => {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={active === tab.id ? "default" : "ghost"}
            className={cn([
              active === tab.id
                ? "border-primary/10 shadow-md border-b-2 font-medium text-primary-content"
                : "border-b border-base-content/10 text-base-content/60 font-normal hover:bg-transparent",
              "p-5 sm:p-6 rounded-none flex-1",
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mb-12 sm:mb-16">
        {active === 1 && <ProductDetailsContent />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
    </div>
  );
};

export default Tabs;
