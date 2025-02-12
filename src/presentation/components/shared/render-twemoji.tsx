import twemoji from "@twemoji/api";

interface RenderTwemojiProps {
	emoji: string;
	className?: string;
}
export const RenderTwemoji = ({
	emoji,
	className = "flex w-[22px] min-w-[22px] h-[22px]",
}: RenderTwemojiProps) => {
	return (
		<span
			//biome-ignore lint/security/noDangerouslySetInnerHtml: This is a safe use of dangerouslySetInnerHTML
			dangerouslySetInnerHTML={{
				__html: twemoji.parse(emoji, {
					folder: "svg",
					ext: ".svg",
				}),
			}}
			className={className}
		/>
	);
};
