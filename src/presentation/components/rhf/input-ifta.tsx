import { cn } from "@lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type InputHTMLAttributes, useState } from "react";
import { type Control, Controller, type FieldValues } from "react-hook-form";
import { ElEyeClose, ElEyeOpen } from "../icons";
import { TooltipResponsive } from "../ui";
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
	"transition-colors duration-200 absolute left-0 px-3 top-1.5 text-sm font-semibold truncate w-full ",
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
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	name: string;
	control: unknown;
	tooltip?: boolean;
	textTooltip?: string;
	isMultipleError?: boolean;
	label: string;
}

const InputFilled = ({
	className,
	control,
	required = false,
	id,
	name,
	textTooltip,
	tooltip = false,
	isMultipleError = false,
	label,
	type,
	variant,
	...props
}: InputProps) => {
	console.log("Render InputFO", name);

	return (
		<div className="relative">
			<Controller
				name={name}
				control={control as Control<FieldValues>}
				render={({
					field: { name, value, onChange, onBlur, ref, disabled },
					formState: { errors },
				}) => {
					const [showPassword, setShowPassword] = useState(false);

					const togglePasswordVisibility = () => {
						setShowPassword(!showPassword);
					};
					return (
						<>
							<div className={`relative ${className}`}>
								<div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-row space-x-2 z-10">
									{type === "password" && (
										<button
											type="button"
											onClick={togglePasswordVisibility}
											className="btn btn-circle btn-sm focus:outline-none "
										>
											{showPassword ? (
												<ElEyeClose className="w-5 h-5" />
											) : (
												<ElEyeOpen className="w-5 h-5" />
											)}
										</button>
									)}
									{tooltip && (
										<TooltipResponsive
											className=" text-blue-gray-500 w-6 h-6"
											textTooltip={textTooltip}
										/>
									)}
								</div>

								<input
									id={id}
									className={cn(
										inputVariants({
											variant: errors[name] ? "error" : variant,
										}),
										{
											"pr-14":
												(type === "password" || tooltip) &&
												!(type === "password" && tooltip),
											"pr-24": type === "password" && tooltip,
										},
									)}
									ref={ref}
									value={value || ""}
									onChange={onChange}
									onBlur={onBlur}
									disabled={disabled}
									{...props}
									type={showPassword ? "text" : type}
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

InputFilled.displayName = "InputFilled";

export { InputFilled };