import { Pet } from "@/presentation/components/logo";
import Form from "@pages/Home/components/form";
import { Mail, MapPin, Phone } from "lucide-react";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const FormComponent = () => {
	// Detectar cuando la sección está en vista
	const { ref, inView } = useInView({
		threshold: 0.1, // Detectar cuando el 10% del componente esté en vista
		triggerOnce: true,
	});
	const { t } = useTranslation();

	return (
		<div className="container mt-16 mb-10">
			<m.div
				className="flex flex-col w-full md:flex-row gap-8 rounded-2xl bg-base-100 overflow-hidden border border-base"
				ref={ref}
				initial={{ opacity: 0, y: 50 }} // Inicialmente desplazado hacia abajo y transparente
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animación al entrar en vista
				transition={{ duration: 0.6 }} // Duración de la animación
			>
				{/* Sección de contacto */}
				<div className="relative w-full md:w-1/2 p-4 md:p-6 lg:p-12 flex flex-col justify-between">
					<m.div
						className="text-center mt-5 md:mt-0"
						initial={{ opacity: 0, y: 30 }}
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
							{t("form.need_help")}
						</h2>
						<p className="text-primary--primary-focus text-lg mb-8">
							{t("form.contact_us")}
						</p>
						<div className="space-y-6">
							<div className="flex items-center space-x-4 text-primary--primary-focus">
								<Phone className="w-5 h-5 text-primary" />
								<span>+57 456 7890</span>
							</div>
							<div className="flex items-center space-x-4 text-primary--primary-focus">
								<Mail className="w-5 h-5 text-primary" />
								<span>contact@nimutech.com</span>
							</div>
							<div className="flex items-center space-x-4 text-primary--primary-focus">
								<MapPin className="w-5 h-5 text-primary" />
								<span>Main Avenue 123, City</span>
							</div>
						</div>
					</m.div>

					{/* Icono en la parte inferior */}
					<m.div
						className=" absolute bottom-0 right-5 md:bottom-10 md:-right-4"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={
							inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
						}
						transition={{ duration: 0.4, delay: 0.5 }}
					>
						<Pet className="text-primary md:w-60 md:h-60 lg:w-[20rem] lg:h-[20rem] xl:w-[21rem] xl:h-[21rem] 2xl:h-96 2xl:w-96	" />
					</m.div>
				</div>

				{/* Sección del formulario */}
				<m.div
					className="w-full md:w-1/2 p-4 lg:p-12"
					initial={{ opacity: 0, x: 50 }}
					animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div>
						<h3 className="text-2xl font-semibold text-primary mb-2">
							{t("form.send_message")}
						</h3>
						<p className="text-base">{t("form.fill_form")}</p>
					</div>
					<Form />
				</m.div>
			</m.div>
		</div>
	);
};

export default FormComponent;
