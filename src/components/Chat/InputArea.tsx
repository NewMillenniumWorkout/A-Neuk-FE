import { IconProvider } from "../../utils/IconProvider";
import { useRef, useState } from "react";
import { useChatPage } from "./ChatPageContext";

interface InputAreaProps {
	onSend: (chatId: number, content: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend }) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [inputValue, setInputValue] = useState("");
	const { curChatId, isGenStart, isLoading } = useChatPage();

	const autoHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	const resetHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}
	};

	const handleSend = () => {
		if (inputValue.trim()) {
			onSend(curChatId!, inputValue.trim());
			setInputValue("");
			resetHeight();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (isLoading) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="flex flex-row justify-end items-end relative p-2 bg-white z-50">
			<textarea
				ref={textareaRef}
				disabled={isGenStart}
				placeholder={
					isGenStart
						? "지금은 일기를 작성하고 있어요!"
						: "메시지를 입력하세요"
				}
				className={`w-full max-h-32 h-11 min-h-11 pl-4 pr-14 py-2.5 leading-5 border-gray-300 box-border rounded-[22px] resize-none overflow-y-auto break-words focus:border-gray-300 focus:ring-0 focus:outline-none scrollbar-hide ${
					isGenStart ? "bg-gray-100 border-0" : "bg-white border"
				}`}
				rows={1}
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					autoHeight();
				}}
				onKeyDown={handleKeyDown}
			/>
			<InputAreaButton onClick={handleSend} />
		</div>
	);
};

interface InputAreaButtonProps {
	onClick: () => void;
}

const InputAreaButton: React.FC<InputAreaButtonProps> = ({ onClick }) => {
	const { isGenStart, isLoading } = useChatPage();
	return (
		<button
			className={`absolute right-2.5 flex mb-0.5 items-center justify-center h-10 w-10 min-w-10 rounded-full bg-black-aneuk disabled:opacity-50 ${
				isGenStart && "scale-0"
			} transition-all duration-500 ease-in-out`}
			onClick={onClick}
			onMouseDown={(e) => e.preventDefault()}
			disabled={isLoading}
		>
			<div className="text-white-aneuk">
				<IconProvider.SendIcon />
			</div>
		</button>
	);
};

export default InputArea;
