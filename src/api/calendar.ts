import apiClient from "./index";
import { FinalDiary } from "./diary";

export const API_CALENDAR = {
	getMonthDiary: async (month: string) => {
		try {
			const response = await apiClient.get(
				`/get-diary/month?month=${month}`
			);
			return response.data;
		} catch (error: any) {
			console.error("Error get monthly diaries:", error.message);
			throw error;
		}
	},
	getDateDiary: async (date: string): Promise<FinalDiary> => {
		try {
			console.log(date);
			const response = await apiClient.get<FinalDiary>(
				`/get-diary/day?date=${date}`
			);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			console.error("Error get date diary:", error.message);
			throw error;
		}
	},
	getDiaryByDiaryId: async (diaryId: number): Promise<FinalDiary> => {
		try {
			console.log(diaryId);
			const response = await apiClient.get<FinalDiary>(
				`/get-diary/diary-id?diary-id=${diaryId}`
			);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			console.error("Error get diary by diary id:", error.message);
			throw error;
		}
	},
};
