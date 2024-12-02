import apiClient from "./index";

export const API_DIARY = {
	getEmotions: async (chatId: number) => {
		try {
			const response = await apiClient.post<void>(
				`/diary/emotion/list?chatId=${chatId}`
			);
			console.log(response.data);
		} catch (error: any) {
			console.error("Error generating first diary:", error.message);
			throw error;
		}
	},
};
