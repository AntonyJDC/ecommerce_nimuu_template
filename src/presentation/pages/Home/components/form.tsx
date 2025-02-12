import { selectOptions } from "@/constants";
import { activeOption, subject } from "@/core/types";
import { InputSelectFO, Textarea } from "@/presentation/components/rhf";
import { InputCountryPhoneFO } from "@/presentation/components/rhf/InputCountryPhone/inputfo-country-phone";
import { InputFO } from "@/presentation/components/rhf/inputfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z, { zodAlwaysRefine } from "../../../../infrastructure/config/z";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
	try {
		const number = phoneUtil.parseAndKeepRawInput(phone);

		return phoneUtil.isValidNumber(number);
	} catch (_error) {
		return false;
	}
};

const CountryMetadataSchema = z.object({
	name: z.string(),
	iso2: z.string(),
	dialCode: z.string(),
	format: z.string(),
});

const PhoneSchema = z.object({
	phone: z.string(),
	inputValue: z.string(),
	country: CountryMetadataSchema,
});

const contactFormSchema = zodAlwaysRefine(
	z.object({
		name: z.string().max(80).min(1),
		email: z.string().email().max(320).min(5),
		phone: z.string().optional(),
		message: z.string().max(1200).min(1),
		phoneDataDetails: PhoneSchema.optional(),
		subject: z.object({
			label: z.string(),
			value: z.nativeEnum(subject),
		}),
		isPhoneValid: z.boolean().optional().nullable(),
	}),
).superRefine((data, ctx) => {
	try {
		if (data.phone) {
			if (data.phone === `+${data.phoneDataDetails?.country.dialCode}`) return;
			const phoneValid = isPhoneValid(data.phone);

			if (!phoneValid) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					params: {
						i18n: {
							key: "form.isNotValidNumber",
						},
					},
					path: ["phone"],
				});
			}
			data.isPhoneValid = phoneValid;
		} else {
			data.isPhoneValid = false;
		}
	} catch (_error) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			params: {
				i18n: {
					key: "form.invalidPhoneNumber",
				},
			},
			path: ["phone"],
		});
		data.isPhoneValid = false;
	}
});

type contactFormType = z.infer<typeof contactFormSchema>;

const Form: React.FC = () => {
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { isSubmitting },
	} = useForm<contactFormType>({
		defaultValues: {
			subject: { label: "General Inquiry", value: subject.GENERAL_INQUIRY },
		},
		resolver: zodResolver(contactFormSchema),
	});
	const API_URL = import.meta.env.VITE_API_URL;

	const { t } = useTranslation();

	const [modalMessage, setModalMessage] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const onSubmit: SubmitHandler<contactFormType> = async (data) => {
		if (!data.isPhoneValid) {
			data.phone = undefined;
		}

		const jsonData = {
			name: data.name,
			email: data.email,
			phone: data.phone || null,
			message: data.message,
			subject: data.subject.label,
		};
		try {
			const response = await fetch(`${API_URL}/channels`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(jsonData),
			});

			if (response.ok) {
				setModalMessage("Form successfully submitted");
				reset({});
			} else {
				setModalMessage(
					"There was an issue submitting the form. Please try again.",
				);
			}
		} catch (error) {
			console.error("Request error:", error);
			setModalMessage("Connection error. Please try again.");
		} finally {
			setIsModalOpen(true);
		}
	};

	const activeItems: activeOption[] = selectOptions
		.filter((item) => item.isActive)
		.map(({ label, value }) => ({
			label: t(label),
			value,
		}));

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="relative w-full md:max-w-md lg:max-w-lg md:mx-auto mt-10 md:mt-10 space-y-6 px-0 text-primary text-left"
		>
			<InputFO
				autoComplete="name"
				aria-label="full name"
				className="bg-base-100"
				id="name"
				label={t("form.full_name")}
				name="name"
				placeholder="John Doe"
				color="primary"
				type="text"
				control={control}
				required
				classNameLabel="bg-base-100 text-lg"
			/>

			<InputFO
				autoComplete="email"
				aria-label="email"
				className="bg-base-100"
				id="email"
				label={t("form.email")}
				color="primary"
				name="email"
				required
				placeholder="example@email.com"
				type="email"
				control={control}
				classNameLabel="bg-base-100 text-lg"
			/>

			<InputCountryPhoneFO
				autoComplete="phone"
				aria-label="phone number"
				className="bg-base-100"
				id="phone"
				label={t("form.phone_number")}
				color="primary"
				name="phone"
				setValue={setValue}
				placeholder="123456"
				control={control}
				classNameLabel="bg-base-100 text-lg"
			/>
			<InputSelectFO
				id="subject"
				name="subject"
				control={control}
				classNameWrapper="bg-base-100 text-left"
				label={t("form.subject")}
				placeholder={"Select..."}
				menuPosition="fixed"
				options={activeItems}
				aria-label="subject"
				aria-labelledby="subject"
				closeMenuOnSelect={true}
			/>

			<Textarea
				autoComplete="message"
				aria-label="inquiry"
				className="h-32 min-h-32 bg-base-100"
				required
				id="message"
				color="primary"
				label={t("form.message")}
				name="message"
				placeholder={t("form.place_holder")}
				type="text"
				control={control}
				classNameLabel="bg-base-100 text-lg"
			/>

			<button
				type="submit"
				disabled={isSubmitting}
				className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isSubmitting ? (
					<>
						<Loader2 className="w-5 h-5 mr-2 animate-spin" />
						{t("form.sending")}
					</>
				) : (
					<>
						<Send className="w-5 h-5 mr-2" />
						{t("form.send")}
					</>
				)}
			</button>

			{isModalOpen && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg"> {t("form.notification")} </h3>
						<p className="py-4">{modalMessage}</p>
						<div className="modal-action">
							<button type="button" className="btn" onClick={closeModal}>
								{t("form.close")}
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	);
};

export default Form;
