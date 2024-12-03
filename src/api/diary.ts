import { EmotionSelectData } from "../components/EmotionSelect/EmotionSelectData";
import apiClient from "./index";

interface NewContent {
	data: {
		paragraph_id: number;
		order_index: number;
		final_content: string;
	};
}

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
	genNewContent: async (
		diary_id: number,
		order_index: number,
		original_content: string,
		emotions: string[]
	): Promise<NewContent> => {
		try {
			const selectData = {
				diary_id: diary_id,
				order_index: order_index,
				original_content: original_content,
				emotions: emotions,
			};
			const response = await apiClient.post<NewContent>(
				`/diary/emotion/select`,
				selectData
			);
			console.log(response);
			return response.data;
		} catch (error: any) {
			console.error("Error generating new content:", error.message);
			throw error;
		}
	},
};
