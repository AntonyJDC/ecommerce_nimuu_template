import { FC, ReactNode } from "react";

interface TabProps {
	children: ReactNode;
	className?: string;
}

export const Tabs: FC<TabProps> = ({ children, className = "" }) => {
	return (
		<div
			className={` border border-primary z-10 rounded-full max-w-[90%] ${className}`}
		>
			{children}
		</div>
	);
};
