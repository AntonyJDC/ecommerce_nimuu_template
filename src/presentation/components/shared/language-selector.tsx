import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { RenderTwemoji } from "@components/shared/render-twemoji";
import { useGlobalStore } from "@store/global/global.store";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineGlobal } from "react-icons/ai";

interface Props {
	className?: string;
	align?: "center" | "start" | "end" | undefined;
}

const LanguageSelector: FC<Props> = ({ align = "center" }) => {
	console.log("Render Locale");
	const { i18n, t } = useTranslation();
	const locales = useGlobalStore((state) => state.locales);
	const localeSel = useGlobalStore((state) => state.localeSel);
	const handleLanguageChange = useGlobalStore(
		(state) => state.handleLanguageChange,
	);
	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						tabIndex={0}
						className="btn min-h-[28px] h-[28px] text-base-content btn-ghost border-transparent shadow-none px-2 gap-3 text-xs md:text-sm"
					>
						{localeSel.code.length === 2 ? (
							<AiOutlineGlobal size={20} className="text-base-content" />
						) : (
							<RenderTwemoji emoji={localeSel.icon} className="h-5 w-5" />
						)}
						{t(localeSel.title)}
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align={align}
					className="border-base-content/20 rounded-xl p-2 space-y-1"
				>
					{Object.keys(locales).map((optionLocale) => (
						<DropdownMenuItem
							key={optionLocale}
							onClick={() => handleLanguageChange(optionLocale)}
							active={i18n.resolvedLanguage === locales[optionLocale].code}
							className="rounded-lg pl-4 pr-8 py-2 h-9 cursor-pointer [&_svg]:size-6"
						>
							<div className="w-6 mr-1 flex justify-center">
								{locales[optionLocale].code.length === 2 ? (
									<AiOutlineGlobal />
								) : (
									<RenderTwemoji
										emoji={locales[optionLocale].icon}
										className="flex max-w-5 h-5"
									/>
								)}
							</div>
							{t(locales[optionLocale].title)}
							{/* {locales[optionLocale].title} */}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

LanguageSelector.displayName = "LanguageSelector";

export { LanguageSelector };
