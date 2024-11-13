import IconButton from "../IconButton";
import { IconProvider } from "../../utils/IconProvider";

export function InputArea() {
	return (
		<div className="relative p-2">
			<input
				type="text"
				placeholder="메시지를 입력하세요"
				className="w-full h-10 px-4 py-2.5 border rounded-3xl"
			/>
			<SendButton />
		</div>
	);
}

function SendButton() {
	return (
		<button
			className={
				"flex flex-col items-center justify-center h-10 w-10 p-2 absolute top-2 right-2 bg-black-aneuk rounded-full "
			}
			onClick={() => {}}
		>
			<div className={"text-white-aneuk"}>
				<IconProvider.SendIcon />
			</div>
		</button>
	);
}
