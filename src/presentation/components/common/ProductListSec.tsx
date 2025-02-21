import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/presentation/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";

type ProductListSecProps = {
  title: string;
  description: string;
  data: Product[];
  viewAllLink?: string;
};

const ProductListSec = ({ title, description, data, viewAllLink }: ProductListSecProps) => {
  return (
    <section className="container mx-auto text-center lg:text-start">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col">
          <motion.h2
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              "text-[32px] md:text-3xl capitalize font-bold",
            ])}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[16px] md:text-lg text-base-content/60 normal-case mb-4">{description}</p>

            {viewAllLink && (
              <div className="w-full px-4 sm:px-0 text-center space-y-8 flex justify-center lg:justify-start items-center lg:items-start">
                <a
                  type="button"
                  href={viewAllLink}
                  className="inline-block text-sm mb-5 px-16 py-2 border border-transparent rounded-full bg-primary text-primary-content transition-all font-medium hover:scale-105"
                >
                  View All
                </a>
              </div>
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mb-6 md:mb-9"
          >
            <CarouselContent className="mx-4 xl:mx-8 space-x-4 sm:space-x-5">
              {data.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="w-full max-w-[198px] sm:max-w-[295px] pl-0"
                >
                  <ProductCard data={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductListSec;
