import { m } from "motion/react";
import { FC, ReactNode, RefObject } from "react";

interface TabRefs {
	[key: number]: HTMLDivElement | null;
}

interface TabsTriggerProps {
	children: ReactNode;
	className?: string;
	tabRefs?: RefObject<TabRefs>;
	handleTabClick?: (key: number) => void;
	activeTab?: number | null;
	tab: {
		id: number;
		name: string;
	};
}

export const TabsTrigger: FC<TabsTriggerProps> = ({
	children,
	className = "",
	activeTab,
	tab,
	tabRefs = { current: {} },
	handleTabClick = () => {
		return;
	},
}) => {
	const setRef = (el: HTMLDivElement | null) => {
		if (tabRefs && el) {
			tabRefs.current[tab.id] = el;
		}
	};
	return (
		<m.div
			key={tab.id}
			ref={setRef}
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.9, x: 50 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className={`relative flex items-center h-full mr-3 ${className}`}
		>
			<m.button
				onClick={() => handleTabClick(tab.id)}
				className={`${
					activeTab === tab.id
						? "text-primary"
						: "hover:text-primary text-base-content btn-ghost"
				} flex items-center place-content-center h-full rounded-3xl widest text-base font-normal min-w-28 md:min-w-28 lg:min-w-32 py-2 px-4`}
				style={{ WebkitTapHighlightColor: "transparent" }}
			>
				{activeTab === tab.id && (
					<m.span
						layoutId="bubble"
						className="absolute shadow-md shadow-primary/60 rounded-full bg-primary/10 ring-1 ring-primary/75 inset-0 -z-10 py-2 px-4"
						transition={{
							type: "spring",
							bounce: 0.2,
							duration: 0.6,
						}}
					/>
				)}
				<div
					className={`truncate mr-1 ${activeTab === tab.id ? "transition-all" : ""}`}
				>
					{children}
				</div>
			</m.button>
		</m.div>
	);
};
