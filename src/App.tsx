import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import MotionLazyContainer from "./presentation/components/animate/motion-lazy-container";
import { router } from "./presentation/routes/router";
import Providers from "./providers";
import { Toaster } from 'sonner';

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-base-100 flex justify-center content-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }
    >
      <HelmetProvider>
        {/* ✅ Redux y Redux Persist envuelven toda la app */}
        <Providers>
          <MotionLazyContainer>
            <Toaster richColors expand closeButton />
            <RouterProvider router={router} />
          </MotionLazyContainer>
        </Providers>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
