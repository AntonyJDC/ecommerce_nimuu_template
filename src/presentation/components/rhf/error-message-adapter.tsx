import { ErrorMessage } from "@hookform/error-message";
import type {
	FieldError,
	FieldErrors,
	FieldValues,
	MultipleFieldErrors,
} from "react-hook-form";

interface ErrorMessageProps {
	multipleError?: boolean;
	errors: FieldError | undefined | FieldErrors<FieldValues>;
	name: string;
}
const ErrorMessageAdapter = ({
	multipleError = false,
	name,
	errors,
}: ErrorMessageProps) => {
	return (
		<>
			{multipleError ? (
				<ErrorMessage
					errors={errors}
					name={name}
					render={({
						messages,
					}: {
						message: string;
						messages?: MultipleFieldErrors;
					}) => {
						let messagesCont: string[] = [];
						for (const key in messages) {
							if (Array.isArray(messages[key])) {
								messagesCont = [...messagesCont, ...messages[key]];
							} else {
								messagesCont.push(messages[key] as string);
							}
						}
						return (
							<ul className="pt-1">
								{messagesCont.map((message, index) => (
									<li
										className="text-error animate-in fade-in duration-500"
										// biome-ignore lint/suspicious/noArrayIndexKey: Index is not used
										key={index}
									>
										<span>❌ </span> {message}
									</li>
								))}
							</ul>
						);
					}}
				/>
			) : (
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }: { message: string }) => {
						return (
							<p className="text-error animate-in fade-in duration-500">
								{message}
							</p>
						);
					}}
				/>
			)}
		</>
	);
};
ErrorMessageAdapter.displayName = "ErrorMessageAdapter";

export { ErrorMessageAdapter };
