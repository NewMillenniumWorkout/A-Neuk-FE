import React from "react";
import CheckboxGroup from "./CheckBoxGroup";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";
import { Content } from "./EmotionSelectData";

interface EmotionCardProps {
	contentList: Content[];
	isLoading: boolean;
}

const EmotionCard: React.FC<EmotionCardProps> = ({
	contentList,
	isLoading,
}) => {
	const { curIndex, displayContent } = useEmotionSelectPage();
	return (
		<div
			className={`flex flex-col w-[90%] aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong overflow-hidden z-10 mb-8 ${
				curIndex % 2 === 0
					? "animate-small-spin-r"
					: "animate-small-spin-l"
			}`}
		>
			<div className="mb-5 ml-1 font-gowun-bold text-xl text-black-aneuk text-opacity-80 tracking-widest">
				#{curIndex + 1}/{contentList.length}
			</div>
			<div className="min-h-[20%] max-h-[40%] mb-6 overflow-y-auto">
				{isLoading ? (
					<div role="status" className="max-w-sm animate-pulse">
						<div className="h-5 bg-gray-200 rounded-full mb-4"></div>
						<div className="h-5 bg-gray-200 rounded-full mb-4"></div>
						<div className="h-5 bg-gray-200 rounded-full max-w-[280px] mb-4"></div>
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<div className="font-gowun-regular text-black-aneuk text-opacity-80 text-xl">
						{displayContent}
					</div>
				)}
			</div>
			<div className="ml-2 mb-2 font-gowun-regular text-[#6F6F6F] text-sm">
				추천 단어
			</div>
			<div className="flex-1 px-2 overflow-y-auto">
				<CheckboxGroup />
			</div>
		</div>
	);
};

export default EmotionCard;
