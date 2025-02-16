import { Helmet } from "react-helmet-async";
import {
	FeatureSection,
	FormComponent,
	HeroCarousel,
	HeroCarouselControls,
	HeroSection,
	Pricing,
	Testimonials,
	Workflow,
} from "./sections";

export const HomePage = () => {
	console.log("Render HomePage");
	return (
		<>
			<Helmet>
				<title>Nimuu | Sistema de Ventas y Facturación Electrónica</title>
				<meta
					name="description"
					content="Nimuu es un sistema de ventas y facturación electrónica fácil de usar, ideal para puntos de venta. Mejora la gestión de tu negocio con nuestras soluciones POS."
				/>
				<meta
					name="keywords"
					content="ventas, facturación electrónica, sistema POS, gestión de negocio, software de ventas, Nimuu, Nimuu, Nimuu Colombia, colombia"
				/>
			</Helmet>
			<div>
				<HeroSection />
				<HeroCarousel />
				<HeroCarouselControls />
				<FeatureSection />
				<Workflow />
				<Pricing />
				<Testimonials />
				<FormComponent />
			</div>
		</>
	);
};
