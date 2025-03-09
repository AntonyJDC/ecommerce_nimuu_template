"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Pause, Play } from "lucide-react";

const slides = [
  {
    image: "/images/slide-bg-01.jpg",
    title: "Descubre tu mejor versión",
    description:
      "Productos diseñados para cuidar, nutrir y realzar la belleza natural de tu piel. ¡Renueva tu rutina hoy!",
  },
  {
    image: "/images/slide-bg.jpg",
    title: "Cuida tu piel de forma natural",
    description:
      "Limpieza suave y efectiva para una piel fresca y radiante. Redescubre el poder de lo natural en cada aplicación.",
  },
  {
    image: "/images/slide-bg-03.jpg",
    title: "Cuidado experto para tu piel",
    description:
      "Hidrata, protege y realza tu belleza natural con productos diseñados para cada necesidad de tu piel.",
  },
];

const SLIDE_DURATION = 5000; // 5 seconds
const PROGRESS_UPDATE_INTERVAL = 50; // 50 milliseconds

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Asegura el ciclo correcto
    setProgress(0);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isPlaying) return;

    let startTime = Date.now();
    setProgress(0);

    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / SLIDE_DURATION) * 100;

      if (newProgress >= 100) {
        nextSlide();
        startTime = Date.now();
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(progressInterval);
  }, [isPlaying, nextSlide, currentSlide]);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0); // Reinicia el progreso cuando se cambia manualmente de slide
  };

  return (
    <section className="relative h-[75vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute container flex inset-0 items-end py-8 sm:py-16 mb-16 md:mb-7">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white sm:text-6xl">{slide.title}</h1>
                <p className="text-lg text-white/90 sm:text-xl">{slide.description}</p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-2 rounded-full bg-white text-black hover:bg-white/90"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative container bottom-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          {slides.map((_, index) => (
            <Button
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => handleSlideClick(index)}
              className="group relative h-[20px] w-16 bg-transparent flex items-center hover:bg-transparent"
            >
              <div className="absolute h-[2px] w-full bg-white/30" />
              <div
                className={`absolute h-[2px] bg-white transition-all duration-75 ${currentSlide === index ? "" : "w-0"
                  }`}
                style={{
                  width: currentSlide === index ? `${progress}%` : "0%",
                  left: 0, // Forzar inicio desde la izquierda
                }}
              />
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white">
            {String(currentSlide + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 border border-white"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </section>
  );
}
