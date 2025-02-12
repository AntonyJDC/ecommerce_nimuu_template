import { useEffect, useState } from "react";

const CarouselWithAutoplay = () => {
	const [currentSlide, setCurrentSlide] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev === 3 ? 1 : prev + 1));
		}, 3000); // Cambia de slide cada 3 segundos

		return () => clearInterval(interval);
	}, []);

	const slides = [
		{
			id: 1,
			image:
				"https://github.githubassets.com/assets/plan-1_desktop-849e8cffdf0b.webp",
			prevSlide: 2,
			nextSlide: 2,
		},
		{
			id: 2,
			image:
				"https://github.githubassets.com/assets/plan-2_desktop-aecbd9828f68.webp",
			prevSlide: 1,
			nextSlide: 3,
		},
		{
			id: 3,
			image:
				"https://github.githubassets.com/assets/plan-3_desktop-bde1a03d1322.webp",
			prevSlide: 2,
			nextSlide: 1,
		},
	];

	return (
		<>
			{slides.map((slide) => (
				<img
					key={slide.id}
					id={`slide${slide.id}`}
					src={slide.image}
					alt={`Slide ${slide.id}`}
					className={`carousel-item w-full h-full object-cover object-left ${
						currentSlide === slide.id ? "relative" : "hidden"
					}`}
				/>
			))}
		</>
	);
};

export default CarouselWithAutoplay;
