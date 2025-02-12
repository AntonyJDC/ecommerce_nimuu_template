import { cn } from "@/lib/utils";
import {
	CSSProperties,
	FocusEvent,
	ReactNode,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import {
	type Control as ControlPropsRHF,
	Controller,
	FieldValues,
} from "react-hook-form";
import { MdClose } from "react-icons/md";
import Select, {
	ClearIndicatorProps,
	ControlProps,
	DropdownIndicatorProps,
	GroupBase,
	MenuListProps,
	MenuProps,
	MultiValueRemoveProps,
	OptionsOrGroups,
	PlaceholderProps,
	Props,
} from "react-select";
import { components } from "react-select";
import { FixedSizeList } from "react-window";
import { ErrorMessageAdapter } from "./error-message-adapter";

const controlStyles = {
	base: "block px-2.5 w-full text-base font-medium border placeholder:opacity-0 appearance-none peer disabled:cursor-not-allowed transition-colors duration-300 rounded-lg text-primary placeholder:text-primary/50 hover:border-primary disabled:border-primary/40",
	focus: "ring-1 ring-primary",
	nonFocus: "border-primary/50",
	disabled: "cursor-not-allowed	opacity-40",
	error: "border-error/50 hover:border-error ring-error",
};
const selectInputStyles = "";
const valueContainerStyles = "pt-1";
const singleValueStyles = "";
const multiValueStyles =
	"bg-primary rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
	"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-sm";
const indicatorsContainerStyles = "";
const clearIndicatorStyles =
	"text-gray-500 p-1 rounded-sm hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "";
const groupHeadingStyles = "mx-1 mt-2 mb-1 font-bold text-md";
const optionStyles = {
	base: "hover:cursor-pointer my-1 px-4 py-2 rounded",
	focus: "bg-base-content text-base-100",
	selected: "bg-primary text-primary-content",
};
const noOptionsMessageStyles =
	"text-primary/50 font-medium p-2 border border-dashed border-primary/50 rounded-sm";

const ClearIndicator = (props: ClearIndicatorProps) => {
	return (
		<components.ClearIndicator {...props}>
			<MdClose />
		</components.ClearIndicator>
	);
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
	return (
		<components.MultiValueRemove {...props}>
			<MdClose />
		</components.MultiValueRemove>
	);
};

type CustomControlProps<Option, IsMulti extends boolean> = ControlProps<
	Option,
	IsMulti,
	GroupBase<Option>
> & {
	selectProps: {
		isError?: boolean;
		label?: ReactNode;
		required?: boolean;
		menuIsOpen?: boolean;
	};
};

const Control = <Option, IsMulti extends boolean>({
	isFocused,
	isDisabled,
	selectProps: { menuIsOpen, required, isError, label, ...rest },
	...props
}: CustomControlProps<Option, IsMulti>) => {
	return (
		<>
			<components.Control
				className={cn(
					controlStyles.base,
					isFocused ? controlStyles.focus : controlStyles.nonFocus,
					isDisabled ? controlStyles.disabled : "",
					isError ? controlStyles.error : "",
				)}
				isFocused={isFocused}
				isDisabled={isDisabled}
				selectProps={{ menuIsOpen, ...rest }}
				{...props}
			/>
			<span
				className={cn(
					"absolute text-lg font-bold duration-300 transform -translate-y-4 translate-x-1.5 scale-75 top-1 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1.5 peer-focus:top-1 peer-focus:font-semibold peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 peer-disabled:text-opacity-40 rounded-lg",
					isError
						? "text-error/60 peer-hover:text-error"
						: "text-primary/60 peer-hover:text-primary peer-focus:text-primary peer-disabled:peer-hover:text-primary/60",
					isFocused
						? isError
							? "text-error"
							: "text-primary"
						: isError
							? "text-error/50"
							: "text-primary",
					isDisabled ? "cursor-not-allowed text-opacity-40" : "",
					menuIsOpen ? (isError ? "text-error" : "text-primary") : "",
				)}
			>
				{label}{" "}
				<span className={cn("text-error", required ? "" : "hidden")}>
					{" *"}
				</span>
			</span>
		</>
	);
};

type CustomDropdownIndicatorProps<
	Option,
	IsMulti extends boolean,
> = DropdownIndicatorProps<Option, IsMulti, GroupBase<Option>> & {
	selectProps: {
		isError?: boolean;
		label?: ReactNode;
		required?: boolean;
		menuIsOpen?: boolean;
	};
};

const DropdownIndicator = <Option, IsMulti extends boolean>(
	props: CustomDropdownIndicatorProps<Option, IsMulti>,
) => {
	const {
		selectProps: { menuIsOpen, isError },
	} = props;
	return (
		<components.DropdownIndicator
			{...props}
			className={cn(
				"p-1 bg-base-300 hover:text-base-300 rounded-md",
				isError ? "hover:bg-error text-error" : "hover:bg-base-content",
				menuIsOpen
					? isError
						? "bg-error text-error-content"
						: "bg-base-content text-base-300"
					: "",
			)}
		/>
	);
};

type CustomPlaceholderProps<Option, IsMulti extends boolean> = PlaceholderProps<
	Option,
	IsMulti,
	GroupBase<Option>
> & {
	selectProps: {
		isError?: boolean;
		label?: ReactNode;
		required?: boolean;
		menuIsOpen?: boolean;
	};
};

const Placeholder = <Option, IsMulti extends boolean>(
	props: CustomPlaceholderProps<Option, IsMulti>,
) => {
	const {
		selectProps: { isError },
	} = props;
	return (
		<components.Placeholder
			{...props}
			className={cn(isError ? "text-error" : "text-primary/50")}
		/>
	);
};

const Menu = ({ children, ...rest }: MenuProps<unknown>) => {
	return (
		<components.Menu
			className={cn(
				"mb-2.5 p-1 mt-1 border border-primary/30 bg-inherit bg-base-200 rounded-md animate-in fade-in duration-500 ",
			)}
			{...rest}
		>
			{children}
		</components.Menu>
	);
};

const Option = memo(
	({
		style,
		children,
	}: {
		style: CSSProperties;
		children: ReactNode;
	}) => {
		return (
			<div style={style} className="truncate text-md">
				{children}
			</div>
		);
	},
);

const MenuList = (props: MenuListProps) => {
	return <components.MenuList {...props}>{props.children}</components.MenuList>;
};

export const MenuListPerf = <Option, IsMulti extends boolean>({
	options,
	children,
	maxHeight,
	getValue,
	focusedOption,
}: MenuListProps<Option, IsMulti, GroupBase<Option>>) => {
	/* 	if (!children || typeof children !== 'object' || !Array.isArray(children)) {
		return <>{children}</>;
	} */

	const safeChildren = Array.isArray(children) ? children : [];

	const height = 40;
	const listRef = useRef<FixedSizeList | null>(null);

	const [value] = getValue();
	const initialOffset = options.indexOf(value) * height;
	const focusedIndex = options.indexOf(focusedOption);

	useEffect(() => {
		if (safeChildren.length > 0) {
			if (listRef.current && focusedIndex >= 0) {
				listRef.current.scrollToItem(focusedIndex);
			}
		}
	}, [focusedIndex, safeChildren.length]);

	return (
		<FixedSizeList
			height={Math.min(maxHeight, safeChildren.length * height)}
			itemCount={safeChildren.length}
			itemSize={height}
			initialScrollOffset={initialOffset}
			width="100%"
			ref={listRef}
		>
			{({ index, style }) => (
				<Option style={style}>{safeChildren[index]}</Option>
			)}
		</FixedSizeList>
	);
};

export interface InputSelectFOProps extends Props {
	id: string;
	name: string;
	options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
	control: ControlPropsRHF<FieldValues> | unknown;
	isError?: boolean;
	label: string;
	multipleError?: boolean;
	classNameWrapper?: string;
	required?: boolean;
	isModalOnBlur?: boolean;
	improvePerf?: boolean;
}
const InputSelectFO = ({
	id,
	name,
	value,
	control,
	options = [],
	placeholder,
	multipleError = false,
	isModalOnBlur = false,
	classNameWrapper,
	className = "bg-inherit",
	improvePerf = false,
	...props
}: InputSelectFOProps) => {
	const onBlurWorkaround = useCallback((event: FocusEvent<HTMLElement>) => {
		const element = event.relatedTarget as HTMLElement | null;
		if (element?.getAttribute("role") === "dialog") return;
		element?.focus();
	}, []);
	const memoizedOptions = useMemo(() => options, [options]);

	return (
		<div className={cn("relative box-border rounded-lg", classNameWrapper)}>
			<Controller
				name={name}
				control={control as ControlPropsRHF<FieldValues>}
				render={({
					field: { onChange, value, name, ref, onBlur },
					formState: { errors },
				}) => {
					const isError = !!errors[name];

					return (
						<>
							<Select
								id={id}
								inputId={id}
								closeMenuOnSelect={false}
								hideSelectedOptions={false}
								blurInputOnSelect={false}
								unstyled
								menuPlacement="auto"
								name={name}
								isError={isError}
								ref={ref}
								value={value}
								options={memoizedOptions}
								onChange={onChange}
								onBlur={isModalOnBlur ? onBlurWorkaround : onBlur}
								placeholder={placeholder}
								className={`rounded-lg ${className}`}
								styles={{
									input: (base) => ({
										...base,
										"input:focus": {
											boxShadow: "none",
										},
									}),
									multiValueLabel: (base) => ({
										...base,
										whiteSpace: "normal",
										overflow: "visible",
									}),
									control: (base) => ({
										...base,
										minHeight: 48,
										transition: "none",
									}),
								}}
								components={{
									ClearIndicator,
									MultiValueRemove,
									Control,
									DropdownIndicator,
									Placeholder,
									Menu,
									MenuList: improvePerf ? MenuListPerf : MenuList,
								}}
								classNames={{
									input: () => selectInputStyles,
									valueContainer: () => valueContainerStyles,
									singleValue: () => singleValueStyles,
									multiValue: () => multiValueStyles,
									multiValueLabel: () => multiValueLabelStyles,
									multiValueRemove: () => multiValueRemoveStyles,
									indicatorsContainer: () => indicatorsContainerStyles,
									clearIndicator: () => clearIndicatorStyles,
									indicatorSeparator: () => indicatorSeparatorStyles,
									groupHeading: () => groupHeadingStyles,
									option: ({ isFocused, isSelected }) => {
										return cn(
											isFocused && optionStyles.focus,
											isSelected && optionStyles.selected,
											optionStyles.base,
										);
									},
									noOptionsMessage: () => noOptionsMessageStyles,
								}}
								{...props}
							/>
							<ErrorMessageAdapter
								errors={errors}
								name={name}
								multipleError={multipleError}
							/>
						</>
					);
				}}
			/>
		</div>
	);
};

InputSelectFO.displayName = "InputSelectFO";

export { InputSelectFO };
