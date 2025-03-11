import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Slider } from "../../../components/ui/slider";

interface PriceSectionProps {
  priceRange: number[];
  onChange: (value: number[]) => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({ priceRange, onChange }) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-base-content font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4 mx-3">
          {/* Rango de precios seleccionado */}
          <div className="flex justify-between text-sm text-base-content/60 mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>

          {/* Slider con el relleno visible desde el inicio */}
          <Slider
            value={priceRange}
            onValueChange={onChange}
            min={0}
            max={50000} // Ajusta el máximo según tus productos
            step={1}
            label="$"
          />
          
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
