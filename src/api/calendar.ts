import apiClient from "./index";

export const API_CALENDAR = {
	getMonthDiary: async (month: string) => {
		try {
			const response = await apiClient.get(
				`/get-diary/month?month=${month}`
			);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			console.error("Error get monthly diaries:", error.message);
			throw error;
		}
	},
};
