import React, { useEffect, useState } from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM, formatToYYYYMMDD } from "../../utils/TimeFormatter";
import { FinalDiary } from "../../api/diary";

const CalendarPage: React.FC = () => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [diaryDates, setDiaryDates] = useState<string[]>([]);
	const [curDiaryId, setCurDiaryId] = useState<number | null>(null);
	const [curDiary, setCurDiary] = useState<FinalDiary | null>(null);

	useEffect(() => {
		const loadMonthlyDiaries = async () => {
			if (!date) return;
			const formattedMonth = formatToYYYYMM(date);
			try {
				const response = await API_CALENDAR.getMonthDiary(
					formattedMonth
				);
				const diaries = response.data.diaries_with_diary || [];
				const diaryDates = diaries.map((diary: any) =>
					formatToYYYYMMDD(new Date(diary.month))
				);
				setCurDiaryId(diaries[diaries.length - 1]?.diary_id || null);
				setDiaryDates(diaryDates);
			} catch (error: any) {
				console.error("Error loading monthly diaries: ", error);
			}
		};
		const loadDateDiary = async () => {
			if (!date) return;

			const formattedDate = formatToYYYYMMDD(date);
			if (!diaryDates.includes(formattedDate)) {
				if (curDiary != null) setCurDiary(null);
				return;
			}

			try {
				const response = await API_CALENDAR.getDateDiary(formattedDate);
				console.log("API Response:", response);
				setCurDiary(response);
			} catch (error: any) {
				console.error("Error loading date diary: ", error);
			}
		};

		loadMonthlyDiaries();
		loadDateDiary();
	}, [date]);

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
			<div className="flex flex-col flex-grow justify-start items-center bg-white-aneuk overflow-y-auto pb-24">
				<Card curDiary={curDiary} />
			</div>
		</div>
	);
};

export default CalendarPage;
