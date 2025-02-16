import { AnimatePresence, m } from "motion/react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface AnimatedTextProps {
	texts: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts }) => {
	const [index, setIndex] = useState(0);
	const [delay, setDelay] = useState(3000);

	// biome-ignore lint/correctness/useExhaustiveDependencies: It is an infinite cycle and dependence is required.
	useEffect(() => {
		const timer = setTimeout(() => {
			setIndex((prevIndex) => (prevIndex + 1) % texts.length);
			setDelay(3000);
		}, delay);

		return () => clearTimeout(timer);
	}, [index, delay, texts.length]);

	const { t } = useTranslation();

	return (
		<div className="h-28 sm:h-36 md:h-44 flex items-center justify-center overflow-hidden w-64 sm:w-80 md:w-96 lg:w-[32rem]">
			<AnimatePresence mode="wait">
				<m.div
					key={index}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1.2 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="text-xl sm:text-3xl lg:text-4xl text-center p-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
				>
					{t(texts[index])}
				</m.div>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedText;
