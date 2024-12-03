export function formatTime(serverDate: string) {
	const date = new Date(serverDate);
	const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
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
