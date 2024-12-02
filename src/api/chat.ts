import apiClient from "./index";

export const API_CHAT = {
	fetchInitialMessage: async () => {
		try {
			const response = await apiClient.get("/chat/init-message");
			return response.data;
		} catch (error: any) {
			console.error("Error fetching initial messages:", error.message);
			throw error;
		}
	},

	fetchChatHistory: async (chatId: number) => {
		try {
			const response = await apiClient.get("/chat/total", {
				params: { chatId },
			});
			return response;
		} catch (error: any) {
			console.error("Error fetching chat history:", error.message);
			throw error;
		}
	},

	sendMessage: async (data: { chatId: number; content: string }) => {
		try {
			await apiClient.post<void>("/chat/submit-message", {
				body: JSON.stringify(data),
			});
		} catch (error: any) {
			// console.error("Error sending message:", error.message);
			throw error;
		}
	},
};
