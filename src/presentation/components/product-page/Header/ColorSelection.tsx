import {
  setColorSelection,
} from "@lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { RootState } from "@lib/store";
import { IoMdCheckmark } from "react-icons/io";

// ✅ Definición del tipo de props
type ColorSelectionProps = {
  availableColors: { name: string; hex: string }[];
};

// Componente principal con props
const ColorSelection = ({ availableColors }: ColorSelectionProps) => {
  const { colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-base-content/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap gap-3 sm:gap-4">
        {availableColors.map((color, index) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            type="button"
            style={{ backgroundColor: color.hex }} // ✅ Usar estilo en línea
            className={`rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-gray-300`}
            onClick={() =>
              dispatch(
                setColorSelection({
                  name: color.name,
                  hex: color.hex,
                })
              )
            }
          >
            {/* ✅ Mostrar el check si el color seleccionado coincide */}
            {colorSelection.name === color.name && (
              <IoMdCheckmark className="text-base text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
