import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "/shop?category=t-shirts",
  },
  {
    title: "Shorts",
    slug: "/shop?category=shorts",
  },
  {
    title: "Shirts",
    slug: "/shop?category=shirts",
  },
  {
    title: "Hoodie",
    slug: "/shop?category=hoodie",
  },
  {
    title: "Jeans",
    slug: "/shop?category=jeans",
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
