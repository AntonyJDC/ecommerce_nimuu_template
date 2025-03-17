import { cn } from "@lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import { type Control, Controller, type FieldValues } from "react-hook-form";
import { TooltipResponsive } from "../ui";
import { ErrorMessageAdapter } from "./error-message-adapter";

const inputVariants = cva(
	"w-full px-3 pt-1.5 pb-1.5 text-base font-medium border placeholder:text-base-content/50 bg-inherit border-base-content/65 rounded-xl focus:outline focus:outline-2 focus:outline-offset-2 focus:hover:ring-0 hover:ring-1 peer transition duration-200",
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
	"flex items-center transition-colors duration-200 text-sm font-semibold truncate w-full",
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

export interface InputProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof inputVariants> {
	name: string;
	control: unknown;
	tooltip?: boolean;
	textTooltip?: string;
	isMultipleError?: boolean;
	label: string;
}

const TextareaFilled = ({
	className,
	control,
	required = false,
	id,
	name,
	textTooltip,
	tooltip = false,
	isMultipleError = false,
	label,
	variant,
	...props
}: InputProps) => {
	console.log("Render Input", name);

	return (
		<div className="relative">
			<Controller
				name={name}
				control={control as Control<FieldValues>}
				render={({
					field: { name, value, onChange, onBlur, ref, disabled },
					formState: { errors },
				}) => {
					return (
						<>
							<div className="relative flex flex-col-reverse space-y-reverse space-y-2 ">
								<textarea
									id={id}
									className={cn(
										inputVariants({
											variant: errors[name] ? "error" : variant,
											className,
										}),
									)}
									name={name}
									ref={ref}
									value={value || ""}
									onChange={onChange}
									onBlur={onBlur}
									disabled={disabled}
									{...props}
								/>
								<label
									htmlFor={id}
									className={cn(
										labelVariants({
											variant: errors[name] ? "error" : variant,
										}),
									)}
								>
									{label}
									{required && <span className="text-error ml-1">*</span>}
									{tooltip && (
										<TooltipResponsive
											className="ml-2"
											textTooltip={textTooltip}
										/>
									)}
								</label>
							</div>
							<ErrorMessageAdapter
								errors={errors}
								name={name}
								multipleError={isMultipleError}
							/>
						</>
					);
				}}
			/>
		</div>
	);
};

TextareaFilled.displayName = "InputFilled";

export { TextareaFilled };