import { useHoverAnimation } from "@hooks/useHoverAnimation";
import { useTranslation } from "react-i18next";

interface TestimonialProps {
	text: string;
	user: string;
	company: string;
	image: string;
}

export const TestimonialCard = ({
	text,
	user,
	company,
	image,
}: TestimonialProps) => {
	const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
	const { t } = useTranslation();

	return (
		<div
			className="flex h-full"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className={`
          bg-base-200 rounded-md p-6 text-md border border-neutral-800
          font-thin relative w-full transition-all duration-500 ease-out
          ${isHovered ? "transform -translate-y-2 shadow-2xl shadow-neutral-900/30" : ""}
        `}
				style={{
					transform: isHovered ? "scale(1.02)" : "scale(1)",
				}}
			>
				<div
					className={`
            absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10
            rounded-md opacity-0 transition-opacity duration-500
            ${isHovered ? "opacity-100" : ""}
          `}
				/>
				<p className="relative z-10 text-base-content">{t(text)}</p>
				<div className="flex mt-8 items-start relative z-10">
					<div
						className={`
              w-12 h-12 mr-6 rounded-full border border-neutral-300 overflow-hidden
              transition-transform duration-500
              ${isHovered ? "transform scale-110" : ""}
            `}
					>
						<img
							className="w-full h-full object-cover"
							src={image}
							alt={`${t(user)}'s profile`}
						/>
					</div>
					<div>
						<h6 className="font-medium">{t(user)}</h6>
						<span className="text-sm font-normal italic text-primary">
							{t(company)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
