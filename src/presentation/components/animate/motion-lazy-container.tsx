import { LazyMotion } from "motion/react";
import { ReactNode } from "react";

import * as m from "motion/react-m";

interface Props {
	children: ReactNode;
}

const loadFeatures = () => import("./features.ts").then((res) => res.default);

export default function MotionLazyContainer({ children }: Props) {
	return (
		<LazyMotion strict features={loadFeatures}>
			<m.div>{children}</m.div>
		</LazyMotion>
	);
}
