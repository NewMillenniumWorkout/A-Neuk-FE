import React, { createContext, ReactNode, useContext, useState } from "react";
import { messages as chatdata, Message } from "./ChatData";

interface ChatPageContextType {
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	isGenAble: boolean;
	setIsGenAble: React.Dispatch<React.SetStateAction<boolean>>;
	isGenStart: boolean;
	setIsGenStart: React.Dispatch<React.SetStateAction<boolean>>;
	isEmotionSelectAble: boolean;
	setIsEmotionSelectAble: React.Dispatch<React.SetStateAction<boolean>>;
	addMessage: (content: string) => void;
}

const ChatPageContext = createContext<ChatPageContextType | undefined>(
	undefined
);

export const useChatPage = () => {
	const context = useContext(ChatPageContext);
	if (!context) {
		throw new Error("useChatPage must be used within ChatPageProvider");
	}
	return context;
};

interface ChatPageProviderProps {
	children: ReactNode;
}

export const ChatPageProvider: React.FC<ChatPageProviderProps> = ({
	children,
}) => {
	const [messages, setMessages] = useState<Message[]>(chatdata);
	const [isGenAble, setIsGenAble] = useState(false);
	const [isGenStart, setIsGenStart] = useState(false);
	const [isEmotionSelectAble, setIsEmotionSelectAble] = useState(false);

	const addMessage = (content: string) => {
		const newMessage: Message = {
			chat_id: 123,
			content,
			type: "MEMBER",
			send_time: new Date().toISOString(),
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	return (
		<ChatPageContext.Provider
			value={{
				messages,
				setMessages,
				isGenAble,
				setIsGenAble,
				isGenStart,
				setIsGenStart,
				isEmotionSelectAble,
				setIsEmotionSelectAble,
				addMessage,
			}}
		>
			{children}
		</ChatPageContext.Provider>
	);
};
