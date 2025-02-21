import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import { ErrorPage } from "../ErrorPage";
import HomePage from "../pages/Home/HomePage";


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
							<span className="loading loading-ring loading-lg " />
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
					path: "/solutions",
					children: [

					],
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
							<span className="loading loading-ring loading-lg " />
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
	},
);
