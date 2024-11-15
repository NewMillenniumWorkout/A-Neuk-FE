import { IconProvider } from "../../utils/IconProvider";
import { useRef } from "react";

export function InputArea() {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const autoHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	return (
		<div className="flex flex-row justify-end items-end relative p-2 ">
			<textarea
				ref={textareaRef}
				placeholder="메시지를 입력하세요"
				className="w-full max-h-40 h-11 px-4 py-2.5 mr-2 border rounded-3xl resize-none overflow-y-auto break-words focus:outline-none"
				style={{
					lineHeight: "1.5",
					boxSizing: "border-box",
				}}
				rows={1}
				onInput={autoHeight}
			/>
			<SendButton />
		</div>
	);
}

function SendButton() {
	return (
		<button
			className={
				"flex items-center justify-center h-11 w-11 min-w-11 bg-black-aneuk rounded-full "
			}
			onClick={() => {}}
		>
			<div className={"text-white-aneuk"}>
				<IconProvider.SendIcon />
			</div>
		</button>
	);
}
