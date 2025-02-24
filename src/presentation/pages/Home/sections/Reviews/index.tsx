"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/presentation/components/ui/carousel";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import ReviewCard from "@/presentation/components/common/ReviewCard";
import { Review } from "@/types/review.types";

type ReviewsProps = { data: Review[] };

const Reviews = ({ data }: ReviewsProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!isClient) return null;

  return (
    <section className="overflow-hidden">
      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        whileInView={{ x: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative w-full mb-6 md:mb-9"
        >
          <div className="relative container flex items-center justify-between mb-6 md:mb-10">
            {/* Contenedor de título y flechas centrados */}
            <div className="flex items-center justify-between w-full space-x-4">
              {/* Título centrado */}
              <motion.h2
                initial={{ y: "100px", opacity: 0 }}
                whileInView={{ y: "0", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={cn([
                  "text-[32px] leading-[36px] md:text-4xl capitalize",
                ])}
              >
                OUR HAPPY CUSTOMERS
              </motion.h2>

              {/* Flechas de navegación a la derecha del título */}
              <div className="flex items-center space-x-3 text-base-content">
                <CarouselPrevious variant="ghost" className="text-2xl hover:bg-primary hover:text-primary-content" />
                <CarouselNext variant="ghost" className="text-2xl hover:bg-primary hover:text-primary-content" />
              </div>
            </div>
          </div>
          <CarouselContent>
            {data.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="w-full max-w-[370px] sm:max-w-[470px] pl-5"
              >
                <ReviewCard
                  className="h-full"
                  data={review}
                  blurChild={
                    data.length >= 6 && (
                      <div
                        className={cn([
                          isDesktop
                            ? (current + 1 === count
                              ? 0
                              : current + 1 > count
                                ? 1
                                : current + 1) === index &&
                            "backdrop-blur-[2px]"
                            : (current === count ? 0 : current) === index &&
                            "backdrop-blur-[2px]",
                          isDesktop
                            ? (current === 1
                              ? count - 2
                              : current === 2
                                ? count - 1
                                : current - 3) === index &&
                            "backdrop-blur-[2px]"
                            : (current === 1
                              ? count - 1
                              : current === 2
                                ? 0
                                : current - 2) === index &&
                            "backdrop-blur-[2px]",
                          "absolute bg-white/10 right-0 top-0 h-full w-full z-10",
                        ])}
                      />
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Reviews;
