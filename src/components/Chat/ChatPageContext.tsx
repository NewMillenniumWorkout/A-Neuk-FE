import React, {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from "react";
import { Message } from "./ChatData";
import { API_CHAT } from "../../api/chat";

interface ChatPageContextType {
	curChatId: number | null;
	setCurChatId: React.Dispatch<React.SetStateAction<number | null>>;
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	isGenAble: boolean;
	setIsGenAble: React.Dispatch<React.SetStateAction<boolean>>;
	isGenStart: boolean;
	setIsGenStart: React.Dispatch<React.SetStateAction<boolean>>;
	isEmotionSelectAble: boolean;
	setIsEmotionSelectAble: React.Dispatch<React.SetStateAction<boolean>>;
	addMessage: (chatId: number, content: string) => void;
	userImage: string | null;
	setUserImage: React.Dispatch<React.SetStateAction<string | null>>;
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

interface MessageSend {
	chat_id: number;
	content: string;
}

export const ChatPageProvider: React.FC<ChatPageProviderProps> = ({
	children,
}) => {
	const [curChatId, setCurChatId] = useState<number | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isGenAble, setIsGenAble] = useState(false);
	const [isGenStart, setIsGenStart] = useState(false);
	const [isEmotionSelectAble, setIsEmotionSelectAble] = useState(false);
	const [userImage, setUserImage] = useState<string | null>(null);

	const addMessage = async (chatId: number, content: string) => {
		const newMessage: MessageSend = {
			chat_id: chatId,
			content: content,
		};
		const tempMessage = {
			id: chatId,
			content: content,
			type: "MEMBER",
			sentTime: new Date().toISOString(),
		};
		try {
			setMessages((prevMessages) => [...prevMessages, tempMessage]);
			await API_CHAT.sendMessage(newMessage);
			const response = await API_CHAT.fetchChatHistory(chatId);
			setMessages(response.data.data);
		} catch (error) {
			console.error("Error sending messages:", error);
		}
	};

	useEffect(() => {
		if (userImage && isGenStart) {
			setIsEmotionSelectAble(true);
		} else {
			setIsEmotionSelectAble(false);
		}
	}, [userImage, isGenStart]);

	return (
		<ChatPageContext.Provider
			value={{
				curChatId,
				setCurChatId,
				messages,
				setMessages,
				isGenAble,
				setIsGenAble,
				isGenStart,
				setIsGenStart,
				isEmotionSelectAble,
				setIsEmotionSelectAble,
				addMessage,
				userImage,
				setUserImage,
			}}
		>
			{children}
		</ChatPageContext.Provider>
	);
};
