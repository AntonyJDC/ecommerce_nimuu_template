import { AlertCircle, Check, Info, Users } from "lucide-react";
import { m } from "motion/react";
import { useTranslation } from "react-i18next";

export const plans = [
	{
		plan: "homepage.pricing.plans.title_free",
		price: 0,
		description: "homepage.pricing.subtitle_card.free_card",
		additionalInfo: "",
		features: [
			"homepage.pricing.description_free.description_one",
			"homepage.pricing.description_free.description_two",
			"homepage.pricing.description_free.description_three",
			"homepage.pricing.description_free.description_four",
			"homepage.pricing.description_free.description_five",
			"homepage.pricing.description_free.description_six",
			"homepage.pricing.description_free.description_seven",
			"homepage.pricing.description_free.description_eight",
		],
	},
	{
		plan: "homepage.pricing.plans.title_standard",
		price: 30000,
		description: "homepage.pricing.subtitle_card.standard_card",
		additionalInfo: "Additional user $4,500/month",
		features: [
			"homepage.pricing.description_standard.description_one",
			"homepage.pricing.description_standard.description_two",
			"homepage.pricing.description_standard.description_three",
			"homepage.pricing.description_standard.description_four",
			"homepage.pricing.description_standard.description_five",
			"homepage.pricing.description_standard.description_six",
			"homepage.pricing.description_standard.description_seven",
			"homepage.pricing.description_standard.description_eight",
		],
		isPopular: true,
	},
	{
		plan: "homepage.pricing.plans.title_pro",
		price: 70000,
		description: "homepage.pricing.subtitle_card.pro_card",
		additionalInfo: "Additional user $4,500/month",
		features: [
			"homepage.pricing.description_pro.description_one",
			"homepage.pricing.description_pro.description_two",
			"homepage.pricing.description_pro.description_three",
			"homepage.pricing.description_pro.description_four",
			"homepage.pricing.description_pro.description_five",
			"homepage.pricing.description_pro.description_six",
			"homepage.pricing.description_pro.description_seven",
			"homepage.pricing.description_pro.description_eight",
			"homepage.pricing.description_pro.description_nine",
			"homepage.pricing.description_pro.description_ten",
		],
	},
	{
		plan: "homepage.pricing.plans.title_plus",
		price: 150000,
		description: "homepage.pricing.subtitle_card.plus_card",
		features: [
			"homepage.pricing.description_plus.description_one",
			"homepage.pricing.description_plus.description_two",
			"homepage.pricing.description_plus.description_three",
			"homepage.pricing.description_plus.description_four",
			"homepage.pricing.description_plus.description_five",
			"homepage.pricing.description_plus.description_six",
			"homepage.pricing.description_plus.description_seven",
			"homepage.pricing.description_plus.description_eight",
			"homepage.pricing.description_plus.description_nine",
		],
	},
];

export const PlansPage = () => {
	const { t } = useTranslation();

	return (
		<m.div
			className="container mt-16 mb-10"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className="text-center mb-12">
				<m.h2
					className="text-4xl font-bold mb-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					{t("homepage.pricing.plans_page.title")}
				</m.h2>
				<m.p
					className="text-xl text-base-content/65 mb-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					{t("homepage.pricing.plans_page.subtitle")}
				</m.p>
				<m.div
					className="inline-flex items-center gap-2 bg-primary-content/20 p-3 rounded-lg"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4 }}
				>
					<Info className="w-5 h-5 text-primary" />
					<span className="text-md text-primary brightness-105">
						{t("homepage.pricing.plans_page.unlimited_invoices")}
					</span>
				</m.div>
			</div>

			<m.div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0, scale: 0.95 },
					visible: {
						opacity: 1,
						scale: 1,
						transition: { staggerChildren: 0.1 },
					},
				}}
			>
				{plans.map((plan, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
					<PricingCard key={index} {...plan} t={t} />
				))}
			</m.div>

			<m.div
				className="mt-12 p-8 bg-base-200 rounded-lg text-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			>
				<div className="flex items-center justify-center gap-2 mb-4">
					<AlertCircle className="w-6 h-6 text-info" />
					<h3 className="text-2xl font-bold">
						{t("homepage.pricing.plans_page.partner_title")}
					</h3>
				</div>
				<p className="mb-6">
					{t("homepage.pricing.plans_page.partner_description")}
				</p>
				<button type="button" className="btn btn-primary text-base rounded-lg">
					{t("homepage.pricing.plans_page.contact_sales")}
				</button>
			</m.div>
		</m.div>
	);
};

interface PricingCardProps {
	plan: string;
	price: number;
	features: string[];
	isPopular?: boolean;
	description: string;
	additionalInfo?: string;
	t: (key: string) => string;
}

const PricingCard = ({
	plan,
	price,
	features,
	isPopular,
	description,
	additionalInfo,
	t,
}: PricingCardProps) => {
	const formatCOP = new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		minimumFractionDigits: 0,
	});

	return (
		<m.div
			className={`p-6 group rounded-lg border ${
				isPopular ? "border-primary shadow-lg" : ""
			} flex flex-col h-full transition-colors duration-500 hover:border-primary `}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			{isPopular && (
				<span className="px-3 py-1 text-sm text-white font-medium shadow-sm shadow-primary bg-primary rounded-full self-start mb-4">
					{t("homepage.pricing.plans.most_popular")}
				</span>
			)}
			<h3 className="text-2xl font-bold mb-2">{t(plan)}</h3>
			<p className="text-base-content brightness-75 mb-4">{t(description)}</p>
			<div className="">
				<span className="text-4xl font-bold">{formatCOP.format(price)}</span>
				{price > 0 && <span className="text-neutral-400">/month</span>}
				{additionalInfo && (
					<div className="mt-3 flex items-center gap-2 text-sm text-neutral-400">
						<Users className="w-4 h-4" />
						<span>{t(additionalInfo)}</span>
					</div>
				)}
			</div>

			<ul className="mt-3 space-y-3 mb-5 flex-grow">
				{features.map((feature, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
					<li key={index} className="flex items-start gap-2">
						<Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<span>{t(feature)}</span>
					</li>
				))}
			</ul>
			<button
				type="button"
				className={`w-full btn rounded-lg text-base shadow-md shadow-base-content/25 group-hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/70 hover:border-primary ${
					isPopular ? "btn-primary shadow-primary/70" : ""
				}`}
			>
				{t("homepage.pricing.card_button.button")}
			</button>
		</m.div>
	);
};
