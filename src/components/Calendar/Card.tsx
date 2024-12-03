import React, { useState } from "react";
import { FinalDiary } from "../../api/diary";

interface CardProps {
	curDiary: FinalDiary | null;
}

const Card: React.FC<CardProps> = ({ curDiary }) => {
	const [isFlipped, setIsFlipped] = useState(false);

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

	const imageUrl = curDiary.data.imageUrl;

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
						src={imageUrl}
						alt="Diary Image"
						className="flex flex-col justify-center items-center w-[100%] h-[80%] rounded-[24px] object-cover"
					/>
					<div className="flex flex-row flex-1 justify-start items-start p-2 space-x-2">
						<div className="aspect-square w-[8%] rounded-full bg-green-500" />
						<div className="aspect-square w-[8%] rounded-full bg-blue-500" />
					</div>
				</div>
				<div
					className={`absolute inset-0 flex flex-col w-full h-full bg-white rounded-[32px] [transform:rotateY(-180deg)] [backface-visibility:hidden] justify-center items-center`}
				>
					<div className="text-center p-4">
						{curDiary.data.content}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
