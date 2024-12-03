import React, { useState } from "react";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";

const CheckboxGroup: React.FC = ({}) => {
	const {
		emotionData,
		curIndex,
		curDescIndex,
		setCurDescIndex,
		selectedEmotions,
		setSelectedEmotions,
	} = useEmotionSelectPage();
	const handleCheckboxChange = (label: string) => {
		if (selectedEmotions.includes(label)) {
			setSelectedEmotions(
				selectedEmotions.filter((option) => option !== label)
			);
		} else {
			setSelectedEmotions([...selectedEmotions, label]);
		}
	};
	const contentList = emotionData.data.content_list;
	const options = contentList[curIndex].recommend_emotion;

	return (
		<div>
			{options.map((option, index) => (
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
								className="form-checkbox size-4 text-blue-600"
							/>
							<div className="h-6 justify-between items-center">
								<span className="text-black-aneuk text-xl font-gowun-regular">
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
							<IconProvider.DownArrowIcon className="ml-0.5" />
						</button>
					</div>
					{curDescIndex === index && (
						<div
							className={`flex flex-col items-center w-full p-1`}
						>
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
		</div>
	);
};

export default CheckboxGroup;
