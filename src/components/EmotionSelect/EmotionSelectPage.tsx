import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";
import CheckboxGroup from "./CheckBoxGroup";

const EmotionSelectPage = () => {
	const navigate = useNavigate();
	const {
		emotionData,
		curIndex,
		setCurIndex,
		displayContent,
		setDisplayContent,
		selectedEmotions,
		setSelectedEmotions,
	} = useEmotionSelectPage();

	const contentList = emotionData?.data.content_list;

	const handleNext = () => {
		if (contentList !== undefined) {
			if (curIndex < contentList.length - 1) {
				setCurIndex((prevIndex) => prevIndex + 1);
				setSelectedEmotions([]);
			}
		}
	};

	const handlePrevious = () => {
		if (curIndex > 0) {
			setCurIndex((prevIndex) => prevIndex - 1);
			setSelectedEmotions([]);
		}
	};

	useEffect(() => {
		if (contentList !== undefined)
			setDisplayContent(contentList[curIndex].original_content);
	}, [curIndex]);

	if (contentList === undefined) {
		window.location.replace("/chat");
		return;
	}

	return (
		<div className="absolute inset-0 bg-white-aneuk flex flex-col overflow-hidden">
			<div className="w-full min-h-14 h-14 bg-transparent flex justify-center items-center px-4">
				<button
					onClick={() => {
						navigate(-1);
					}}
					className="absolute left-4"
				>
					<IconProvider.LeftArrowIcon className="w-8 h-8" />
				</button>
			</div>
			<div className="w-full flex-1 flex-col pt-[5%] justify-center items-center">
				<div className="w-full flex flex-col items-center pb-36">
					<div className="font-pretendard font-bold text-2xl text-[#6F6F6F] mb-8">
						느꼈던 감정에 가까운 단어가 있나요?
					</div>
					<div className="flex flex-col w-[90%] aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong overflow-hidden">
						<div className="mb-5 ml-1 font-gowun-bold text-xl text-black-aneuk text-opacity-80 tracking-widest">
							#{curIndex + 1}/{contentList.length}
						</div>
						<div className="min-h-[20%] max-h-[40%] mb-6 overflow-y-auto">
							<div className="font-gowun-regular text-black-aneuk text-opacity-80 text-xl">
								{displayContent}
							</div>
						</div>
						<div className="ml-2 mb-2 font-gowun-regular text-[#6F6F6F] text-sm">
							추천 단어
						</div>
						<div className="flex-1 px-2 overflow-y-auto">
							<CheckboxGroup />
						</div>

						<div className="flex justify-between mt-4">
							<button
								onClick={handlePrevious}
								disabled={curIndex === 0}
								className="pr-2 pl-2.5 py-2.5 text-black-aneuk border-[1px] rounded-full disabled:opacity-50"
							>
								<IconProvider.LeftArrowIcon className="mr-0.5" />
							</button>
							<button
								onClick={handleNext}
								disabled={curIndex === contentList.length - 1}
								className="pl-2 pr-2.5 py-2.5 text-black-aneuk border-[1px] rounded-full disabled:opacity-50"
							>
								<IconProvider.RightArrowIcon className="ml-0.5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmotionSelectPage;
