import { create } from "zustand";

interface FormState {
	name: string;
	email: string;
	message: string;
	isSubmitting: boolean;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setMessage: (message: string) => void;
	setIsSubmitting: (isSubmitting: boolean) => void;
	resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
	name: "",
	email: "",
	message: "",
	isSubmitting: false,
	setName: (name) => set({ name }),
	setEmail: (email) => set({ email }),
	setMessage: (message) => set({ message }),
	setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
	resetForm: () =>
		set({ name: "", email: "", message: "", isSubmitting: false }),
}));
