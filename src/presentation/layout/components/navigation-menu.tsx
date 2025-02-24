import { cn } from "@/lib/utils";
import { LogoIcon } from "@/presentation/components";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
	const location = useLocation();
	const isActive = location.pathname.startsWith("/solutions/");
	return (
		<NavigationMenu>
			<NavigationMenuList className="space-x-10">
				<NavigationMenuItem>
					<NavLink
						to="/home"
						className={({ isActive }) =>
							cn(
								"text-base font-medium hover:text-primary",
								isActive && "text-primary",
							)
						}
					>
						{t("nav.button.home")}
					</NavLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger
						className={`text-base font-medium flex gap-x-2 relative py-2 hover:text-primary items-center data-[state=open]:text-secondary ${isActive && "text-primary"}`}
					>
						{t("nav.button.products.label")}
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[450px] lg:w-[650px] lg:grid-cols-3">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<div className="flex h-full w-full select-none flex-col justify-center items-center rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md">
										<LogoIcon className="h-20 w-20 text-primary" />
									</div>
								</NavigationMenuLink>
							</li>

							<ListItem title={t("nav.button.products.relax.title")} href="/shop">
								{t("nav.button.products.relax.description")}
							</ListItem>
							<ListItem title={t("nav.button.products.facial_care.title")} href="/shop">
								{t("nav.button.products.facial_care.description")}
							</ListItem>
							<ListItem title={t("nav.button.products.body_care.title")} href="/shop">
								{t("nav.button.products.body_care.description")}
							</ListItem>
							<ListItem title={t("nav.button.products.hair_care.title")} href="/shop">
								{t("nav.button.products.hair_care.description")}
							</ListItem>


						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to="/shop"
						className={({ isActive }) =>
							cn(
								"text-base font-medium hover:text-primary",
								isActive && "text-primary",
							)
						}
					>
						{t("nav.button.shop")}
					</NavLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to={"/book-appointment"}
						className={({ isActive }) =>
							cn(
								"text-base font-medium hover:text-primary",
								isActive && "text-primary",
							)
						}
					>
						{t("nav.button.book-appointment")}
					</NavLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavLink
						to={"/contact-us"}
						className={({ isActive }) =>
							cn(
								"text-base font-medium hover:text-primary",
								isActive && "text-primary",
							)
						}
					>
						{t("nav.button.contact-us")}
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
						"block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-content",
						className,
						isActive && "bg-primary text-primary-content",
					)}
					to={href || "#"}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-3 text-sm leading-snug">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
