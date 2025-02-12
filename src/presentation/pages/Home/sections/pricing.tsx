import { CheckCircle2 } from "lucide-react";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { plans } from "../../Plans/PlansPage";

const Pricing = () => {
	const { ref, inView } = useInView({
		threshold: 0.2, // Los elementos se animan al estar un 20% en vista
		triggerOnce: true,
	});

	const { t } = useTranslation();

	const formatCOP = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	});

	return (
		<div className="container mt-8">
			<h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mb-16 tracking-wide">
				{t("homepage.pricing.title.title_start")}
				<span className="text-primary mx-3">
					{t("homepage.pricing.title.plan")}
				</span>
				{t("homepage.pricing.title.title_end")}
			</h2>

			{/* Grilla de opciones de precios */}
			<div
				className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4"
				ref={ref}
			>
				{plans.map((option, index) => (
					<m.div
						// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
						key={index}
						className="h-full relative"
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.5, delay: index * 0.1 }} // Animación secuencial
					>
						{/* Etiqueta para el plan más popular */}
						{option.plan === "homepage.pricing.plans.title_standard" && (
							<div className="absolute max-lg:hidden -top-4 left-0 right-0 text-center">
								<span className="bg-primary px-4 py-1 rounded-full text-sm font-medium">
									{t("homepage.pricing.plans.most_popular")}
								</span>
							</div>
						)}

						{/* Contenedor del plan */}
						<div
							className={`p-5 md:p-10 border rounded-xl h-full flex flex-col justify-between transition-all ease-in-out duration-500 hover:border-primary ${
								option.plan === "homepage.pricing.plans.title_standard"
									? "border-primary border-2"
									: "border-neutral-700"
							}`}
						>
							<div>
								<div className="mb-8">
									<p className="text-4xl">{t(option.plan)}</p>
									<p className="text-xl text-neutral-400 mt-2">
										{t(option.description)}
									</p>
								</div>
								<p className="mb-8">
									<span className="text-3xl mt-6 mr-2">
										{formatCOP.format(option.price)}
									</span>
									<span className="text-neutral-400 tracking-tight">
										/Monthly
									</span>
								</p>

								{/* Lista de características */}
								<ul className="space-y-6">
									{option.features.map((feature, index) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
										<li key={index} className="flex items-center">
											<CheckCircle2 className="shrink-0" />
											<span className="ml-2">{t(feature)}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Botón de acción */}
							<div
								className={`btn btn-primary tracking-tight text-xl font-light mt-8 ${
									option.plan === "homepage.pricing.plans.title_standard"
										? ""
										: "btn-outline"
								}`}
							>
								{t("homepage.pricing.card_button.button")}
							</div>
						</div>
					</m.div>
				))}
			</div>
		</div>
	);
};

export default Pricing;
