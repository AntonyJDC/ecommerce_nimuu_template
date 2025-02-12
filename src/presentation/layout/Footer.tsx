import {
	aboutLinks,
	communityLinks,
	platformLinks,
	resourcesLinks,
} from "@constants/index";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className="w-full border-t border-neutral-700">
			<div className="flex container max-sm:flex-col max-w-7xl mx-auto max-lg:pt-5 pt-10 flex-wrap justify-between gap-8 mb-8 lg:flex-row mt-8 px-5 sm:px-6 lg:px-12 py-6 ">
				<div>
					<h3 className="text-md font-semibold mb-4 text-orange-500">
						{t("footer.solutions")}
					</h3>
					<ul className="space-y-2">
						{resourcesLinks.map((link, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
							<li key={index}>
								<a
									href={link.href}
									className="text-neutral-content hover:text-primary"
								>
									{t(link.text)}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-md font-semibold mb-4 text-orange-500">
						{t("footer.useful_links")}
					</h3>
					<ul className="space-y-2">
						{platformLinks.map((link, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
							<li key={index}>
								<a
									href={link.href}
									className="text-neutral-content hover:text-primary"
								>
									{t(link.text)}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-md font-semibold mb-4 text-orange-500">
						{t("footer.educational_content")}
					</h3>
					<ul className="space-y-2">
						{communityLinks.map((link, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
							<li key={index}>
								<a
									href={link.href}
									className="text-neutral-content hover:text-primary"
								>
									{t(link.text)}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-md font-semibold mb-4 text-orange-500">
						{t("footer.about_us")}
					</h3>
					<ul className="space-y-2">
						{aboutLinks.map((link, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
							<li key={index}>
								<a
									href={link.href}
									className="text-neutral-content hover:text-primary"
								>
									{t(link.text)}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className=" mx-4 mt-10 mb-6 text-sm text-neutral-content text-center">
				{t("footer.cookie_message")}
				<Link className="ml-2 link link-primary link-hover" to="/legal/terms">
					{t("footer.terms_and_conditions")}
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
