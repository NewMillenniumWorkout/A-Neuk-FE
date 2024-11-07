import React, { useState } from "react";
import { messages, Message } from "./ChatData.ts";

function ChatPage() {
	return (
		<div>
			{messages.map((message: Message, index: number) => (
				<div key={index}>
					<p>{message.content}</p>
					<small>{message.send_time}</small>
				</div>
			))}
		</div>
	);
}

export default ChatPage;
