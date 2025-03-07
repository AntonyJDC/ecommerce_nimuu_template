import { cn } from "@/lib/utils";
import {
	type CSSProperties,
	type FocusEvent,
	type ReactNode,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import {
	type Control as ControlPropsRHF,
	Controller,
	type FieldValues,
} from "react-hook-form";
import Select, {
	type ControlProps,
	type DropdownIndicatorProps,
	type GroupBase,
	type MenuListProps,
	type MenuProps,
	type OptionsOrGroups,
	type Props,
} from "react-select";
import { components } from "react-select";

import { type VariantProps, cva } from "class-variance-authority";
import { FixedSizeList } from "react-window";
import { ErrorMessageAdapter } from "./error-message-adapter";

const inputVariants = cva(
	"w-full h-[60px] px-3 pt-6 pb-1.5 text-base font-medium placeholder:text-base-content/50  border bg-inherit border-base-content/65 rounded-xl focus:outline focus:outline-2 focus:outline-offset-2 focus:hover:ring-0 hover:ring-1 peer transition duration-200",
	{
		variants: {
			variant: {
				default:
					"border-base-content/50 focus:outline-base-content focus:border-base-content focus:hover:ring-base-content focus:hover:border-base-content hover:ring-base-content",
				primary:
					"border-primary focus:outline-primary focus:border-primary focus:hover:ring-primary focus:hover:border-primary hover:ring-primary",
				secondary:
					"border-secondary focus:outline-secondary focus:border-secondary focus:hover:ring-secondary focus:hover:border-secondary hover:ring-secondary",
				accent:
					"border-accent focus:outline-accent focus:border-accent focus:hover:ring-accent focus:hover:border-accent hover:ring-accent",
				error:
					"text-error border-error focus:outline-error focus:border-error focus:hover:ring-error focus:hover:border-error hover:ring-error",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const labelVariants = cva(
	"transition-colors duration-200 absolute left-0 pl-3 pr-12 top-1.5 text-sm font-semibold truncate w-full pointer-events-none",
	{
		variants: {
			variant: {
				default:
					"text-primary peer-focus:text-primary peer-hover:text-primary peer-placeholder-shown:text-base-content/65",
				primary:
					"text-primary peer-focus:text-primary peer-hover:text-primary peer-placeholder-shown:text-primary/65",
				secondary:
					"text-secondary peer-focus:text-secondary peer-hover:text-secondary peer-placeholder-shown:text-secondary/65",
				accent:
					"text-accent peer-focus:text-accent peer-hover:text-accent peer-placeholder-shown:text-accent/65",
				error:
					"text-error peer-focus:text-error peer-hover:text-error peer-placeholder-shown:text-error/65",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const optionStyles = {
	base: "hover:cursor-pointer my-1 px-4 py-2 rounded",
	focus: "bg-base-content text-base-100",
	selected: "bg-primary text-primary-content",
};
const noOptionsMessageStyles =
	"text-base-content/50 p-2 border border-dashed border-base-content/20 rounded-sm";

type InputVariants = VariantProps<typeof inputVariants>;

type CustomControlProps<Option, IsMulti extends boolean> = ControlProps<
	Option,
	IsMulti,
	GroupBase<Option>
> & {
	selectProps: {
		isError?: boolean;
		label?: ReactNode;
		required?: boolean;
		variant?: InputVariants["variant"];
		menuIsOpen?: boolean;
	};
};

const Control = <Option, IsMulti extends boolean>({
	isFocused,
	isDisabled,
	selectProps: { menuIsOpen, required, isError, variant, label, ...rest },
	...props
}: CustomControlProps<Option, IsMulti>) => {
	return (
		<>
			{/* @ts-ignore */}
			<components.Control
				className={cn(
					inputVariants({
						variant: isError ? "error" : variant,
					}),
				)}
				isFocused={isFocused}
				isDisabled={isDisabled}
				selectProps={{ menuIsOpen, ...rest }}
				{...props}
			/>
			<span
				className={cn(
					labelVariants({
						variant: isError ? "error" : variant,
					}),
				)}
			>
				{label}
				{required && <span className="text-error ml-1">*</span>}
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
		//@ts-ignore
		<components.DropdownIndicator
			{...props}
			className={cn(
				"absolute cursor-pointer top-1/4 right-2 p-1 bg-base-300 hover:text-base-300 rounded-md",
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

const Menu = ({ children, ...rest }: MenuProps) => {
	return (
		//@ts-ignore
		<components.Menu
			className={cn(
				"mb-2.5 p-1 mt-1 border border-base-content/30 bg-inherit rounded-md animate-in fade-in duration-500 ",
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
	//@ts-ignore
	return <components.MenuList {...props}>{props.children}</components.MenuList>;
};

export const MenuListPerf = <Option, IsMulti extends boolean>({
	options,
	children,
	maxHeight,
	getValue,
	focusedOption,
}: MenuListProps<Option, IsMulti, GroupBase<Option>>) => {
	const safeChildren = Array.isArray(children) ? children : [];

	const height = 40;
	const listRef = useRef<FixedSizeList>(null);

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

export interface InputSelectProps extends Props, InputVariants {
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
const InputSelectFilled = ({
	id,
	name,
	value,
	control,
	options = [],
	multipleError = false,
	isModalOnBlur = false,
	classNameWrapper,
	improvePerf = false,
	...props
}: InputSelectProps) => {
	console.log("Render: ", name);

	const onBlurWorkaround = useCallback((event: FocusEvent<HTMLElement>) => {
		const element = event.relatedTarget as HTMLElement;
		if (element?.getAttribute("role") === "dialog") return;
		element?.focus();
	}, []);
	const memoizedOptions = useMemo(() => options, [options]);

	return (
		<div className={cn("relative box-border", classNameWrapper)}>
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
								className=" rounded-xl bg-base-100"
								menuPlacement="auto"
								name={name}
								isError={isError}
								ref={ref}
								value={value}
								options={memoizedOptions}
								onChange={onChange}
								onBlur={isModalOnBlur ? onBlurWorkaround : onBlur}
								components={{
									Control,
									Menu,
									MenuList: improvePerf ? MenuListPerf : MenuList,
									DropdownIndicator,
								}}
								classNames={{
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

InputSelectFilled.displayName = "InputSelectFilled";

export { InputSelectFilled };