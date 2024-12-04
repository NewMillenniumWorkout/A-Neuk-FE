export function getEmotionColor(category: string): string {
	const emotionColors: { [key: string]: string } = {
		공포: "bg-horror",
		기쁨: "bg-joy",
		놀람: "bg-surprise",
		분노: "bg-anger",
		슬픔: "bg-sadness",
		중성: "bg-neutral",
		지루: "bg-boredom",
		통증: "bg-pain",
		혐오: "bg-disgust",
		흥미: "bg-interest",
		기타: "bg-other",
	};

	return emotionColors[category] || "bg-gray-500";
}
