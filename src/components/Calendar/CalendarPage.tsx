import React, { useEffect, useState, useRef } from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM, formatToYYYYMMDD } from "../../utils/TimeFormatter";
import { FinalDiary } from "../../api/diary";

const CalendarPage: React.FC = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [diaryDates, setDiaryDates] = useState<string[]>([]);
	const [curDiary, setCurDiary] = useState<FinalDiary | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedEmotionId, setSelectedEmotionId] = useState<number | null>(
		null
	);

	const containerRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadInitialData = async () => {
			if (!date) return;
			const tempDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
			try {
				const formattedMonth = formatToYYYYMM(tempDate);
				const monthResponse = await API_CALENDAR.getMonthDiary(
					formattedMonth
				);
				const diaries = monthResponse.data.diaries_with_diary || [];
				const diaryDates = diaries.map((diary: any) =>
					formatToYYYYMMDD(new Date(diary.month))
				);
				setDiaryDates(diaryDates);

				const formattedDate = formatToYYYYMMDD(tempDate);
				if (diaryDates.includes(formattedDate)) {
					const dateResponse = await API_CALENDAR.getDateDiary(
						formattedDate
					);
					setCurDiary(dateResponse);
				}

				setIsLoading(false);
			} catch (error: any) {
				console.error("Error loading initial data: ", error);
				setIsLoading(false);
			}
		};

		loadInitialData();
	}, []);

	useEffect(() => {
		const loadDateDiary = async () => {
			if (!date) return;
			const tempDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);

			const formattedDate = formatToYYYYMMDD(tempDate);
			if (!diaryDates.includes(formattedDate)) {
				if (curDiary != null) setCurDiary(null);
				return;
			}

			try {
				const response = await API_CALENDAR.getDateDiary(formattedDate);
				setCurDiary(response);
			} catch (error: any) {
				console.error("Error loading date diary: ", error);
			}
		};

		if (diaryDates.length > 0) {
			loadDateDiary();
		}
	}, [date, diaryDates]);

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
		<div className="flex flex-col w-full h-full bg-white-aneuk">
			<div className="flex-shrink-0 w-full px-4 pt-4 pb-6 z-20 rounded-b-xl bg-white shadow-md">
				<WeeklyCalendar
					mode="single"
					selectedDate={date}
					onDateChange={setDate}
					className="w-full"
					diaryDates={diaryDates}
				/>
			</div>
			<div
				ref={containerRef}
				className="flex flex-col flex-grow justify-start items-center bg-white-aneuk pb-24 overflow-y-auto"
			>
				{!isLoading && <Card curDiary={curDiary} />}

				<div className="flex flex-row flex-wrap justify-start items-start px-11 pt-6 w-full">
					{curDiary &&
						curDiary.data.emotionList.map((emotion, index) => {
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
											className={` bg-blue-600 rounded-full ${
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
			</div>
		</div>
	);
};

export default CalendarPage;
