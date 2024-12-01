import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://aneuk-api.dev-lr.com",
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem("userToken");
		if (!token) {
			console.error("No user token found in sessionStorage.");
			return Promise.reject(new Error("Authorization token is missing"));
		}
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response || error.message);
		console.log(sessionStorage.getItem("userToken"));
		if (error.response && error.response.status === 403) {
			console.error("Token is invalid or expired. Redirecting to login.");
			sessionStorage.clear();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default apiClient;
