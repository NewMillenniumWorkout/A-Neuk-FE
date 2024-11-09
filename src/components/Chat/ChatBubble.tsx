import React from "react";

type ChatBubbleProps = {
	content: string;
	sendTime: string;
	sender: number;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
	content,
	sendTime,
	sender,
}) => {
	return (
		<div
			className={`flex ${
				sender === 1 ? "justify-end" : "justify-start"
			} mb-3`}
		>
			<div
				className={`max-w-xs p-3 rounded-2xl shadow-md ${
					sender === 1
						? "bg-white-aneuk text-gray-800"
						: "bg-black-aneuk text-white"
				}`}
			>
				<p className="mb-1">{content}</p>
				<small className="text-xs text-gray-500">{sendTime}</small>
			</div>
		</div>
	);
};

export default ChatBubble;
