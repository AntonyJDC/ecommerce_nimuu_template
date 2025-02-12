import { cn } from "@/lib/utils";
import { LogoSiriusNovaIcon } from "@/presentation/components/logo/logo-sirius-nova-icon";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/presentation/components/ui/navigation-menu";

import React from "react";
import { Link, NavLink, useLocation } from "react-router";

export function NavigationMenuDemo() {
	return (
		<NavigationMenu>
			<NavigationMenuList className="space-x-12">
				<NavigationMenuItem>
					<NavigationMenuTrigger className="flex gap-x-2 relative py-2 transition-colors duration-300 hover:text-primary items-center">
						Solutions
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[700px] lg:grid-cols-3">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
										<LogoSiriusNovaIcon className="h-14 w-14" />
										<div className="mb-2 mt-4 text-lg font-medium">
											Sirius Nova
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Integrated platform empowering businesses with AI-driven
											tools for billing, inventory, sales, and analytics.
										</p>
									</div>
								</NavigationMenuLink>
							</li>

							<ListItem title="🧾 Billing" href="/solutions/billing">
								Create and manage electronic invoices easily.
							</ListItem>
							<ListItem
								title="📦 Inventory"
								href="/solutions/inventory-management"
							>
								Track and control inventory in real-time.
							</ListItem>
							<ListItem title="🛒 Online Store" href="/solutions/online-store">
								Build and sell through your e-commerce platform.
							</ListItem>
							<ListItem title="🏬 POS" href="/solutions/point-of-sale">
								Sync in-store and online sales seamlessly.
							</ListItem>
							<ListItem title="📊 Reports" href="/solutions/financial-reports">
								Get actionable insights powered by AI.
							</ListItem>
							<ListItem title="💳 Payments" href="/solutions/payment-gateway">
								Accept multiple payment methods securely.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to="/plans"
						className={({ isActive }) =>
							cn(
								"flex gap-x-2 relative py-2 transition-colors duration-300 hover:text-primary",
								isActive ? "text-primary" : "",
							)
						}
					>
						Plans
					</NavLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to={"/company"}
						className={({ isActive }) =>
							cn(
								"flex gap-x-2 relative py-2 transition-colors duration-300 hover:text-primary",
								isActive ? "text-primary" : "",
							)
						}
					>
						Company
					</NavLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to={"/academy"}
						className={({ isActive }) =>
							cn(
								"flex gap-x-2 relative py-2 transition-colors duration-300 hover:text-primary",
								isActive ? "text-primary" : "",
							)
						}
					>
						Academy
					</NavLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
	const location = useLocation();
	const isActive = location.pathname === href;
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-content",
						className,
						isActive && "bg-primary text-primary-content",
					)}
					to={href || "#"}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
