import { useGlobalStore } from "@/store/global/global.store";
import { AnimatePresence, m } from "motion/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { LogoIcon } from "../components";
import { LogoTitle } from "../components/logo";
import { LanguageSelector, ThemeToggle } from "../components/shared";
import { NavigationMenuDemo } from "./components/navigation-menu";

const Navbar: FC = () => {
	console.log("Render Navbar");
	const isScrolled = useGlobalStore((state) => state.isScrolled);
	const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);
	const setIsSidebarOpen = useGlobalStore((state) => state.setIsSidebarOpen);
	const navigate = useNavigate();
	const handleLogo = () => {
		setIsSidebarOpen(false);
		navigate("/home");
	};

	const { t } = useTranslation();

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 bg-base-100 shadow-md shadow-base/10 ${isScrolled ? "h-20" : "h-28"}`}
		>
			<AnimatePresence>
				{!isScrolled && (
					<m.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 37 }}
						exit={{ opacity: 0, height: 0 }}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
						}}
						className="bg-base-200 transition-colors duration-300 flex justify-end items-center overflow-hidden"
					>
						<div className="flex justify-end container">
							<LanguageSelector />
							<ThemeToggle />
						</div>
					</m.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between container h-20">
				<button
					type="button"
					className="flex items-center gap-0 cursor-pointer hover:scale-105 duration-300 transition-transform text-primary"
					onClick={handleLogo}
				>
					<LogoTitle className="h-7 w-28 mr-2" />
					<LogoIcon className="h-7 w-7" aria-label="Nimuu Logo" />
				</button>
				<nav
					className="flex-1 hidden 
				
				lg:flex justify-center gap-6 text-base-content items-center"
				>
					<NavigationMenuDemo />
				</nav>
				<div className="flex items-center gap-4 max-lg:ml-auto">
					<button
						type="button"
						onClick={() => navigate("/contact")}
						className="py-2 px-3 border border-primary text-base-content rounded-md transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/40 whitespace-nowrap max-lg:hidden"
					>
						{t("nav.button.contact")}
					</button>
					<a
						href="https://app.nimuu.com/auth/login"
						className="bg-gradient-to-r from-primary to-secondary py-2 px-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 whitespace-nowrap text-primary-content  max-sm:hidden"
					>
						{t("nav.button.login")}
					</a>
				</div>

				<button
					type="button"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="btn btn-ghost btn-circle lg:hidden ml-6 relative group flex items-center justify-center"
					aria-label="Menu"
				>
					<div className="relative flex items-center justify-center w-[20px] h-[20px]">
						{/* Línea superior */}
						<div
							className={`absolute h-[2px] w-5 transform transition-all duration-300 
            ${
							isSidebarOpen
								? "rotate-45 bg-error"
								: "translate-y-[-6px] bg-base-content"
						}`}
						/>
						<div
							className={`absolute h-[2px] w-5 transform transition-all duration-300 bg-base-content
            ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
						/>
						<div
							className={`absolute h-[2px] w-5 transform transition-all duration-300 
            ${
							isSidebarOpen
								? "-rotate-45 bg-error"
								: "translate-y-[6px] bg-base-content"
						}`}
						/>
					</div>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
