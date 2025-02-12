import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import MotionLazyContainer from "./presentation/components/animate/motion-lazy-container";
import { router } from "./presentation/routes/router";

function App() {
	return (
		<Suspense
			fallback={
				<div className="h-screen w-full bg-base-100 flex justify-center content-center">
					<span className="loading loading-spinner loading-lg " />
				</div>
			}
		>
			<HelmetProvider>
				<MotionLazyContainer>
					<RouterProvider router={router} />
				</MotionLazyContainer>
			</HelmetProvider>
		</Suspense>
	);
}

export default App;
