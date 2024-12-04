export function formatTime(serverDate: Date) {
	const koreanDate = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000);

	console.log("서버시간", serverDate);
	const hours = koreanDate.getHours();
	const minutes = koreanDate.getMinutes();
	const period = hours < 12 ? "오전" : "오후";
	const formattedHours = hours % 12 || 12;
	return `${period} ${formattedHours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
}

export function formatDate(serverDate: Date): string {
	const koreanDate = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000);
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(koreanDate);
}

export const formatToYYYYMM = (serverDate: Date): string => {
	const koreanDate = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000);
	const year = koreanDate.getFullYear();
	const month = String(koreanDate.getMonth() + 1).padStart(2, "0");
	return `${year}-${month}`;
};

export const formatToYYYYMMDD = (serverDate: Date): string => {
	const koreanDate = new Date(serverDate.getTime() + 9 * 60 * 60 * 1000);
	const year = koreanDate.getFullYear();
	const month = String(koreanDate.getMonth() + 1).padStart(2, "0");
	const date = String(koreanDate.getDate()).padStart(2, "0");
	return `${year}-${month}-${date}`;
};
