import { useGlobalStore } from "@/store/global/global.store";
import { FC } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ScrollArea } from "../components/ui/scroll-area";

const SOLUTIONS_MENU_ITEMS = [
	{ icon: "🧾", label: "Billing", path: "/solutions/billing" },
	{ icon: "📦", label: "Inventory", path: "/solutions/inventory-management" },
	{ icon: "🛒", label: "Online Store", path: "/solutions/online-store" },
	{ icon: "🏬", label: "POS", path: "/solutions/point-of-sale" },
	{ icon: "📊", label: "Reports", path: "/solutions/financial-reports" },
	{ icon: "💳", label: "Payments", path: "/solutions/payment-gateway" },
];

export const Sidebar: FC = () => {
	console.log("Render Sidebar");
	const isScrolled = useGlobalStore((state) => state.isScrolled);
	const isSidebarOpen = useGlobalStore((state) => state.isSidebarOpen);
	const setIsSidebarOpen = useGlobalStore((state) => state.setIsSidebarOpen);
	const location = useLocation();
	const isActive = location.pathname.startsWith("/solutions/");
	return (
		<div
			className={`
        lg:hidden fixed ${isScrolled ? "top-20" : "top-28"} 
        bottom-0 left-0 w-full bg-base-100 shadow-lg 
        transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        z-40
      `}
		>
			<div className="flex flex-col h-full">
				<ScrollArea type="auto" className="flex-grow">
					<nav className="flex-grow container">
						<ul className="menu bg-base-100 rounded-box w-full text-xl">
							<li key='home' className="py-0.5">
								<NavLink
									to='/home'
									onClick={() => setIsSidebarOpen(false)}
									className={({ isActive }) => {
										return `${isActive ? "bg-primary/40 text-primary font-semibold" : "font-medium"}`;
									}}
								>
									Home
								</NavLink>
							</li>
							<li>
								<details open>
									<summary
										className={` font-medium ${isActive && "bg-primary/25 text-primary font-semibold"}`}
									>
										Solutions
									</summary>
									<ul>
										{SOLUTIONS_MENU_ITEMS.map(({ icon, label, path }) => (
											<li key={label} className="py-0.5 ">
												<NavLink
													to={path}
													onClick={() => setIsSidebarOpen(false)}
													className={({ isActive }) => {
														return `${isActive ? "bg-primary/25 text-primary font-semibold" : "font-medium"}`;
													}}
												>
													{icon} {label}
												</NavLink>
											</li>
										))}
									</ul>
								</details>
							</li>
							{["Plans", "Company", "Academy"].map((item) => (
								<li key={item} className="py-0.5">
									<NavLink
										to={`/${item.toLowerCase()}`}
										onClick={() => setIsSidebarOpen(false)}
										className={({ isActive }) => {
											return `${isActive ? "bg-primary/40 text-primary font-semibold" : "font-medium"}`;
										}}
									>
										{item}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</ScrollArea>
				<div className="container py-4 border-t flex flex-col space-y-3">
					<Link
						to="/contact"
						onClick={() => setIsSidebarOpen(false)}
						className="text-center py-2 px-3 border border-primary rounded-md 
              transition-all duration-300 hover:border-primary hover:text-primary 
              hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap"
					>
						Contact
					</Link>
					<a
						href="https://app.nimutech.com/auth/login"
						className="bg-gradient-to-r from-primary to-primary-secondary py-2 px-3 
              rounded-md transition-all duration-300 hover:shadow-lg 
              hover:shadow-primary/40 whitespace-nowrap text-primary-content text-center"
					>
						Log In
					</a>
				</div>
			</div>
		</div>
	);
};
