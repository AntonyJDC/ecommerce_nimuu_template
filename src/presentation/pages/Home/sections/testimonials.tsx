import { testimonials } from "@constants/index";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { TestimonialCard } from "../components/testimonial-card";

const Testimonials = () => {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	const { t } = useTranslation();

	return (
		<div className="container tracking-wide">
			<h2 className="text-3xl sm:text-5xl lg:text-3xl text-center my-10 lg:my-20">
				{t("testimonials.title.part1")}
				<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
					{t("testimonials.title.highlight")}
				</span>
				{t("testimonials.title.part2")}
			</h2>

			{/* Grilla de testimonios */}
			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				ref={ref} // Referencia para la detección de visibilidad
			>
				{testimonials.map((testimonial, index) => (
					<m.div
						// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
						key={index}
						initial={{ opacity: 0, y: 30 }} // Inicialmente fuera de pantalla y transparente
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} // Animación al entrar en vista
						transition={{ duration: 0.5, delay: index * 0.1 }} // Retardo progresivo entre elementos
					>
						<TestimonialCard {...testimonial} />
					</m.div>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
