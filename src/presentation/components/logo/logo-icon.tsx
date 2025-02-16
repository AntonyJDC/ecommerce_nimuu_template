import { FC } from "react";

interface Props {
	colorLogo?: string;
	colorTitle?: string;
	className?: string;
}
const LogoIcon: FC<Props> = ({ className, ...props }: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="139.7"
			height="139.7"
			className={className}
			{...props}
			viewBox="0 0 120.43 138.07"
		>
			<title>Logo</title>
			<defs />
			<g id="element-id-54425">
				<path
					fill="currentColor"
					d="M119.52,75.73V19.5c0-10.77-8.73-19.5-19.5-19.5h0c-10.77,0-19.5,8.73-19.5,19.5v48.82c3.83-1.07,7.8-1.65,11.9-1.65,9.9,0,19.17,3.31,27.1,9.07Z"
				/>
				<path
					fill="currentColor"
					d="M38.99,67.95V19.5C38.99,8.73,30.26,0,19.5,0h0C8.73,0,0,8.73,0,19.5v57.25c8.22-6.37,17.96-10.08,28.43-10.08,3.62,0,7.15.44,10.56,1.28Z"
				/>
				<path
					fill="currentColor"
					d="M113.63,107.53c-25.19,39.63-81.71,39.52-105.37.92-6.05-13.02.29-19.8,7.06-23.41h0c6.77-3.61,14.13-2.83,17.98,1.18,17.84,13.79,31.84,15.99,49.69,3.16,5.67-5.38,14.14-11.39,22.52-8.52h0c9.84,4.33,12.38,17.6,8.12,26.67Z"
				/>
			</g>
		</svg>
	);
};

LogoIcon.displayName = "LogoIcon";

export { LogoIcon };
