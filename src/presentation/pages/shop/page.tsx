import { useState } from "react";
import BreadcrumbShop from "../../components/shop-page/BreadcrumbShop";
import Filters from "../../components/shop-page/filters";
import MobileFilters from "../../components/shop-page/filters/MobileFilters";
import ProductCard from "../../components/common/ProductCard";
import { FiSliders } from "react-icons/fi";
import {
  productPage,
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
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const allProducts = Array.from(new Set([...productPage])).map(product => ({
    ...product,
    rating: Number(product.rating)
  }));

  // Filtrar productos por precio
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

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Obtener productos de la página actual correctamente
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Cambiar página
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log("Total de productos filtrados:", filteredProducts.length);
  console.log("Total de páginas:", totalPages);
  console.log("Página actual:", currentPage);
  console.log("Mostrando productos:", startIndex, "a", endIndex);

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
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))
            ) : (
              <p className="text-base-content/60 text-lg text-center flex flex-col items-center justify-center col-span-full py-8">
                <Boxes className="w-28 h-28 mb-4" />
                No products found in this price range.
              </p>
            )}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <Pagination className="justify-between mt-8">
              <PaginationPrevious
                href="#"
                onClick={() => goToPage(currentPage - 1)}
                className={`border border-base-content/10 hover:bg-primary ${currentPage === 1 ? 'disabled' : ''}`}
              />

              <PaginationContent className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((page) => {
                    if (totalPages < 10) return true;
                    if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2) {
                      return true;
                    }
                    return false;
                  })
                  .map((page, index, array) => (
                    <PaginationItem key={page} className="flex items-center">
                      <PaginationLink
                        href="#"
                        className={`w-9 h-9 flex items-center justify-center hover:bg-primary border border-base-content/10 rounded-md text-sm font-medium transition ${currentPage === page
                          ? "bg-primary text-primary-content font-bold"
                          : "hover:bg-primary/20 text-base-content/50 hover:border-primary/50"
                          }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </PaginationLink>
                      {array[index + 1] !== undefined && array[index + 1] !== page + 1 && (
                        <PaginationEllipsis className="text-base-content/50 font-medium text-sm" />
                      )}
                    </PaginationItem>
                  ))}
              </PaginationContent>

              <PaginationNext
                href="#"
                className="border border-base-content/10 hover:bg-primary"
                onClick={() => {
                  if (currentPage < totalPages) {
                    goToPage(currentPage + 1);
                  }
                }}
              />
            </Pagination>
          )}
        </div>
      </div>
    </section>
  );
}
