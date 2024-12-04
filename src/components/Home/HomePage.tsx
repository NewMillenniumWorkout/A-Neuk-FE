import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../api";
import { FinalDiary } from "../../api/diary";
import Card from "../Calendar/Card";
import { getEmotionColor } from "../../utils/GetEmotionColor";

const HomePage: React.FC = () => {
	const [randomDiary, setRandomDiary] = useState<FinalDiary | null>(null);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [isLoading, setIsLoading] = useState(true);
	const [isFlipped, setIsFlipped] = useState(false);
	const [selectedEmotionId, setSelectedEmotionId] = useState<number | null>(
		null
	);

	const containerRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);

	const handleRandomButton = () => {
		const getRandomDiary = async () => {
			try {
				const response = await apiClient.get("/home/random");
				console.log(response);
				setRandomDiary(response.data);
				setIsLoading(false);
			} catch (error: any) {
				console.error("Error getting random diary:", error.message);
				setIsLoading(false);
				throw error;
			}
		};
		getRandomDiary();
	};

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
		setSelectedEmotionId(null);
	}, [date]);

	useEffect(() => {
		console.log(selectedEmotionId);
		setSelectedEmotionId(null);
	}, [isFlipped]);

	useEffect(() => {
		if (
			selectedEmotionId !== null &&
			descriptionRef.current &&
			containerRef.current
		) {
			const descriptionPosition = descriptionRef.current.offsetTop;
			const containerScrollPosition = containerRef.current.scrollTop;

			const extraScroll = 50;

			containerRef.current.scrollTo({
				top:
					descriptionPosition - containerScrollPosition + extraScroll,
				behavior: "smooth",
			});
		}
	}, [selectedEmotionId]);

	const handleEmotionClick = (id: number) => {
		setSelectedEmotionId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div
			ref={containerRef}
			className="flex flex-col space-y-6 flex-grow w-full h-full justify-center items-center bg-white-aneuk pb-24 overflow-y-auto"
		>
			{!isLoading && (
				<Card
					curDiary={randomDiary}
					isFlipped={isFlipped}
					setIsFlipped={setIsFlipped}
				/>
			)}
			{isFlipped && (
				<div className="flex flex-row flex-wrap justify-start items-start px-11 pt-6 w-full duration-500 ease-in-out animate-slide-up">
					{randomDiary &&
						randomDiary.data.emotionList.map((emotion, index) => {
							const isSelected = selectedEmotionId === emotion.id;
							return (
								<div
									key={emotion.id}
									className="flex flex-col justify-start items-start"
								>
									<div
										onClick={() =>
											handleEmotionClick(emotion.id)
										}
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
												isSelected
													? "w-9 h-9"
													: "w-6 h-6"
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
			)}
			<button
				className="bg-black-aneuk text-white font-pretendard-bold p-5 rounded-2xl shadow-xl"
				onClick={handleRandomButton}
			>
				행복버튼
			</button>
		</div>
	);
};

export default HomePage;
