import { EmotionSelectData } from "../components/EmotionSelect/EmotionSelectData";
import apiClient from "./index";

export const API_DIARY = {
	getEmotions: async (chatId: number): Promise<EmotionSelectData> => {
		try {
			const response = await apiClient.post<EmotionSelectData>(
				`/diary/emotion/list?chatId=${chatId}`
			);
			return response.data;
		} catch (error: any) {
			console.error("Error generating first diary:", error.message);
			throw error;
		}
	},
};
