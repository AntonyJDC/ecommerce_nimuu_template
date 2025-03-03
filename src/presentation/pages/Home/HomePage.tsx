import ProductListSec from "../../components/common/ProductListSec";
import DressStyle from "./sections/DressStyle";
import { Slideshow } from "./sections/Header";
import Reviews from "./sections/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Pestañina A Prueba de Agua",
    description:
      "Su fórmula resistente al agua y al sudor proporciona un volumen intenso y duradero sin grumos ni manchas.",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    colors: ["Dorado", "Gris Plata", "Aguacate"],
    rating: 4.5,
    quantity: 0,
    attributes: undefined,
    sizes: {
      "250ml": { price: 12000, discount: { amount: 0, percentage: 20 }, stock: 5  },
      "500ml": { price: 20000, discount: { amount: 0, percentage: 15 }, stock: 0  },
    },
    stock: 8,
  },
  {
    id: 2,
    title: "Gel Limpiador Facial",
    description:
      "Gel limpiador suave que elimina impurezas y el exceso de grasa sin resecar la piel. Ideal para pieles sensibles.",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    rating: 4.0,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "100ml": { price: 26000, discount: { amount: 0, percentage: 20 }, stock: 7  },
    },
    stock: 5,
  },
  {
    id: 3,
    title: "Crema Corporal Nutritiva",
    description:
      "Crema corporal enriquecida con manteca de karité que nutre profundamente, dejando la piel suave y flexible.",
    srcUrl: "/images/pic10.png",
    gallery: ["/images/pic10.png"],
    rating: 4.2,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "200ml": { price: 18000, discount: { amount: 0, percentage: 0 }, stock: 0 },
      "400ml": { price: 32000, discount: { amount: 0, percentage: 15 }, stock: 8  },
    },
    stock: 12,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Acondicionador Fortificante",
    description:
      "Fortalece y repara el cabello dañado, reduciendo la rotura y mejorando la elasticidad.",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png"],
    rating: 4.8,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "250ml": { price: 23200, discount: { amount: 0, percentage: 20 }, stock: 0  },
    },
    stock: 7,
  },
  {
    id: 6,
    title: "Sérum Reparador Facial",
    description:
      "Sérum facial de rápida absorción que reduce líneas de expresión y mejora la textura de la piel.",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png"],
    rating: 4.5,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "30ml": { price: 14500, discount: { amount: 0, percentage: 0 }, stock: 10  },
    },
    stock: 0,
  },
  {
    id: 7,
    title: "Exfoliante Corporal Natural",
    description:
      "Exfoliante con ingredientes naturales que eliminan células muertas y dejan la piel suave al tacto.",
    srcUrl: "/images/pic7.png",
    gallery: ["/images/pic7.png"],
    rating: 4.0,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "150ml": { price: 8000, discount: { amount: 0, percentage: 0 }, stock: 19  },
    },
    stock: 3,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "Mascarilla Capilar Revitalizante",
    description:
      "Tratamiento intensivo que nutre y revitaliza el cabello seco y maltratado, aportando brillo y fuerza.",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png"],
    rating: 4.6,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "250ml": { price: 24200, discount: { amount: 0, percentage: 20 }, stock: 15  },
    },
    stock: 6,
  },
  {
    id: 13,
    title: "Tónico Facial Refrescante",
    description:
      "Tónico que ayuda a cerrar poros y refrescar la piel, manteniéndola hidratada durante todo el día.",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png"],
    rating: 4.1,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "150ml": { price: 14500, discount: { amount: 0, percentage: 0 }, stock: 10  },
    },
    stock: 0,
  },
  {
    id: 14,
    title: "Aceite Corporal Relajante",
    description:
      "Aceite con efecto relajante que hidrata profundamente la piel, ideal para masajes corporales.",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
    rating: 4.7,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "200ml": { price: 18000, discount: { amount: 0, percentage: 10 }, stock: 10  },
    },
    stock: 9,
  },
  {
    id: 15,
    title: "Bálsamo Labial Hidratante",
    description:
      "Bálsamo que protege e hidrata los labios, ideal para climas fríos o secos.",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    rating: 5.0,
    quantity: undefined,
    attributes: undefined,
    colors: [],
    sizes: {
      "15ml": { price: 15000, discount: { amount: 0, percentage: 30 }, stock: 0  },
      "30ml": { price: 30000, discount: { amount: 0, percentage: 30 }, stock: 0  },
    },
    stock: 10,
  },
];


export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function HomePage() {
  return (
    <>
      <Slideshow />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="New arrivals"
          description="Discover the latest additions to our collection."
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="container">
          <hr className="h-[2px] border-t-base-200 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            description="Explore our most popular products."
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
