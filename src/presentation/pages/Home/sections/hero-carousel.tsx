import { useGlobalStore } from "@/store/global/global.store";
import { AnimatePresence, m } from "motion/react";
import CarouselWithAutoplay from "../components/carousel-with-autoplay";
import TabContent from "../components/tabs-content";

const HeroCarousel = () => {
	const activeTab = useGlobalStore((state) => state.activeTab);

	const renderTabContent = () => {
		switch (activeTab) {
			case 1:
				return (
					<TabContent>
						<video
							playsInline
							muted
							autoPlay
							loop
							className="w-full h-full object-cover object-left"
							src="https://github.githubassets.com/assets/code-1_desktop-7ab52aea3358.mp4"
							poster="https://github.githubassets.com/assets/code-1_poster_desktop-b2dc87b71fdc.webp"
						/>
					</TabContent>
				);
			case 2:
				return (
					<TabContent>
						<CarouselWithAutoplay />
					</TabContent>
				);

			case 3:
				return (
					<TabContent>
						<div className="relative w-full h-full object-cover object-left">
							<img
								alt="A pull request discussion displaying a series of comments and tasks related to improving alien character controls, including updates from multiple team members."
								className="hidden md:flex w-full h-full object-cover object-left"
								src="https://github.githubassets.com/assets/collaborate-1_desktop-89f1b7f48678.webp"
							/>
							<img
								alt="A pull request discussion displaying a series of comments and tasks related to improving alien character controls, including updates from multiple team members."
								src="https://github.githubassets.com/assets/collaborate-1_mobile-d33b39ce5929.webp"
							/>
							<img
								alt="A code review comment displaying highlighted code and the code diff for a suggested change."
								className="hidden md:flex absolute top-0 left-0 w-full h-full object-cover"
								src="https://github.githubassets.com/assets/collaborate-2_desktop-0d82fbc820fa.webp"
							/>
						</div>
					</TabContent>
				);
			case 4:
				return (
					<TabContent>
						<div className="relative max-md:hidden w-full h-full">
							<img
								alt="GitHub Actions workflow titled ‘matrix-build-deploy.yml’. The Build stage has completed successfully in 1 minute and 42 seconds."
								src="https://github.githubassets.com/assets/automate-1_desktop-9c560cd27568.webp"
							/>
							<img
								className="absolute top-0 left-0"
								alt="The Test stage includes builds for Linux, macOS, and Windows, all of which have also completed successfully with their respective durations."
								src="https://github.githubassets.com/assets/automate-2_desktop-d43761220fdd.webp"
							/>
							<img
								className="absolute top-0 left-0"
								alt="The final stage, Publish, shows that the publishing steps for Linux, macOS, and Windows are pending and waiting for approval."
								src="https://github.githubassets.com/assets/automate-3_desktop-02c6aa03fb12.webp"
							/>
							<img
								alt="GitHub Actions workflow titled ‘matrix-build-deploy.yml’. The Build stage has completed successfully in 1 minute and 42 seconds."
								className="absolute top-0 left-0"
								src="https://github.githubassets.com/assets/automate-0_desktop-aa55e0ab7deb.webp"
							/>
						</div>
						<div className=" md:hidden relative w-full h-full">
							<img
								alt="GitHub Actions workflow titled ‘matrix-build-deploy.yml’. The Build stage has completed successfully in 1 minute and 42 seconds."
								className="absolute top-0 left-0"
								src="https://github.githubassets.com/assets/automate-1_mobile-5e52bfd63e97.webp"
							/>
							<img
								alt="The Test stage includes builds for Linux, macOS, and Windows, all of which have also completed successfully with their respective durations."
								className="absolute top-0 left-0"
								src="https://github.githubassets.com/assets/automate-2_mobile-e341b0a175fd.webp"
							/>
							<img
								alt="The final stage, Publish, shows that the publishing steps for Linux, macOS, and Windows are pending and waiting for approval."
								src="https://github.githubassets.com/assets/automate-3_mobile-11b5a6b1b2c0.webp"
							/>
							<img
								alt=""
								className="absolute -z-10 top-0 left-0"
								src="https://github.githubassets.com/assets/automate-0_mobile-269d1548c880.webp"
								aria-hidden="true"
							/>
						</div>
					</TabContent>
				);
			case 5:
				return (
					<TabContent>
						<div className="relative">
							<img
								alt="Trend graph showing a decline in critical vulnerabilities over time."
								className=" md:hidden"
								src="https://github.githubassets.com/assets/secure-1_mobile-e1824c021bd1.webp"
							/>
							<img
								alt="Trend graph showing a decline in critical vulnerabilities over time."
								className="max-md:hidden"
								src="https://github.githubassets.com/assets/secure-1_desktop-5a462aa7c6a6.webp"
							/>
							<img
								className="absolute top-0 left-0 max-md:hidden"
								alt="Copilot Autofix identifies vulnerable code and provides an explanation, together with a secure code suggestion to remediate the vulnerability."
								src="https://github.githubassets.com/assets/secure-2_desktop-1bf34d7de557.webp"
							/>
						</div>
					</TabContent>
				);
			default:
				return null;
		}
	};
	return (
		<>
			<div className=" max-md:pl-6 w-full md:container xl:max-w-screen-lg 2xl:max-w-screen-xl">
				<div className="relative  shadow-xl shadow-primary/30 bg-gradient-to-b from-primary/10 to-primary/30  rounded-tl-2xl rounded-bl-2xl md:rounded-2xl pl-3 pt-3 md:p-5 backdrop-blur-2xl">
					<AnimatePresence mode="wait">
						<m.div
							key={activeTab}
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 50, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="w-full aspect-[600/650] md:aspect-[1206/684] rounded-tl-xl rounded-bl-xl md:rounded-xl overflow-hidden"
						>
							{renderTabContent()}
						</m.div>
					</AnimatePresence>
				</div>
			</div>
		</>
	);
};

export default HeroCarousel;
