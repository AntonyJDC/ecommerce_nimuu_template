import React from "react";
import Rating from "@/presentation/components/ui/Rating";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Review } from "@/types/review.types";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  blurChild?: React.ReactNode;
  isAction?: boolean;
  isDate?: boolean;
  data: Review;
  className?: string;
};

const ReviewCard = ({
  blurChild,
  isAction = false,
  data,
  className,
}: ReviewCardProps) => {
  return (
    <div
      className={cn([
        "relative bg-transparent flex flex-col items-start aspect-auto border border-base-300 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden",
        className,
      ])}
    >
      {blurChild && blurChild}
      <div className="w-full flex items-center justify-between mb-3 sm:mb-4">
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          size={23}
          readonly
        />
        {isAction && (
          <Button variant="ghost" size="icon">
            <IoEllipsisHorizontal className="text-black/40 text-2xl" />
          </Button>
        )}  
      </div>
      <div className="flex items-center mb-2 sm:mb-3">
        <strong className="text-base-content sm:text-lg mr-1">{data.user}</strong>
        <IoIosCheckmarkCircle className="text-[#01AB31] text-lg sm:text-xl" />
      </div>
      <p className="text-sm sm:text-base text-base-content/60">{data.content}</p>
    </div>
  );
};

export default ReviewCard;
