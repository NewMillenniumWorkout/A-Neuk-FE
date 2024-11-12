import React from "react";
import { formatTime } from "../../utils/TimeFormatter";

type ChatBubbleProps = {
	content: string;
	sendTime: string;
	sender: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
	content,
	sendTime,
	sender,
}) => {
	const formattedTime = formatTime(sendTime);
	return (
		<div
			className={`flex ${
				sender === "MEMBER" ? "justify-end" : "justify-start"
			} items-end mb-4`}
		>
			{sender === "MEMBER" && (
				<div className="text-xs text-gray-aneuk pr-2">
					{formattedTime}
				</div>
			)}
			<div
				className={`max-w-xs pt-2 pb-2.5 px-4 rounded-3xl ${
					sender === "MEMBER"
						? "bg-white-aneuk text-gray-800"
						: "bg-black-aneuk text-white"
				}`}
			>
				{content}
			</div>
			{sender === "ASSISTANT" && (
				<div className="text-xs text-gray-aneuk pl-2">
					{formattedTime}
				</div>
			)}
		</div>
	);
};

export default ChatBubble;
