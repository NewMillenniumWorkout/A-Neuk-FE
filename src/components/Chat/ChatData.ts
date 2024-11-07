// src/data/messages.ts
export type Message = {
	chat_id: number;
	content: string;
	type: string;
	send_time: string;
};

export const messages: Message[] = [
	{
		chat_id: 1,
		content: "안녕하세요!",
		type: "text",
		send_time: "2024-11-06T10:00:00Z",
	},
	{
		chat_id: 2,
		content: "이미지를 확인해주세요.",
		type: "image",
		send_time: "2024-11-06T10:05:00Z",
	},
	{
		chat_id: 1,
		content: "어제 보낸 파일입니다.",
		type: "file",
		send_time: "2024-11-06T11:00:00Z",
	},
	{
		chat_id: 3,
		content: "회의는 3시에 시작해요.",
		type: "text",
		send_time: "2024-11-06T12:30:00Z",
	},
];
