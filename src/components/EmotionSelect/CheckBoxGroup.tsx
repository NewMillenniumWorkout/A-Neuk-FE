import React, { useState, useEffect } from "react";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";
import { getEmotionTextColor } from "../../utils/GetEmotionColor";

const MAX_SELECTION = 4;

const CheckboxGroup: React.FC = () => {
	const {
		emotionData,
		curIndex,
		curDescIndex,
		setCurDescIndex,
		selectedEmotions,
		setSelectedEmotions,
	} = useEmotionSelectPage();
	const [visibleCount, setVisibleCount] = useState(5);

	const handleCheckboxChange = (label: string) => {
		if (selectedEmotions.includes(label)) {
			setSelectedEmotions(
				selectedEmotions.filter((option) => option !== label)
			);
		} else {
			if (selectedEmotions.length < MAX_SELECTION) {
				setSelectedEmotions([...selectedEmotions, label]);
			} else {
				alert(`최대 ${MAX_SELECTION}개까지 선택할 수 있습니다.`);
			}
		}
	};

	useEffect(() => {
		setVisibleCount(5);
		setCurDescIndex(null);
	}, [curIndex, setCurDescIndex]);

	const contentList = emotionData?.data.content_list;

	if (!contentList || !contentList[curIndex]) {
		return <div>Loading...</div>;
	}

	const emotions = contentList[curIndex].recommend_emotion;
	const displayedEmotions = emotions.slice(0, visibleCount);

	return (
		<div>
			{displayedEmotions.map((option, index) => (
				<div key={option.id} className="flex flex-col">
					<div className="flex flex-row items-center mb-4">
						<label className="flex w-full items-center cursor-pointer space-x-3">
							<input
								type="checkbox"
								checked={selectedEmotions.includes(
									option.title
								)}
								onChange={() =>
									handleCheckboxChange(option.title)
								}
								className={`form-checkbox rounded-md size-6 focus:outline-none focus:ring-0  ${getEmotionTextColor(
									option.category
								)}`}
							/>
							<div className="h-6 justify-between items-center">
								<span className="leading-tight text-black-aneuk text-xl font-gowun-regular">
									{option.title}
								</span>
							</div>
						</label>

						<button
							onClick={() => {
								if (curDescIndex !== index)
									setCurDescIndex(index);
								else setCurDescIndex(null);
							}}
							className="text-gray-aneuk"
						>
							<IconProvider.DownArrowIcon className="ml-0.5 size-8" />
						</button>
					</div>
					{curDescIndex === index && (
						<div className="flex flex-col items-center w-full p-1">
							<div className="font-pretendard text-lg text-black-aneuk mb-2 text-center">
								{option.description}
							</div>
							<div className="font-pretendard text-lg text-gray-aneuk text-center">
								"{option.example}"
							</div>
						</div>
					)}
				</div>
			))}
			{visibleCount < emotions.length && (
				<div className="flex justify-center mt-4">
					<button
						onClick={() => setVisibleCount((prev) => prev + 5)}
						className="flex flex-row justify-center items-center pl-6 pr-3 py-2 border rounded-full bg-white shadow-sm text-black-aneuk"
					>
						더보기
						<IconProvider.DownArrowIcon className="ml-1" />
					</button>
				</div>
			)}
		</div>
	);
};

export default CheckboxGroup;
