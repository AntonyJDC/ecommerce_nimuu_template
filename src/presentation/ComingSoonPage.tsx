import { Code, Cpu, Rocket, Sparkles, Workflow } from "lucide-react";
import { Variants, m } from "motion/react";
import { LogoIcon } from "./components";

export const ComingSoonPage = ({ title }: { title?: string }) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const floatingVariants: Variants = {
		initial: { y: 0 },
		animate: {
			y: [-10, 10],
			transition: {
				duration: 3,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	};

	const backgroundElements = Array(20)
		.fill(null)
		.map((_, i) => ({
			id: i,
			x: `${Math.random() * 100}%`,
			y: `${Math.random() * 100}%`,
			scale: Math.random() * 0.5 + 0.5,
			duration: Math.random() * 3 + 2,
		}));

	return (
		<div className=" overflow-hidden w-full py-20 relative">
			{/* Animated background elements */}
			{backgroundElements.map((element) => (
				<m.div
					key={element.id}
					className="absolute"
					initial={{ opacity: 0.1, scale: element.scale }}
					animate={{
						opacity: [0.1, 0.2, 0.1],
						scale: [element.scale, element.scale * 1.2, element.scale],
					}}
					transition={{
						duration: element.duration,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
					style={{
						left: element.x,
						top: element.y,
					}}
				>
					{element.id % 2 === 0 ? (
						<Cpu className="w-12 h-12 " />
					) : (
						<Sparkles className="w-8 h-8 " />
					)}
				</m.div>
			))}

			{/* Main content */}
			<m.div
				className="relative z-10 flex flex-col items-center justify-center p-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Logo and Title */}
				<m.div
					className="relative flex max-sm:flex-col items-center space-x-4 mb-8"
					variants={itemVariants}
				>
					<m.div
						className="relative"
						variants={floatingVariants}
						initial="initial"
						animate="animate"
					>
						<LogoIcon
							className="max-sm:w-14 max-sm:h-14 w-20 h-20 transition-transform duration-300 group-hover:scale-110"
							aria-label="Nimuu Logo"
						/>
					</m.div>
					<m.h1
						className="max-sm:text-4xl text-6xl font-bold tracking-tight"
						variants={itemVariants}
					>
						Nimuu
					</m.h1>
					<m.div
						className="absolute -top-0 -right-7"
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					>
						<Sparkles className="w-6 h-6 text-warning" />
					</m.div>
				</m.div>

				{/* Tagline */}
				<m.div className="text-center mb-12" variants={itemVariants}>
					<m.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
						The Future is Now
					</m.h2>
					<m.p className="text-xl opacity-90 max-w-2xl" variants={itemVariants}>
						Preparing a revolution in business technology with Sirius Nova
					</m.p>
				</m.div>
				{/* Feature Icons */}
				<m.div
					className="flex flex-wrap justify-center gap-8 mb-12"
					variants={containerVariants}
				>
					{[
						{ Icon: Rocket, text: "Innovation" },
						{ Icon: Code, text: "Technology" },
						{ Icon: Workflow, text: "Integration" },
					].map((feature) => (
						<m.div
							key={feature.text}
							className="flex flex-col items-center"
							variants={itemVariants}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<m.div
								className="p-4 rounded-full bg-base-100/10 backdrop-blur-sm"
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.6 }}
							>
								<feature.Icon className="w-10 h-10" />
							</m.div>
							<span className="mt-2 font-medium">{feature.text}</span>
						</m.div>
					))}
				</m.div>
				{/* Coming Soon Text */}
				<m.div
					className="text-center"
					variants={itemVariants}
					animate={{
						scale: [1, 1.05, 1],
						opacity: [0.8, 1, 0.8],
					}}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				>
					<p className="text-2xl font-bold">
						Coming Soon: <span className="text-primary">{title}</span>
					</p>
				</m.div>
			</m.div>
		</div>
	);
};
