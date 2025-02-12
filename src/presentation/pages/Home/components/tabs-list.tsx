import {
	ScrollArea,
	ScrollBar,
} from "@/presentation/components/ui/scroll-area";
import { m } from "motion/react";
import { FC, ReactNode, Ref } from "react";

interface TabsListProps {
	children: ReactNode;
	className?: string;
	viewportRef?: Ref<HTMLDivElement> | undefined;
}

export const TabsList: FC<TabsListProps> = ({
	children,
	className = "",
	viewportRef,
}) => {
	return (
		<ScrollArea
			type="hover"
			className="grid w-full grid-cols-1 grid-flow-col rounded-full overflow-x-auto"
			viewportRef={viewportRef}
		>
			<m.div
				className="flex items-center"
				animate={{ paddingBottom: "0rem" }}
				exit={{
					paddingBottom: "0rem",
					transition: {
						duration: 0.4,
						ease: "easeInOut",
					},
				}}
				transition={{
					duration: 0.4,
					ease: "easeInOut",
				}}
			>
				<div
					className={`flex flex-row h-14 rounded-full p-2 justify-between items-center ${className}`}
				>
					{children}
				</div>
			</m.div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
