import React from "react";

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
	return (
		<div
			className={`flex ${
				sender === "MEMBER" ? "justify-end" : "justify-start"
			} items-end mb-3`}
		>
			{sender === "MEMBER" && (
				<small className="text-xs text-gray-500 pr-2">{sendTime}</small>
			)}
			<div
				className={`max-w-xs p-3 rounded-2xl shadow-md ${
					sender === "MEMBER"
						? "bg-white-aneuk text-gray-800"
						: "bg-black-aneuk text-white"
				}`}
			>
				<p className="mb-1">{content}</p>
			</div>
			{sender === "ASSISTANT" && (
				<small className="text-xs text-gray-500 pl-2">{sendTime}</small>
			)}
		</div>
	);
};

export default ChatBubble;
