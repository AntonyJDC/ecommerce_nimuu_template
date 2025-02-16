import { Pet } from "@/presentation/components/logo";
import { Circle, Clock, Phone } from "lucide-react";
import { m } from "motion/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Form from "../Home/components/form";
import { AnimatedText } from "./sections/text-animated";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
};

const fadeInRight = {
	initial: { opacity: 0, x: -30 },
	animate: { opacity: 1, x: 0 },
};

export const ContactPage = () => {
	const { t } = useTranslation();
	return (
		<>
			<Helmet>
				<title>Nimuu | Contact</title>
				<meta
					name="description"
					content="Nimuu is an easy-to-use sales and electronic invoicing system, ideal for points of sale. Improve your business management with our POS solutions."
				/>
				<meta
					name="keywords"
					content="contact, Nimuu contact, POS system, business management, sales software, Nimuu, Nimuu, Nimuu Colombia, Colombia"
				/>
			</Helmet>

			<div className="relative container flex flex-col lg:flex-row items-center justify-center mt-8 lg:justify-between px-4 sm:px-6 lg:px-12 pb-6 gap-6">
				<m.div
					className="flex-1 w-full lg:w-1/2 flex flex-col place-items-center p-6 text-center"
					initial="initial"
					animate="animate"
					variants={fadeInUp}
					transition={{ duration: 0.6 }}
				>
					<ul className="container space-y-6 w-full mb-6 sm:mb-6 p-4 sm:p-5">
						<li className="place-items-center text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
							<AnimatedText text={t("contact.need_help")} />
						</li>
						<li className="text-lg sm:text-xl lg:text-2xl text-primary--primary-focus">
							{t("contact.reach_out")}
						</li>
					</ul>
					<m.div
						className=" bottom-0 right-5 md:bottom-10 md:-right-4"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.5 }}
					>
						<Pet className="text-primary md:w-60 md:h-60 lg:w-[20rem] lg:h-[20rem] xl:w-[21rem] xl:h-[21rem] 2xl:h-80 2xl:w-80 	" />
					</m.div>

					<ul className="container space-y-4 w-full mt-10 lg:mr-5 text-left">
						<li className="flex place-items-center space-x-4 text-primary--primary-focus">
							<Clock className="w-5 h-5 text-primary flex-shrink-0" />
							<span className="text-sm sm:text-base lg:text-lg">
								{t("contact.complete_form")}
							</span>
						</li>
						<li className="flex items-center space-x-4 text-primary--primary-focus">
							<Phone className="w-5 h-5 text-primary flex-shrink-0" />
							<span className="text-sm sm:text-base lg:text-lg">
								{t("contact.call_us")}
							</span>
						</li>
					</ul>
				</m.div>

				<m.div
					className="divider divider-vertical lg:divider-horizontal"
					initial="initial"
					animate="animate"
					variants={fadeInUp}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					<Circle />
				</m.div>

				<m.div
					className="flex-1 w-full lg:w-1/2 flex flex-col justify-center items-center p-6 text-center"
					initial="initial"
					animate="animate"
					variants={fadeInRight}
					transition={{ duration: 0.6 }}
				>
					<div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
						{t("contact.leave_question")}
					</div>
					<Form />
				</m.div>
			</div>
		</>
	);
};
