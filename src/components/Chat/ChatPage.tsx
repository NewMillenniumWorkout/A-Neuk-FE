import React, { useState, useRef, useEffect } from "react";
import { messages as initialMessages, Message } from "./ChatData.ts";
import ChatBubble from "./ChatBubble";
import TopAppBar from "./TopAppBar.tsx";
import { formatDate } from "../../utils/TimeFormatter.tsx";
import IconButton from "../IconButton.tsx";
import { IconProvider } from "../../utils/IconProvider.tsx";
import { InputArea } from "./InputArea.tsx";
import { GenButton } from "./GenButton.tsx";
import { ImageReceiver } from "./ImageReceiver.tsx";

function ChatPage() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [isGenAble, setIsGenAble] = useState(false);

	const BubbleContainerRef = useRef<HTMLDivElement | null>(null);

	const addMessage = (content: string) => {
		const newMessage: Message = {
			chat_id: 123,
			content,
			type: "MEMBER",
			send_time: new Date().toISOString(),
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	const autoScroll = () => {
		if (BubbleContainerRef.current) {
			BubbleContainerRef.current.scrollTop =
				BubbleContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (messages.length > 10) {
			setIsGenAble(true);
		}
		autoScroll();
	}, [messages]);

	return (
		<div className="absolute inset-0 w-full h-full bg-white flex flex-col">
			<TopAppBar />
			<div
				className="flex-grow p-2 overflow-y-auto"
				ref={BubbleContainerRef}
			>
				{messages.map((message: Message, index: number) => {
					const currentDate = new Date(
						message.send_time
					).toDateString();
					const previousDate =
						index > 0
							? new Date(
									messages[index - 1].send_time
							  ).toDateString()
							: null;
					const isNewDate = currentDate !== previousDate;

					return (
						<div key={index}>
							{isNewDate && (
								<div className="text-center text-sm text-gray-aneuk mb-4 pt-4">
									{formatDate(new Date(message.send_time))}
								</div>
							)}
							<ChatBubble
								content={message.content}
								sendTime={message.send_time}
								sender={message.type}
							/>
						</div>
					);
				})}
				<ImageReceiver />
			</div>
			<InputArea onSend={addMessage} />
			{isGenAble && <GenButton onClick={() => {}} />}
		</div>
	);
}

export default ChatPage;
