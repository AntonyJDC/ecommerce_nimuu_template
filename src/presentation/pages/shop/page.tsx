import { useState } from "react";
import BreadcrumbShop from "../../components/shop-page/BreadcrumbShop";
import Filters from "../../components/shop-page/filters";
import MobileFilters from "../../components/shop-page/filters/MobileFilters";
import ProductCard from "../../components/common/ProductCard";
import { FiSliders } from "react-icons/fi";
import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "../../pages/Home/HomePage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Boxes } from "lucide-react";

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // Todos los productos
  const allProducts = [
    ...relatedProductData,
    ...newArrivalsData,
    ...topSellingData,
  ];

  // Filtrar productos por precio mínimo basado en los tamaños disponibles
  const filteredProducts = allProducts.filter((product) => {
    const availableSizes = Object.values(product.sizes || {});

    if (availableSizes.length === 0) return false;

    const minPrice = Math.min(
      ...availableSizes.map((size) => {
        const discountedPrice = size.price - (size.price * (size.discount?.percentage || 0)) / 100;
        return discountedPrice;
      })
    );

    return minPrice >= priceRange[0] && minPrice <= priceRange[1];
  });

  return (
    <section className="pb-20 mt-8 container">
      <BreadcrumbShop />
      <div className="flex md:space-x-5 items-start">
        {/* Sidebar de filtros */}
        <div className="hidden md:block min-w-[295px] max-w-[295px] border border-base-content/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-bold text-base-content text-xl">Filters</span>
            <FiSliders className="text-2xl text-base-content/40" />
          </div>
          <Filters onFilterChange={({ priceRange }) => setPriceRange(priceRange)} />
        </div>

        {/* Sección de productos */}
        <div className="flex flex-col w-full space-y-5 px-3">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
            <MobileFilters onFilterChange={({ priceRange }) => setPriceRange(priceRange)} />
          </div>

          <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))
            ) : (
              <p className="text-base-content/60 text-lg text-center flex flex-col items-center justify-center col-span-full py-8">
                <Boxes className="w-28 h-28 mb-4"/>
                No products found in this price range.
              </p>
            )}
          </div>

          <Pagination className="justify-between">
            <PaginationPrevious href="#" className="border border-base-content/10" />
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                  isActive
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="text-base-content/50 font-medium text-sm" />
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                >
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden sm:block">
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                >
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-base-content/50 font-medium text-sm"
                >
                  10
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>

            <PaginationNext href="#" className="border border-base-content/10" />
          </Pagination>
        </div>
      </div>
    </section>
  );
}
