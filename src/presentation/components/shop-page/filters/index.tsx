import { useState } from "react";
import CategoriesSection from "../../../components/shop-page/filters/CategoriesSection";
import DressStyleSection from "../../../components/shop-page/filters/DressStyleSection";
import PriceSection from "../../../components/shop-page/filters/PriceSection";
import SizeSection from "../../../components/shop-page/filters/SizeSection";
import { Button } from "../../ui/button";

interface FiltersProps {
  onFilterChange: (filters: { priceRange: number[] }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const applyFilters = () => {
    onFilterChange({ priceRange });
  };

  return (
    <>
      <hr className="border-t-base-content/10" />
      <CategoriesSection />
      <hr className="border-t-base-content/10" />
      <PriceSection priceRange={priceRange} onChange={setPriceRange} />
      <hr className="border-t-base-content/10" />
      <SizeSection />
      <hr className="border-t-base-content/10" />
      <DressStyleSection />
      <Button
        type="button"
        onClick={applyFilters}
        className="bg-primary text-primary-content w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
