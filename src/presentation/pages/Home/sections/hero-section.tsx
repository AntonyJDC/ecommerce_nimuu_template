import { m } from "motion/react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const HeroSection = memo(() => {
	const navigate = useNavigate();

	const containerVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.2,
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	const buttonVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
		hover: {
			scale: 1.02,
			transition: {
				duration: 0.2,
			},
		},
		tap: {
			scale: 0.98,
		},
	};

	const { t } = useTranslation();

	return (
		<m.section
			className="container text-center py-12"
			aria-label="Sección principal"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<div className="flex flex-col items-center w-full">
				<m.div
					className="w-full max-sm:text-4xl text-5xl text-balance lg:text-[4.25rem] leading-[1.3] font-bold pb-6"
					variants={itemVariants}
				>
					{t("homepage.herosection.title")}
				</m.div>

				<m.div
					className="max-w-3xl pb-6 text-xl text-balance font-normal"
					variants={itemVariants}
				>
					{t("homepage.herosection.subtitle")}
				</m.div>

				<m.div
					className="max-w-3xl pb-6 text-sm text-balance font-medium"
					variants={itemVariants}
				>
					{t("homepage.herosection.cta.paragraph")}
				</m.div>

				<m.div className="w-full flex flex-col" variants={itemVariants}>
					<div className="flex flex-col sm:flex-row items-center gap-3 w-full place-content-center">
						<m.a
							href="https://app.nimutech.com/auth/login"
							className="h-14 inline-block py-2 px-3 max-sm:w-full sm:min-w-60 text-lg content-center bg-gradient-to-r from-primary to-orange-800 rounded-md whitespace-nowrap text-primary-content"
							variants={buttonVariants}
							whileHover="hover"
							whileTap="tap"
						>
							{t("homepage.herosection.cta.start_free")}
						</m.a>

						<m.button
							onClick={() => navigate("/plans")}
							className="h-14 py-2 px-3 text-lg max-sm:w-full sm:min-w-60 border border-primary rounded-md whitespace-nowrap"
							variants={buttonVariants}
							whileHover="hover"
							whileTap="tap"
						>
							{t("homepage.herosection.cta.view_plans")}
						</m.button>
					</div>

					<m.div className="divider" variants={itemVariants}>
						{t("homepage.herosection.others.or")}
					</m.div>

					<m.div
						className="flex place-content-center text-sm font-medium gap-2"
						variants={itemVariants}
					>
						<m.a
							href="https://app.nimutech.com/auth/register"
							className="link link-hover link-primary"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{t("homepage.herosection.cta.sign_up")}
						</m.a>
						<div>{t("homepage.herosection.cta.no_credit_card")}</div>
					</m.div>
				</m.div>
			</div>
		</m.section>
	);
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
