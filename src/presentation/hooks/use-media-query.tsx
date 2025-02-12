import { useEffect, useState } from "react";

export function useMediaQuery(query?: string, innerWidth = 768) {
	const [isMobile, setIsMobile] = useState(window.innerWidth < innerWidth);
	// biome-ignore lint/correctness/useExhaustiveDependencies: Promp dependence is required.
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [query]);
	return isMobile;
}
