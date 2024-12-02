import apiClient from "./index";

export const API_DIARY = {
	getEmotions: async (chatId: number) => {
		try {
			await apiClient.post<void>("/diary/emotion/list", chatId);
		} catch (error: any) {
			console.error("Error generating first diary:", error.message);
			throw error;
		}
	},
};
