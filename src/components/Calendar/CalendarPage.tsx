import React, { useEffect, useState } from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM, formatToYYYYMMDD } from "../../utils/TimeFormatter";

function CalendarPage() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [diaryDates, setDiaryDates] = useState<string[]>([]);

	useEffect(() => {
		const loadMonthlyDiaries = async () => {
			if (!date) return;
			const month = formatToYYYYMM(date);
			try {
				const response = await API_CALENDAR.getMonthDiary(month);
				console.log("API Response:", response);
				const diaries = response.data.diaries_with_diary || [];
				const diaryDates = diaries.map((diary: any) =>
					formatToYYYYMMDD(new Date(diary.month))
				);
				setDiaryDates(diaryDates);
			} catch (error: any) {
				console.error("Error loading monthly diaries: ", error);
			}
		};
		loadMonthlyDiaries();
	}, [date]);

	return (
		<div className="flex flex-col w-full h-full bg-white-aneuk">
			<div className="flex-shrink-0 w-full px-4 pt-4 pb-6 z-20 rounded-b-xl bg-white shadow-md">
				<WeeklyCalendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="w-full"
					diaryDates={diaryDates}
				/>
			</div>
			<div className="flex flex-col flex-grow justify-start items-center bg-white-aneuk overflow-y-auto pb-24">
				<Card />
			</div>
		</div>
	);
}

export default CalendarPage;
