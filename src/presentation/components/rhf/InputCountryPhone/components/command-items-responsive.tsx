import { useMediaQuery } from "@/presentation/hooks/use-media-query";
import {
	CountryData,
	CountryIso2,
	ParsedCountry,
} from "react-international-phone";
import { CommandDialogItems } from "./command-dialog-items";
import { CommandDrawerItems } from "./command-drawer-items";

export interface ItemProps {
	value: number;
	label: string;
	icon: string;
	iso2: string;
	phoneCode: string;
}

export interface CommandProps {
	items: CountryData[];
	selectedItem: ParsedCountry;
	setItem: (
		countryIso2: CountryIso2,
		options?: {
			focusOnInput: boolean;
		},
	) => void;
}

export const CommandItemsResponsive = ({
	items,
	selectedItem,
	setItem,
}: CommandProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (!isDesktop) {
		return (
			<CommandDialogItems
				items={items}
				selectedItem={selectedItem}
				setItem={setItem}
			/>
		);
	}
	return (
		<CommandDrawerItems
			items={items}
			selectedItem={selectedItem}
			setItem={setItem}
		/>
	);
};
