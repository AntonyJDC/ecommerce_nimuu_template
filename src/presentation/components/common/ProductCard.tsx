import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <a
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto"
    >
      <div className="bg-base-200 rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <img
          src={data.srcUrl}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
        />
      </div>
      <strong className="text-base-content truncate w-full text-base sm:text-base md:text-md lg:text-lg xl:text-xl" title={data.title}>
        {data.title}
      </strong>
      <div className="flex items-end mb-1 xl:mb-2">
      </div>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        {data.discount.percentage > 0 ? (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            {`$${Math.round(data.price - (data.price * data.discount.percentage) / 100)}`}
          </span>
        ) : data.discount.amount > 0 ? (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            {`$${data.price - data.discount.amount}`}
          </span>
        ) : (
          <span className="font-medium text-base-content text-lg xl:text-xl">
            ${data.price}
          </span>
        )}

        {data.discount.percentage > 0 && (
          <span className="font-medium text-base-content/40 line-through text-sm xl:text-lg">
            ${data.price}
          </span>
        )}
        {data.discount.amount > 0 && (
          <span className="font-medium text-base-content/40 line-through text-sm xl:text-lg">
            ${data.price}
          </span>
        )}

        {data.discount.percentage > 0 ? (
          <span className="font-light text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            {`-${data.discount.percentage}%`}
          </span>
        ) : (
          data.discount.amount > 0 && (
            <span className="font-light text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-$${data.discount.amount}`}
            </span>
          )
        )}
      </div>
    </a>
  );
};

export default ProductCard;
