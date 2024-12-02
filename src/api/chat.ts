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

	sendMessage: async (data: { chat_id: number; content: string }) => {
		try {
			await apiClient.post<void>("/chat/submit-message", data);
		} catch (error: any) {
			console.error("Error sending message:", error.message);
			throw error;
		}
	},

	sendImage: async (chatId: number, image: File) => {
		try {
			const formData = new FormData();
			formData.append("image", image);

			await apiClient.post<void>(
				`/chat/submit-image?chat_id=${chatId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		} catch (error: any) {
			console.error(
				"Error sending image:",
				error.response?.data || error.message
			);
			throw error;
		}
	},
};
