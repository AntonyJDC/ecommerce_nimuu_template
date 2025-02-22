import s from "./SpinnerbLoader.module.css";
import cn from "clsx";

const SpinnerbLoader = ({ className }: any) => {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <span className={cn(s.Loader, {}, className && className)}></span>;
};

export default SpinnerbLoader;
