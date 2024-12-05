import apiClient from "./index";

export const API_CHART = {
	getCollection: async () => {
		try {
			const response = await apiClient.get("/statistics/collection");
			// console.log(response);
			return response;
		} catch (error: any) {
			console.error("Error getting collection:", error.message);
			throw error;
		}
	},

	getLastMonth: async () => {
		try {
			const response = await apiClient.get("/statistics/last30days");
			// console.log(response);
			return response;
		} catch (error: any) {
			console.error("Error getting last month:", error.message);
			throw error;
		}
	},
};
