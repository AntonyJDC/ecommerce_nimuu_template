import { Product } from "@/types/product.types";
import { useState } from "react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);
  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!zoomActive) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleZoomToggle = () => {
    setZoomActive((prev) => !prev);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {/* Gallery Thumbnails */}
      {data?.gallery && data.gallery.length > 0 && (
        <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
          {data.gallery.map((photo, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              type="button"
              className={`bg-base-300 rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden ${selected === photo ? "ring-1 ring-primary" : ""
                }`}
              onClick={() => {
                setSelected(photo);
                setZoomActive(false);
              }}
            >
              <img
                src={photo}
                width={152}
                height={167}
                className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
                alt={data.title}
              />
            </button>
          ))}
        </div>
      )}

      {/* Selected Image with Zoom Effect */}

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="flex items-center justify-center bg-base-200 rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0 relative cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onClick={handleZoomToggle}
      >
        <img
          src={selected}
          width={444}
          height={530}
          className={`rounded-md w-full h-full object-none transition-transform duration-300 ${zoomActive ? "scale-150 cursor-zoom-out" : "scale-100"
            }`}
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
          alt={data.title}
        />
      </div>
    </div>
  );
};

export default PhotoSection;
