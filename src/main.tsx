import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./infrastructure/config/i18next";

// biome-ignore lint/style/noNonNullAssertion: This is a safe use of non-null assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
