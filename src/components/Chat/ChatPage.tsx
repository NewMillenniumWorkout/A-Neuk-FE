import React, { useState } from "react";
import { messages, Message } from "./ChatData.ts";
import ChatBubble from "./ChatBubble";
import TopAppBar from "./TopAppBar.tsx";

function ChatPage() {
	return (
		<div className="absolute inset-0 w-full h-full bg-white">
			<TopAppBar />
			<div className="p-8">
				{messages.map((message: Message, index: number) => (
					<ChatBubble
						key={index}
						content={message.content}
						sendTime={message.send_time}
						sender={message.type}
					/>
				))}
			</div>
		</div>
	);
}

export default ChatPage;
