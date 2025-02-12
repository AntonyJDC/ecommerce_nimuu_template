export enum subject {
	GENERAL_INQUIRY = "GENERAL_INQUIRY",
	TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
	QUOTE_REQUEST = "QUOTE_REQUEST",
	PARTNERSHIP_INQUIRY = "PARTNERSHIP_INQUIRY",
	SUGGESTIONS = "SUGGESTIONS",
	COMPLAINS = "COMPLAINS",
	OTHERS = "OTHERS",
}

export interface subjectOption {
	label: string;
	value: string;
	isActive: boolean;
}

export type activeOption = Pick<subjectOption, "label" | "value">;
