export type SpecItem = {
  label: string;
  value: string;
};

const specsData: SpecItem[] = [
  {
    label: " Material composition",
    value: "100% Cotton",
  },
  {
    label: "Care instructions",
    value: "Machine wash warm, tumble dry",
  },
  {
    label: "Fit type",
    value: "Classic Fit",
  },
  {
    label: "Pattern",
    value: "Solid",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-base-content/70">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-base-content/80 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
