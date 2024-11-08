import React, { useState } from "react";
import { messages, Message } from "./ChatData.ts";
import ChatBubble from "./ChatBubble";

function ChatPage() {
	return (
		<div className="w-full p-8">
			{messages.map((message: Message, index: number) => (
				<ChatBubble
					key={index}
					content={message.content}
					sendTime={message.send_time}
					sender={message.chat_id}
				/>
			))}
		</div>
	);
}

export default ChatPage;
