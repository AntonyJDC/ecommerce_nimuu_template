import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFlagEmoji(iso2: string) {
	return iso2.toUpperCase().replace(
		/./g,
		(char) => String.fromCodePoint(127397 + char.charCodeAt(0)), // Asegurarse de pasar el índice 0
	);
}
