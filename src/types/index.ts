export interface AnimatedPhrase {
	primary: string;
	secondary?: string;
}

export interface AnimatedTextProps {
	phrases: AnimatedPhrase[];
	className?: string;
	primaryClassName?: string;
	secondaryClassName?: string;
	delay?: number;
}
