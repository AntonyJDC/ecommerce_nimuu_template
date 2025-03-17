import {
  relatedProductData,
  productPage,
  newArrivalsData,
  topSellingData,
} from "@pages/Home/HomePage";
import ProductListSec from "@components/common/ProductListSec";
import BreadcrumbProduct from "@components/product-page/BreadcrumbProduct";
import Header from "@components/product-page/Header";
import Tabs from "@components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { useParams } from "react-router-dom";

const data: Product[] = [
  ...productPage.map(product => ({
    ...product,
    rating: Number(product.rating)
  })),
  ...newArrivalsData,
  ...topSellingData,
];

export default function ProductPage() {
  // ✅ Capturar parámetros dinámicos desde la URL
  const { id } = useParams<{ id: string; slug: string }>();

  // ✅ Buscar el producto usando el ID
  const productData = data.find((product) => product.id === Number(id));

  // ✅ Mostrar un mensaje si el producto no se encuentra
  if (!productData) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <main>
      <div className="container mt-8">

        {/* ✅ Breadcrumb dinámico basado en el producto */}
        <BreadcrumbProduct title={productData.title} />

        {/* ✅ Encabezado con la información del producto */}
        <section className="mb-11">
          <Header data={productData} />
        </section>

        {/* ✅ Pestañas con información adicional */}
        <Tabs />
      </div>

      {/* ✅ Productos relacionados */}
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec
          title="You might also like"
          description=""
          data={relatedProductData}
        />
      </div>
    </main>
  );
}
