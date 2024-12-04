import React, { useEffect, useState } from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM, formatToYYYYMMDD } from "../../utils/TimeFormatter";
import { FinalDiary } from "../../api/diary";

const CalendarPage: React.FC = () => {
	const [date, setDate] = useState<Date | undefined>(
		new Date(new Date().getTime() - 9 * 60 * 60 * 1000)
	);
	const [diaryDates, setDiaryDates] = useState<string[]>([]);
	const [curDiary, setCurDiary] = useState<FinalDiary | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			if (!date) return;

			try {
				const formattedMonth = formatToYYYYMM(date);
				const monthResponse = await API_CALENDAR.getMonthDiary(
					formattedMonth
				);
				const diaries = monthResponse.data.diaries_with_diary || [];
				const diaryDates = diaries.map((diary: any) =>
					formatToYYYYMMDD(new Date(diary.month))
				);
				setDiaryDates(diaryDates);

				const formattedDate = formatToYYYYMMDD(date);
				console.log(formattedDate);
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

			const formattedDate = formatToYYYYMMDD(date);
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
			<div className="flex flex-col flex-grow justify-start items-center bg-white-aneuk overflow-y-auto">
				{!isLoading && <Card curDiary={curDiary} />}
			</div>
		</div>
	);
};

export default CalendarPage;
