import { EmotionSelectData } from "../components/EmotionSelect/EmotionSelectData";
import apiClient from "./index";

interface NewContent {
	data: {
		paragraph_id: number;
		order_index: number;
		final_content: string;
	};
}

interface FinalDiary {
	data: {
		diary_id: number;
		date: string;
		content: string;
	};
}

export const API_DIARY = {
	getEmotions: async (chatId: number): Promise<EmotionSelectData> => {
		try {
			const response = await apiClient.post<EmotionSelectData>(
				`/diary/emotion/list?chatId=${chatId}`
			);
			// console.log(response.data);
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
	genFinalDiary: async (diaryId: number): Promise<FinalDiary> => {
		try {
			const response = await apiClient.get<FinalDiary>(
				`/diary/second-generate?diaryId=${diaryId}`
			);
			// console.log(response.data.data.content);
			return response.data;
		} catch (error: any) {
			console.error("Error generating final diary:", error.message);
			throw error;
		}
	},
};
