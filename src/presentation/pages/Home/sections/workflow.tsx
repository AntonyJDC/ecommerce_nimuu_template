import service from "@assets/service.webp";
import { checklistItems } from "@constants/index";
import { CheckCircle2 } from "lucide-react";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const Workflow = () => {
	const { ref, inView } = useInView({
		threshold: 0.2, // Animar cuando el 20% del componente esté en vista
		triggerOnce: true, // Solo animar una vez
	});

	const { t } = useTranslation();

	return (
		<div className="container">
			<h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
				{t("homepage.workflow.workflow_title")}
				<span className="ml-3 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
					{t("homepage.workflow.workflow_subtitle")}
				</span>
			</h2>

			<div className="flex flex-wrap justify-center mt-2" ref={ref}>
				{/* Imagen con animación */}
				<m.div
					className="p-2 w-full py-12 lg:w-1/2 flex justify-center"
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.8 }}
				>
					<img
						className="rounded-xl object-cover h-auto"
						src={service}
						alt="Electronic invoicing service"
					/>
				</m.div>

				{/* Lista de items con animación */}
				<m.div
					className="pt-12 w-full lg:w-1/2"
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }} // Delay para que aparezca después de la imagen
				>
					{checklistItems.map((item, index) => (
						<m.div
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
							key={index}
							className="flex items-center sm:flex-row text-center sm:text-left flex-col mb-12"
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.6, delay: index * 0.1 }} // Delay progresivo para cada item
						>
							<div className="text-primary mx-6 bg-primary/20 h-10 w-10 p-2 justify-center rounded-full">
								<CheckCircle2 />
							</div>
							<div>
								<h5 className="mt-1 mb-2 text-xl">{t(item.title)}</h5>
								<p className="text-md text-neutral-500">
									{t(item.description)}
								</p>
							</div>
						</m.div>
					))}
				</m.div>
			</div>
		</div>
	);
};

export default Workflow;
