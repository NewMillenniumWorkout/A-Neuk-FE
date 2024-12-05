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

export function getEmotionTextColor(category: string): string {
	const emotionColors: { [key: string]: string } = {
		공포: "text-horror",
		기쁨: "text-joy",
		놀람: "text-surprise",
		분노: "text-anger",
		슬픔: "text-sadness",
		중성: "text-neutral",
		지루: "text-boredom",
		통증: "text-pain",
		혐오: "text-disgust",
		흥미: "text-interest",
		기타: "text-other",
	};

	return emotionColors[category] || "text-gray-500";
}
