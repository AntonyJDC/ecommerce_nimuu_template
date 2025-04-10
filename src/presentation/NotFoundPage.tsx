import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<main className="grid min-h-dvh bg-base-100 w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<section>
				<div className=" py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-sm text-center">
						<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
							404
						</h1>
						<p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-base-content">
							Something's missing.
						</p>
						<p className="mb-4 text-lg font-light text-base-content/60">
							Sorry, we can't find that page. You'll find lots to explore on the
							home page.{" "}
						</p>
						<NavLink
							to="/"
							className="inline-flex bg-primary-600 hover:bg-primary hover:text-primary-content focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
						>
							Back to Homepage
						</NavLink>
					</div>
				</div>
			</section>
		</main>
	);
};

export default NotFoundPage;
