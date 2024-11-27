// 타입 정의
export interface Emotion {
	id: number;
	title: string;
	category: string;
	description: string;
	example: string;
}

export interface Content {
	order_index: number;
	original_content: string;
	recommend_emotion: Emotion[];
}

export interface EmotionSelectData {
	status: number;
	data: {
		diary_id: number;
		content_list: Content[];
	};
}

// 데이터 정리
export const emotionSelectData: EmotionSelectData = {
	status: 200,
	data: {
		diary_id: 7,
		content_list: [
			{
				order_index: 0,
				original_content:
					"오늘 아침은 평소보다 일찍 일어나서 공원에 갔다. 상쾌한 공기를 마시며 산책을 하니 마음이 차분해졌다.",
				recommend_emotion: [
					{
						id: 48,
						title: "기쁘다",
						category: "기쁨",
						description: "마음속에서 우러나는 가볍고 행복한 기분.",
						example: "좋은 소식을 듣고 기쁜 마음이 들었다.",
					},
					{
						id: 73,
						title: "평화롭다",
						category: "안도",
						description: "마음이 안정되고 조화로운 상태.",
						example:
							"조용한 아침 공기를 마시며 평화로운 기분이 들었다.",
					},
					{
						id: 55,
						title: "맑다",
						category: "긍정",
						description: "깨끗하고 투명한 느낌을 주는 기분.",
						example: "맑은 하늘을 보며 상쾌함을 느꼈다.",
					},
					{
						id: 80,
						title: "자부하다",
						category: "기쁨",
						description: "스스로에 대해 자랑스럽게 여기는 마음.",
						example: "규칙적인 생활을 유지하며 자부심을 느꼈다.",
					},
					{
						id: 96,
						title: "흥겹다",
						category: "기쁨",
						description: "마음이 들뜨고 기분이 좋게 고조된 상태.",
						example: "아침 산책에서 느껴지는 흥겨운 기분.",
					},
					{
						id: 407,
						title: "신기하다",
						category: "흥미",
						description: "평소와는 다른 새로움을 느끼는 상태.",
						example: "아침 풍경이 평소와 달라 신기하게 느껴졌다.",
					},
					{
						id: 85,
						title: "뿌듯하다",
						category: "기쁨",
						description: "작은 성취나 만족감에서 오는 행복한 기분.",
						example:
							"아침 일찍 일어나 규칙적인 생활을 하니 뿌듯했다.",
					},
					{
						id: 104,
						title: "차분하다",
						category: "안정",
						description: "마음이 가라앉고 안정된 상태.",
						example: "상쾌한 공기를 마시며 차분해졌다.",
					},
					{
						id: 28,
						title: "만족하다",
						category: "긍정",
						description:
							"자신의 기대와 상황이 잘 맞아 들어가는 상태.",
						example: "아침 산책이 기대 이상으로 만족스러웠다.",
					},
					{
						id: 92,
						title: "새롭다",
						category: "흥미",
						description: "평소와 다른 변화나 느낌을 경험하는 상태.",
						example: "아침의 새로운 공기가 상쾌하게 다가왔다.",
					},
				],
			},
			{
				order_index: 1,
				original_content:
					"오후에는 직장에서 새로운 프로젝트 미팅이 있었다. 기대와 걱정이 뒤섞였지만, 좋은 아이디어가 나와서 뿌듯했다.",
				recommend_emotion: [
					{
						id: 80,
						title: "자부하다",
						category: "기쁨",
						description: "스스로에 대해 자랑스럽게 여기는 마음.",
						example:
							"프로젝트에서 성공적인 아이디어를 내며 자부심을 느꼈다.",
					},
					{
						id: 5,
						title: "긴장되다",
						category: "공포",
						description:
							"중요한 상황에서 느끼는 불안과 조심스러움.",
						example: "발표를 앞두고 긴장된 마음을 가눌 수 없었다.",
					},
					{
						id: 52,
						title: "두근거리다",
						category: "기쁨",
						description:
							"기대와 설렘으로 인해 심장이 빠르게 뛰는 상태.",
						example:
							"새로운 프로젝트를 시작하며 마음이 두근거렸다.",
					},
					{
						id: 96,
						title: "흥겹다",
						category: "기쁨",
						description: "마음이 들뜨고 기분이 좋게 고조된 상태.",
						example:
							"동료들과 함께 프로젝트에 대한 기대감에 흥겹게 대화했다.",
					},
					{
						id: 88,
						title: "도전하다",
						category: "긍정",
						description: "새로운 일에 맞서는 용기와 열정.",
						example: "어려운 프로젝트지만 도전하는 마음이 생겼다.",
					},
					{
						id: 38,
						title: "우려하다",
						category: "공포",
						description: "미래에 대한 걱정과 불안한 상태.",
						example: "프로젝트 성공 여부에 대해 우려했다.",
					},
					{
						id: 409,
						title: "희망차다",
						category: "기쁨",
						description:
							"앞으로의 일에 대해 긍정적으로 생각하는 상태.",
						example:
							"이번 프로젝트가 성공할 것 같아 희망이 느껴졌다.",
					},
					{
						id: 120,
						title: "안도하다",
						category: "안정",
						description: "걱정에서 벗어나 마음이 놓이는 상태.",
						example: "좋은 아이디어가 떠올라 안도했다.",
					},
					{
						id: 15,
						title: "행복하다",
						category: "기쁨",
						description: "마음이 충만하고 만족스러운 상태.",
						example: "미팅이 잘 끝나고 행복감을 느꼈다.",
					},
					{
						id: 110,
						title: "긍정적이다",
						category: "긍정",
						description: "상황에 대해 낙관적으로 생각하는 상태.",
						example:
							"프로젝트의 성공 가능성을 긍정적으로 바라봤다.",
					},
				],
			},
			{
				order_index: 2,
				original_content:
					"저녁에는 친구와 오랜만에 만나 맛있는 음식을 먹으며 많은 이야기를 나눴다. 정말 행복하고 즐거운 시간이었다.",
				recommend_emotion: [
					{
						id: 83,
						title: "즐겁다",
						category: "기쁨",
						description: "마음이 밝고 기쁜 상태.",
						example: "오랜만에 친구를 만나 즐거운 시간을 보냈다.",
					},
					{
						id: 48,
						title: "기쁘다",
						category: "기쁨",
						description: "마음속에서 우러나는 가볍고 행복한 기분.",
						example: "오랜만에 친구를 보며 기쁜 마음이 들었다.",
					},
					{
						id: 45,
						title: "고취되다",
						category: "기쁨",
						description: "의욕과 열정이 충만해지는 상태.",
						example:
							"친구와 대화를 나누며 긍정적인 기운이 고취되었다.",
					},
					{
						id: 407,
						title: "신기하다",
						category: "흥미",
						description: "평소와는 다른 새로움을 느끼는 상태.",
						example:
							"친구에게서 들은 새로운 이야기가 신기하게 느껴졌다.",
					},
					{
						id: 85,
						title: "뿌듯하다",
						category: "기쁨",
						description: "작은 성취나 만족감에서 오는 행복한 기분.",
						example: "친구와의 만남이 기대 이상으로 뿌듯했다.",
					},
					{
						id: 120,
						title: "안도하다",
						category: "안정",
						description: "걱정에서 벗어나 마음이 놓이는 상태.",
						example: "오랜만에 친구를 만나 안도감을 느꼈다.",
					},
					{
						id: 55,
						title: "맑다",
						category: "긍정",
						description: "깨끗하고 투명한 느낌을 주는 기분.",
						example: "친구와의 대화가 맑은 기분을 줬다.",
					},
					{
						id: 52,
						title: "두근거리다",
						category: "기쁨",
						description:
							"기대와 설렘으로 인해 심장이 빠르게 뛰는 상태.",
						example: "오랜만에 친구와의 만남이 두근거렸다.",
					},
					{
						id: 110,
						title: "긍정적이다",
						category: "긍정",
						description: "상황에 대해 낙관적으로 생각하는 상태.",
						example: "친구와의 대화로 긍정적인 에너지가 생겼다.",
					},
					{
						id: 15,
						title: "행복하다",
						category: "기쁨",
						description: "마음이 충만하고 만족스러운 상태.",
						example: "친구와 함께 보낸 시간이 행복했다.",
					},
				],
			},
		],
	},
};
