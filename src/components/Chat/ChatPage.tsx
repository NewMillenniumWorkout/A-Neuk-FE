import React, { useState, useRef, useEffect } from "react";
import { Message } from "./ChatData.ts";
import { formatDate } from "../../utils/TimeFormatter.tsx";
import { useChatPage } from "./ChatPageContext.tsx";
import { API_CHAT } from "../../api/chat.ts";
import { API_DIARY } from "../../api/diary.ts";
import ChatBubble from "./ChatBubble";
import TopAppBar from "./TopAppBar.tsx";
import InputArea from "./InputArea.tsx";
import ToastButton from "./ToastButton.tsx";
import ImageReceiver from "./ImageReceiver.tsx";
import SlideArea from "./SlideArea.tsx";
import { useEmotionSelectPage } from "../EmotionSelect/EmotionSelectPageContext.tsx";
import { useNavigate } from "react-router-dom";

const ChatPage: React.FC = () => {
	const {
		curChatId,
		setCurChatId,
		messages,
		setMessages,
		isGenAble,
		setIsGenAble,
		isGenStart,
		setIsGenStart,
		isSlide,
		isGenComplete,
		setIsGenComplete,
		isEmotionSelectAble,
		setIsEmotionSelectAble,
		addMessage,
		setIsLoading,
		userImage,
	} = useChatPage();
	const { setEmotionData } = useEmotionSelectPage();
	const BubbleContainerRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const autoScroll = () => {
		if (BubbleContainerRef.current) {
			BubbleContainerRef.current.scrollTop =
				BubbleContainerRef.current.scrollHeight;
		}
	};

	const handleGenClick = async () => {
		setIsGenStart(true);
		try {
			if (curChatId !== null) {
				const emotionData = await API_DIARY.getEmotions(curChatId);
				setEmotionData(emotionData);
			}
		} catch (error) {
			console.error("Error get emotions: ", error);
		}
		setIsGenComplete(true);
	};

	const handleBackClick = () => {
		setIsModalOpen(true);
	};

	const handleModalConfirm = () => {
		setIsModalOpen(false);
		navigate(-1);
	};

	const handleModalCancel = () => {
		setIsModalOpen(false);
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
		if (messages.length > 3) {
			setIsGenAble(true);
		}
		autoScroll();
	}, [messages]);

	useEffect(() => {
		autoScroll();
	}, [isGenStart, isGenAble]);

	useEffect(() => {
		const loadInitialMessage = async () => {
			try {
				const response = await API_CHAT.fetchInitialMessage();
				setCurChatId(response.data.chatId);
			} catch (error) {
				console.error("Error fetching initial messages:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadInitialMessage();
	}, []);

	useEffect(() => {
		const loadChatHistory = async () => {
			setIsLoading(true);
			if (curChatId !== null) {
				try {
					const response = await API_CHAT.fetchChatHistory(curChatId);
					setMessages(response.data.data);
				} catch (error) {
					console.error("Error fetching chat history:", error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		};

		loadChatHistory();
	}, [curChatId]);

	useEffect(() => {
		if (isEmotionSelectAble) {
			navigate("/emotion-select");
		}
	}, [isEmotionSelectAble]);

	useEffect(() => {
		if (userImage && isGenComplete && isSlide) {
			setIsEmotionSelectAble(true);
		} else {
			setIsEmotionSelectAble(false);
		}
	}, [userImage, isGenComplete, isSlide]);

	return (
		<div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
			<TopAppBar onBack={handleBackClick} />
			<div
				className="flex-grow min-h-0 px-2 pb-2 overflow-y-auto"
				ref={BubbleContainerRef}
			>
				{messages.map((message: Message, index: number) => {
					const currentDate = new Date(
						message.sentTime
					).toDateString();
					const previousDate =
						index > 0
							? new Date(
									messages[index - 1].sentTime
							  ).toDateString()
							: null;
					const isNewDate = currentDate !== previousDate;

					return (
						<div key={index}>
							{isNewDate && (
								<div className="text-center text-sm text-gray-aneuk mb-4 pt-4">
									{formatDate(new Date(message.sentTime))}
								</div>
							)}
							<ChatBubble
								content={message.content}
								sendTime={message.sentTime}
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
						onClick={handleGenClick}
						label="일기 생성 가능!"
					/>
				</div>
			)}
			{userImage ? <SlideArea /> : <InputArea onSend={addMessage} />}

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-black opacity-50"></div>
					<div className="bg-white px-12 pt-8 pb-4 rounded-3xl shadow-lg relative z-10">
						<div className="text-center mb-8 font-pretendard-medium">
							채팅이 모두 사라집니다.
						</div>
						<div className="flex justify-center">
							<button
								className="bg-red-400 text-white px-6 py-2 rounded-full"
								onClick={handleModalConfirm}
							>
								나가기
							</button>
							<button
								className="bg-white border text-gray-600 px-6 py-2 rounded-full ml-2"
								onClick={handleModalCancel}
							>
								취소
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatPage;
