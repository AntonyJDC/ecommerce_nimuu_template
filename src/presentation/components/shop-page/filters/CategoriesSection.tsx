import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Accesorios",
    slug: "/shop?category=accesorios",
  },
  {
    title: "Artículos Electrónicos de Belleza",
    slug: "/shop?category=articulos-electronicos-de-belleza",
  },
  {
    title: "Baño y Cuerpo",
    slug: "/shop?category=bano-y-cuerpo",
  },
  {
    title: "Bioseguridad",
    slug: "/shop?category=bioseguridad",
  },
  {
    title: "Cabello",
    slug: "/shop?category=cabello",
  },
  {
    title: "Cuidado facial",
    slug: "/shop?category=cuidado-facial",
  },
  {
    title: "Hombre",
    slug: "/shop?category=hombre",
  },
  {
    title: "Kit",
    slug: "/shop?category=kit",
  },
  {
    title: "Maquillaje",
    slug: "/shop?category=maquillaje",
  },
  {
    title: "Perfumes y fragancias",
    slug: "/shop?category=perfumes-y-fragancias",
  },
  {
    title: "Tratamientos",
    slug: "/shop?category=tratamientos",
  },
  {
    title: "Uñas",
    slug: "/shop?category=unas",
  },
];


const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-base-content/60">
      {categoriesData.map((category, idx) => (
        <NavLink
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          to={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </NavLink>
      ))}
    </div>
  );
};

export default CategoriesSection;
