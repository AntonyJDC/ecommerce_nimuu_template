import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import { ErrorPage } from "../ErrorPage";
import {
	BillingPage,
	ContactPage,
	FinancialReportsPage,
	HomePage,
	InventoryManagementPage,
	OnlineStorePage,
	PaymentGatewayPage,
	PointOfSalePage,
	PrivacyPolicyPage,
	TermsPage,
} from "../pages";
import { AcademyPage } from "../pages/Academy/AcademyPage";
import { CompanyPage } from "../pages/Company/CompanyPage";
import { LegalPage } from "../pages/Legal/LegalPage";
import { PlansPage } from "../pages/Plans/PlansPage";

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
				{ path: "/plans", element: <PlansPage />, errorElement: <ErrorPage /> },

				{
					path: "/company",
					element: <CompanyPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/academy",
					element: <AcademyPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/contact",
					element: <ContactPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/legal",
					element: <LegalPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/legal/terms",
					element: <TermsPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/legal/privacy-policy",
					element: <PrivacyPolicyPage />,
					errorElement: <ErrorPage />,
				},
				{
					path: "/solutions",
					children: [
						{
							path: "billing",
							element: <BillingPage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "inventory-management",
							element: <InventoryManagementPage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "online-store",
							element: <OnlineStorePage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "point-of-sale",
							element: <PointOfSalePage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "financial-reports",
							element: <FinancialReportsPage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "payment-gateway",
							element: <PaymentGatewayPage />,
							errorElement: <ErrorPage />,
						},
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
