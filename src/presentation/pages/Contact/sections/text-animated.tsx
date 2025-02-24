import { m } from "motion/react";
import React from "react";

interface AnimatedTextProps {
	text: string;
	className?: string;
	delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
	text,
	className,
	delay = 0,
}) => {
	// Divide el texto en caracteres individuales
	const letters = Array.from(text);

	return (
		<div className={`flex shrink-0 grow-0 ${className}`}>
			{letters.map((letter, index) => (
				<m.span
					//biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
					key={index}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.5,
						delay: delay + index * 0.05, // Incrementa el retraso para cada letra
						ease: [0.43, 0.13, 0.23, 0.96],
					}}
					className=""
				>
					{letter === " " ? "\u00A0" : letter}{" "}
					{/* Espacio no rompible para los espacios */}
				</m.span>
			))}
		</div>
	);
};