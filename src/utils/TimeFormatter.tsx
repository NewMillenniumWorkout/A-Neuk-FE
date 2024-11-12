export function formatTime(time: string) {
	const date = new Date(time);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const period = hours < 12 ? "오전" : "오후";
	const formattedHours = hours % 12 || 12;

	return `${period} ${formattedHours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}
