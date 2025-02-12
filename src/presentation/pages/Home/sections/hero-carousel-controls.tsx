import { useGlobalStore } from "@/store/global/global.store";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "../components/tabs";
import { TabsList } from "../components/tabs-list";
import { TabsTrigger } from "../components/tabs-trigger";

const HeroCarouselControls = () => {
	const scrollAreaViewportRef = useRef<HTMLDivElement | null>(null);
	const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const activeTab = useGlobalStore((state) => state.activeTab);
	const setActiveTab = useGlobalStore((state) => state.setActiveTab);
	const tabs = useGlobalStore((state) => state.tabs);

	const handleTabClick = (tabId: number) => {
		setActiveTab(tabId);
		centralizeTab(tabId);
	};

	const { t } = useTranslation();

	const centralizeTab = (tabId: number) => {
		const viewportRef = scrollAreaViewportRef.current;
		const tabElement = tabRefs.current[tabId];

		if (viewportRef && tabElement) {
			setTimeout(() => {
				const tabRect = tabElement.getBoundingClientRect();
				const scrollAreaRect = viewportRef.getBoundingClientRect();

				const offset =
					tabRect.left -
					scrollAreaRect.left +
					tabRect.width / 2 -
					scrollAreaRect.width / 2;

				viewportRef.scrollBy({
					left: offset,
					behavior: "smooth",
				});
			}, 100);
		}
	};

	return (
		<div className=" flex w-full items-center place-content-center pt-8">
			<Tabs>
				<TabsList viewportRef={scrollAreaViewportRef}>
					{tabs.map((tab) => {
						return (
							<TabsTrigger
								key={tab.id}
								tab={tab}
								handleTabClick={handleTabClick}
								tabRefs={tabRefs}
								activeTab={activeTab}
							>
								{t(tab.name)}
							</TabsTrigger>
						);
					})}
				</TabsList>
			</Tabs>
		</div>
	);
};

export default HeroCarouselControls;
