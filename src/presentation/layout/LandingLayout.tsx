import { useEffect } from "react";

import { useGlobalStore } from "@/store/global/global.store";
import { Outlet, useLocation } from "react-router";
import { useMediaQuery } from "../hooks/use-media-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";

// Main Layout Component
const LandingLayout = () => {
	console.log("Render LandingLayout");

	return (
		<div className="flex flex-col min-h-screen transition-all duration-300 bg-base-100">
			<Navbar />
			<Sidebar />
			<main className=" flex-grow mt-24 md:mt-28 pl-0">
				<Outlet />
			</main>
			<Footer />
			<UseEffectLayout />
		</div>
	);
};

const UseEffectLayout = () => {
	const setIsScrolled = useGlobalStore((state) => state.setIsScrolled);

	const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);

	const isDesktop = useMediaQuery("(min-width: 1024px)", 1024);
	useEffect(() => {
		if (isSidebarOpen && isDesktop) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isSidebarOpen, isDesktop]);

	useEffect(() => {
		// Forzamos que isScrolled sea false cuando se cargue la página si scrollY es menor a 450
		const handleScroll = () => {
			setIsScrolled(window.scrollY >= 450);
		};

		// Verificamos si la página está en la parte superior al cargar
		setIsScrolled(window.scrollY >= 450);

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [setIsScrolled]);
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Promp dependence is required.
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, [pathname]);
	return null;
};

export default LandingLayout;
