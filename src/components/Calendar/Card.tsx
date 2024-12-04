import React, { useState } from "react";
import { FinalDiary } from "../../api/diary";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import sampleImg from "/Users/minsik/Documents/Projects/A-Neuk-FE/src/assets/images/odocat.png";

interface CardProps {
	curDiary: FinalDiary | null;
}

const Card: React.FC<CardProps> = ({ curDiary }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const sampleContent: FinalDiary = {
		data: {
			diary_id: 9,
			date: "2024-12-03",
			content:
				"금요일 마감이라는 부담감이 계속 머리를 짓누르고 있었지만, 그만큼 열심히 집중해서 일해야 한다고 스스로 다짐했다.프로젝트 자체는 흥미롭지만, 마감이 다가오면서 시간이 부족한 느낌이다.하루 종일 코드와 씨름하며, 작은 성취감과 함께 다시금 현실의 벽을 느꼈다.그래도 오늘은 조금 일찍 잠을 청해야겠다. 내일도 힘내자!오늘은 정말 피곤한 하루였다. LLM을 이용한 감정일기 작성 프로덕트를 개발하느라 정신없이 보냈고, 그 과정에서 불안함과 초조함이 가득했다. 새로운 시도를 하다 보니 긴장감도 느껴졌지만, 이러한 감정들이 나를 더욱 성장하게 만들 것이라는 생각이 들었다.이번 주는 정말 정신없이 지나가고 있지만, 바쁜 일상 속에서도 내가 좋아하는 일을 할 수 있다는 사실에 행복함을 느낀다. 그럼에도 불구하고 가끔 불안한 마음이 드는 것도 사실이다. 이런 감정의 소용돌이 속에서, 내가 좋아하는 일에 감사하는 마음을 잊지 않으려 한다.",
			imageUrl: sampleImg,
			emotionList: [
				{
					id: 5,
					title: "긴장되다",
					category: "공포",
					description: "마음을 놓지 못하고 정신을 바짝 차리게 되다.",
					example:
						"중요한 발표를 앞두고 손에 땀이 날 정도로 긴장되었다.",
				},
				{
					id: 14,
					title: "불안하다",
					category: "공포",
					description: "마음이 편하지 않고 조마조마하다.",
					example:
						"시험 결과 발표를 기다리는 동안 불안한 기분이 들었다.",
				},
				{
					id: 31,
					title: "초조하다",
					category: "공포",
					description:
						"답답하거나 안타깝거나 걱정이 되어 마음이 조마조마하다.",
					example: "면접 시간이 다가오면서 점점 초조함을 느꼈다.",
				},
			],
		},
	};

	const handleCardClick = () => {
		setIsFlipped(!isFlipped);
	};

	if (curDiary === null) {
		return (
			<div className="flex flex-1 justify-center items-center">
				<div className="font-pretendard-regular text-xl text-black-aneuk">
					이날은 일기가 없어요~
				</div>
			</div>
		);
	}

	return (
		<div
			className="group flex flex-col w-[90%] aspect-[2/2.8] mt-[5%] [perspective:1000px]"
			onClick={handleCardClick}
		>
			<div
				className={`relative h-full w-full rounded-[32px] shadow-custom-strong transition-all duration-500 [transform-style:preserve-3d] 
                    ${isFlipped ? "[transform:rotateY(-180deg)]" : ""}`}
			>
				<div
					className={`absolute inset-0 flex flex-col w-full h-full p-2 bg-white rounded-[32px] [backface-visibility:hidden]`}
				>
					<img
						src={sampleContent.data.imageUrl}
						alt="Diary Image"
						className="flex flex-col justify-center items-center w-[100%] h-[80%] rounded-[24px] object-cover"
					/>
					<div className="flex flex-row flex-1 justify-start items-start p-2 space-x-2">
						<div className="aspect-square w-[8%] rounded-full bg-green-500" />
						<div className="aspect-square w-[8%] rounded-full bg-blue-500" />
					</div>
				</div>
				<div
					className={`absolute inset-0 flex flex-col justify-start items-start w-full h-full p-7 bg-white rounded-[32px] [transform:rotateY(-180deg)] [backface-visibility:hidden]`}
				>
					<div className="font-gowun-bold text-lg text-black-aneuk mb-2">
						{format(
							new Date(sampleContent.data.date),
							"yyyy.MM.dd EEEE",
							{ locale: ko }
						)}
					</div>
					<div className="font-gowun-regular text-black-aneuk text-base text-start overflow-y-auto">
						{sampleContent.data.content}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
