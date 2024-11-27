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
				<div className="flex flex-col">
					<div className="flex flex-row">
						<label
							key={option.id}
							className="flex w-full items-center cursor-pointer space-x-2"
						>
							<input
								type="checkbox"
								checked={selectedEmotions.includes(
									option.title
								)}
								onChange={() =>
									handleCheckboxChange(option.title)
								}
								className="form-checkbox text-blue-600"
							/>
							<div className="h-6 my-2 justify-between items-center">
								<span className="text-black-aneuk text-md font-gowun-bold">
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
						<div className={`w-full`}>
							<div className="font-pretendard font-normal">
								{option.description}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default CheckboxGroup;
