// src/data/messages.ts
export type Message = {
	chat_id: number;
	content: string;
	type: string;
	send_time: string;
};

export const messages: Message[] = [
	{
		chat_id: 2,
		content: "오늘 하루는 어땠어?",
		type: "text",
		send_time: "2024-11-06T10:00:00Z",
	},
	{
		chat_id: 1,
		content: "신나는 하루였어",
		type: "text",
		send_time: "2024-11-06T10:00:00Z",
	},
	{
		chat_id: 2,
		content: "뭐 했는데?",
		type: "image",
		send_time: "2024-11-06T10:05:00Z",
	},
	{
		chat_id: 1,
		content: "코딩을 했어",
		type: "file",
		send_time: "2024-11-06T11:00:00Z",
	},
	{
		chat_id: 2,
		content: "코딩을 해서 재미있었구나. 어떤 코딩을 했어?",
		type: "text",
		send_time: "2024-11-06T12:30:00Z",
	},
];
