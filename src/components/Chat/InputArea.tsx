import { IconProvider } from "../../utils/IconProvider";
import { useRef, useState } from "react";
import { messages, Message } from "./ChatData";

export function InputArea({ onSend }: { onSend: (content: string) => void }) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [inputValue, setInputValue] = useState("");

	const autoHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	const handleSend = () => {
		if (inputValue.trim()) {
			onSend(inputValue.trim());
			setInputValue("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
			console.log("로그로그");
		}
	};

	return (
		<div className="flex flex-row justify-end items-end relative p-2 bg-white">
			<textarea
				ref={textareaRef}
				placeholder="메시지를 입력하세요"
				className="w-full max-h-32 h-11 min-h-11 px-4 py-2.5 mr-2 border rounded-3xl resize-none overflow-y-auto break-words focus:outline-none"
				style={{
					lineHeight: "1.5",
					boxSizing: "border-box",
				}}
				rows={1}
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					autoHeight();
				}}
				onKeyDown={handleKeyDown}
			/>
			<SendButton onClick={handleSend} />
		</div>
	);
}

function SendButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			className={
				"flex items-center justify-center h-11 w-11 min-w-11 bg-black-aneuk rounded-full "
			}
			onClick={onClick}
		>
			<div className={"text-white-aneuk"}>
				<IconProvider.SendIcon />
			</div>
		</button>
	);
}
