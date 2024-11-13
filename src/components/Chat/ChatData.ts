export type Message = {
	chat_id: number;
	content: string;
	type: string;
	send_time: string;
};

export const messages: Message[] = [
	{
		chat_id: 123,
		content: "오늘 하루는 어땠어?",
		type: "ASSISTANT",
		send_time: "2024-11-06T10:00:00Z",
	},
	{
		chat_id: 123,
		content: "신나는 하루였어",
		type: "MEMBER",
		send_time: "2024-11-06T10:00:00Z",
	},
	{
		chat_id: 123,
		content: "뭐 했는데?",
		type: "ASSISTANT",
		send_time: "2024-11-06T10:05:00Z",
	},
	{
		chat_id: 123,
		content: "코딩을 했어",
		type: "MEMBER",
		send_time: "2024-11-06T11:00:00Z",
	},
	{
		chat_id: 123,
		content:
			"코딩을 해서 재미있었구나. 어떤 코딩을 했어?코딩을 해서 재미있었구나. 어떤 코딩을 했어?코딩을 해서 재미있었구나. 어떤 코딩을 했어?코딩을 해서 재미있었구나. 어떤 코딩을 했어?코딩을 해서 재미있었구나. 어떤 코딩을 했어?",
		type: "ASSISTANT",
		send_time: "2024-11-06T12:30:00Z",
	},
	{
		chat_id: 123,
		content: "하루가 지났군",
		type: "MEMBER",
		send_time: "2024-11-06T15:00:00Z",
	},
	{
		chat_id: 123,
		content:
			"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
		type: "ASSISTANT",
		send_time: "2024-11-07T12:30:00Z",
	},
];
