import CategoriesSection from "../../../components/shop-page/filters/CategoriesSection";
import DressStyleSection from "../../../components/shop-page/filters/DressStyleSection";
import PriceSection from "../../../components/shop-page/filters/PriceSection";
import SizeSection from "../../../components/shop-page/filters/SizeSection";
import { Button } from "../../ui/button";

const Filters = () => {
  return (
    <>
      <hr className="border-t-base-content/10" />
      <CategoriesSection />
      <hr className="border-t-base-content/10" />
      <PriceSection />
      <hr className="border-t-base-content/10" />
      <SizeSection />
      <hr className="border-t-base-content/10" />
      <DressStyleSection />
      <Button
        type="button"
        className="bg-primary text-primary-content w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
