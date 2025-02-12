import AnimatedText from "@/presentation/components/animated-text";
import { features, textTwo } from "@constants/index";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const FeatureSection = () => {
	// Configuración de animación para los contenedores
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3, // Tiempo de cascada entre elementos hijos
			},
		},
	};

	// Configuración de animación para cada elemento (solo opacidad)
	const itemVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.5 } },
	};

	// Usamos useInView para detectar si la sección completa está en la vista
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	const { t } = useTranslation();

	return (
		<section
			className="container py-10"
			aria-label="Características y servicios"
		>
			<div className="text-center">
				<h2 className="text-2xl sm:text-4xl lg:text-5xl mt-10 lg:mt-14 tracking-wide">
					<span>{t("homepage.featuresection.title")}</span>
					<div
						className="flex text-center justify-center w-full"
						aria-live="polite"
					>
						<AnimatedText texts={textTwo} />
					</div>
				</h2>
			</div>

			{/* Contenedor de las características con animación en cascada */}
			<m.ul
				ref={ref}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 lg:mt-5"
				aria-label="Lista de características"
				variants={containerVariants} // Variantes del contenedor
				initial="hidden"
				animate={inView ? "visible" : "hidden"} // Activa las animaciones cuando está en vista
			>
				{features.map((feature, index) => (
					<m.li
						//biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
						key={index}
						className="transform transition-transform duration-300"
						variants={itemVariants} // Variantes de cada ítem (solo opacidad)
					>
						<div className="flex flex-col h-full">
							<div
								className="flex items-center mb-4 group"
								aria-label={t(feature.text)}
							>
								<div
									className="flex h-10 w-10 p-2 text-primary-content justify-center items-center rounded-full mr-4 transition-colors duration-300 group-hover:text-primary"
									aria-hidden="true"
								>
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
									{t(feature.text)}
								</h3>
							</div>
							<ul
								className="list-disc pl-6 text-base-content space-y-3"
								aria-label={`Detalles de ${feature.text}`}
							>
								{feature.description.map((item, itemIndex) => (
									<li
										//biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
										key={itemIndex}
										className="text-base transition-colors duration-300"
									>
										{t(item)}
									</li>
								))}
							</ul>
						</div>
					</m.li>
				))}
			</m.ul>
		</section>
	);
};

FeatureSection.displayName = "FeatureSection";

export default FeatureSection;
