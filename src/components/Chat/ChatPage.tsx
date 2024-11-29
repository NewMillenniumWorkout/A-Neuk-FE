import React, { useState, useRef, useEffect } from "react";
import { messages as initialMessages, Message } from "./ChatData.ts";
import { formatDate } from "../../utils/TimeFormatter.tsx";
import { ChatPageProvider, useChatPage } from "./ChatPageContext.tsx";
import ChatBubble from "./ChatBubble";
import TopAppBar from "./TopAppBar.tsx";
import InputArea from "./InputArea.tsx";
import ToastButton from "./ToastButton.tsx";
import ImageReceiver from "./ImageReceiver.tsx";
import SlideArea from "./SlideArea.tsx";
import axios from "axios";

const ChatPage: React.FC = () => {
	const userToken = sessionStorage.getItem("userToken");

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://aneuk-api.dev-lr.com/chat/init-message",
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			console.log();
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};

	fetchData();

	const {
		messages,
		setMessages,
		isGenAble,
		setIsGenAble,
		isGenStart,
		setIsGenStart,
		isEmotionSelectAble,
		setIsEmotionSelectAble,
		addMessage,
	} = useChatPage();
	const BubbleContainerRef = useRef<HTMLDivElement | null>(null);

	const autoScroll = () => {
		if (BubbleContainerRef.current) {
			BubbleContainerRef.current.scrollTop =
				BubbleContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		const updateVh = () => {
			const viewportHeight = window.innerHeight;
			document.documentElement.style.setProperty(
				"--vh",
				`${viewportHeight * 0.01}px`
			);
		};

		updateVh();

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", updateVh);
		} else {
			window.addEventListener("resize", updateVh);
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener("resize", updateVh);
			} else {
				window.removeEventListener("resize", updateVh);
			}
		};
	}, []);

	useEffect(() => {
		if (messages.length > 10) {
			setIsGenAble(true);
		}
		autoScroll();
	}, [messages]);

	useEffect(() => {
		autoScroll();
	}, [isGenStart, isGenAble]);

	return (
		<div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
			<TopAppBar />
			<div
				className="flex-grow min-h-0 p-2 overflow-y-auto"
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
				{isGenStart === true && <ImageReceiver />}
			</div>
			{isGenAble && !isGenStart && (
				<div className="min-h-16">
					<ToastButton
						onClick={() => {
							setIsGenStart(true);
						}}
						label="일기 생성 가능!"
					/>
				</div>
			)}
			{isEmotionSelectAble ? (
				<SlideArea />
			) : (
				<InputArea onSend={addMessage} />
			)}
		</div>
	);
};

export default ChatPage;
