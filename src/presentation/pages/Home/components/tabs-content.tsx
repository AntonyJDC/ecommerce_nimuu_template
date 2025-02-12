import { FC, ReactNode } from "react";

interface TabContentProps {
	children: ReactNode;
}

const TabContent: FC<TabContentProps> = ({ children }) => {
	return <>{children}</>;
};

export default TabContent;
