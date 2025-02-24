import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import { ErrorPage } from "../ErrorPage";
import HomePage from "../pages/Home/HomePage";
import CartPage from "../pages/cart/page";
import ShopPage from "../pages/shop/page";
import ProductPage from "../pages/shop/product/[...slug]/page"; // ✅ Importación de la página de producto
import { BookingPage } from "../pages/Booking/BookingPage";
import { ContactPage } from "../pages/Contact/ContactPage";

const LandingLayout = lazy(() => import("../layout/LandingLayout"));
const NotFoundPage = lazy(() => import("../NotFoundPage"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div className="h-screen w-full bg-base-100 flex justify-center content-center">
              <span className="loading loading-ring loading-lg" />
            </div>
          }
        >
          <LandingLayout />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/shop",
          element: <ShopPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/shop/product/:id/:slug",
          element: <ProductPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "book-appointment",
          element: <BookingPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "contact-us",
          element: <ContactPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "",
          element: <Navigate to="home" replace />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense
          fallback={
            <div className="h-screen w-full bg-base-100 flex justify-center content-center">
              <span className="loading loading-ring loading-lg" />
            </div>
          }
        >
          <NotFoundPage />
        </Suspense>
      ),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  }
);
