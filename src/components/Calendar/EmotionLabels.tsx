import { FinalDiary } from "../../api/diary";
import { getEmotionColor } from "../../utils/GetEmotionColor";

interface EmotionLabelsProps {
	curDiary: FinalDiary | null;
	selectedEmotionId: number | null;
	setSelectedEmotionId: React.Dispatch<React.SetStateAction<number | null>>;
	descriptionRef: React.RefObject<HTMLDivElement>;
}

export const EmotionLabels: React.FC<EmotionLabelsProps> = ({
	curDiary,
	selectedEmotionId,
	setSelectedEmotionId,
	descriptionRef,
}) => {
	const handleEmotionClick = (id: number) => {
		setSelectedEmotionId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div className="flex flex-row flex-wrap justify-start items-start px-11 pt-6 w-full duration-500 ease-in-out animate-slide-up">
			{curDiary &&
				curDiary.data.emotionList.map((emotion) => {
					const isSelected = selectedEmotionId === emotion.id;
					return (
						<div
							key={emotion.id}
							className={`flex flex-col justify-start items-start ${
								isSelected && "w-full"
							}`}
						>
							<div
								onClick={() => handleEmotionClick(emotion.id)}
								className={`flex flex-row space-x-2 mr-2 mb-2 justify-start items-center py-0.5 pl-1 pr-2.5 bg-white text-black-aneuk border rounded-full cursor-pointer  ${
									isSelected
										? "font-gowun-bold shadow-custom-strong h-12 text-2xl"
										: "font-gowun-regular text-xl"
								} transition-all duration-300 ease-in-out`}
							>
								<div
									className={`${getEmotionColor(
										emotion.category
									)} rounded-full ${
										isSelected ? "w-9 h-9" : "w-6 h-6"
									}`}
								/>
								<div>{emotion.title}</div>
							</div>

							{isSelected && (
								<div
									ref={descriptionRef}
									className="flex flex-col justify-center items-center w-full mt-2 mb-4 text-black-aneuk"
								>
									<div className="font-pretendard-regular text-lg text-black-aneuk mb-2 text-center">
										{emotion.description}
									</div>
									<div className="font-pretendard text-base text-zinc-400 text-center">
										"{emotion.example}"
									</div>
								</div>
							)}
						</div>
					);
				})}
		</div>
	);
};
