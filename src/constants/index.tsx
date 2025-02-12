import {
	BarChart2,
	CreditCard,
	FileText,
	Globe,
	Package,
	ShoppingCart,
} from "lucide-react";

import type { subjectOption } from "@/core/types";
import {
	user1,
	user2,
	user3,
	user4,
	user5,
	user6,
} from "@assets/profile-pictures";

// NAVBAR ITEMS
export const navItems = [
	{ label: "Inicio", href: "#" },
	{ label: "Productos y Funcionalidades", href: "#" },
	{ label: "Planes y precios", href: "#" },
	{ label: "Por que Nimuu", href: "#" },
	{ label: "Blog", href: "#" },
];

// Features icons-text
export const features = [
	{
		icon: <FileText />,
		text: "homepage.featuresection.features.electronic_billing.title",
		description: [
			"homepage.featuresection.features.electronic_billing.description_one",
			"homepage.featuresection.features.electronic_billing.description_two",
			"homepage.featuresection.features.electronic_billing.description_three",
			"homepage.featuresection.features.electronic_billing.description_four",
		],
	},
	{
		icon: <Package />,
		text: "homepage.featuresection.features.inventory_management.title",
		description: [
			"homepage.featuresection.features.inventory_management.description_one",
			"homepage.featuresection.features.inventory_management.description_two",
			"homepage.featuresection.features.inventory_management.description_three",
		],
	},
	{
		icon: <ShoppingCart />,
		text: "homepage.featuresection.features.integrated_pos.title",
		description: [
			"homepage.featuresection.features.integrated_pos.description_one",
			"homepage.featuresection.features.integrated_pos.description_two",
			"homepage.featuresection.features.integrated_pos.description_three",
		],
	},
	{
		icon: <BarChart2 />,
		text: "homepage.featuresection.features.financial_reports.title",
		description: [
			"homepage.featuresection.features.financial_reports.description_one",
			"homepage.featuresection.features.financial_reports.description_two",
			"homepage.featuresection.features.financial_reports.description_three",
		],
	},
	{
		icon: <Globe />,
		text: "homepage.featuresection.features.ecommerce_marketing.title",
		description: [
			"homepage.featuresection.features.ecommerce_marketing.description_one",
			"homepage.featuresection.features.ecommerce_marketing.description_two",
			"homepage.featuresection.features.ecommerce_marketing.description_three",
		],
	},
	{
		icon: <CreditCard />,
		text: "homepage.featuresection.features.payment_gateway.title",
		description: [
			"homepage.featuresection.features.payment_gateway.description_one",
			"homepage.featuresection.features.payment_gateway.description_two",
			"homepage.featuresection.features.payment_gateway.description_three",
		],
	},
];

// CheeckListItems

export const checklistItems = [
	{
		title: "homepage.workflow.simplified_sales.title",
		description: "homepage.workflow.simplified_sales.paragraph",
	},
	{
		title: "homepage.workflow.monitor_sales.title",
		description: "homepage.workflow.monitor_sales.paragraph",
	},
	{
		title: "homepage.workflow.automate_streamline.title",
		description: "homepage.workflow.automate_streamline.paragraph",
	},
	{
		title: "homepage.workflow.share_reports.title",
		description: "homepage.workflow.share_reports.paragraph",
	},
];

//Animated Texts
export const textOne = [
	"Potencia tu negocio",
	"Revoluciona tu Facturación",
	"Simplifica tu Operativa",
	"Digitaliza tu Contabilidad",
	"Automatiza tus Procesos",
];

export const textTwo = [
	"homepage.featuresection.animated_text.text_one",
	"homepage.featuresection.animated_text.text_two",
	"homepage.featuresection.animated_text.text_three",
	"homepage.featuresection.animated_text.text_four",
	"homepage.featuresection.animated_text.text_five",
];

// Testimonials
export const testimonials = [
	{
		user: "testimonials.users.user1",
		company: "testimonials.companies.company1",
		image: user1,
		text: "testimonials.texts.text1",
	},
	{
		user: "testimonials.users.user2",
		company: "testimonials.companies.company2",
		image: user2,
		text: "testimonials.texts.text2",
	},
	{
		user: "testimonials.users.user3",
		company: "testimonials.companies.company3",
		image: user3,
		text: "testimonials.texts.text3",
	},
	{
		user: "testimonials.users.user4",
		company: "testimonials.companies.company4",
		image: user4,
		text: "testimonials.texts.text4",
	},
	{
		user: "testimonials.users.user5",
		company: "testimonials.companies.company5",
		image: user5,
		text: "testimonials.texts.text5",
	},
	{
		user: "testimonials.users.user6",
		company: "testimonials.companies.company6",
		image: user6,
		text: "testimonials.texts.text6",
	},
];
export const resourcesLinks = [
	{ href: "#", text: "footer.resources.accounting_software" },
	{ href: "#", text: "footer.resources.accounting_solutions" },
	{ href: "#", text: "footer.resources.electronic_invoicing" },
	{ href: "#", text: "footer.resources.electronic_payroll" },
];

export const platformLinks = [
	{ href: "#", text: "footer.platform.contact_us" },
	{ href: "#", text: "footer.platform.community" },
	{ href: "#", text: "footer.platform.solution_status" },
	{ href: "#", text: "footer.platform.academy" },
	{ href: "#", text: "footer.platform.release_notes" },
];

export const communityLinks = [
	{ href: "#", text: "footer.community.blog" },
	{ href: "#", text: "footer.community.entrepreneur_school" },
	{ href: "#", text: "footer.community.stay_up_to_date" },
	{ href: "#", text: "footer.community.help_center" },
	{ href: "#", text: "footer.community.webinars" },
];

export const aboutLinks = [
	{ href: "#", text: "footer.about.about_us" },
	{ href: "#", text: "footer.about.press_center" },
	{ href: "#", text: "footer.about.work_with_us" },
	{ href: "#", text: "footer.about.foundations" },
	{ href: "#", text: "footer.about.terms_and_conditions" },
];

// Select options

export const selectOptions: subjectOption[] = [
	{
		label: "form.select_options.general_inquiry",
		value: "GENERAL_INQUIRY",
		isActive: true,
	},
	{
		label: "form.select_options.technical_support",
		value: "TECHNICAL_SUPPORT",
		isActive: true,
	},
	{
		label: "form.select_options.quote_request",
		value: "QUOTE_REQUEST",
		isActive: true,
	},
	{
		label: "form.select_options.partnership_inquiry",
		value: "PARTNERSHIP_INQUIRY",
		isActive: true,
	},
	{
		label: "form.select_options.suggestions",
		value: "SUGGESTIONS",
		isActive: true,
	},
	{
		label: "form.select_options.complaints",
		value: "COMPLAINTS",
		isActive: true,
	},
	{
		label: "form.select_options.others",
		value: "OTHERS",
		isActive: true,
	},
];
