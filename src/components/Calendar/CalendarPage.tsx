import React, { useEffect, useState } from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM, formatToYYYYMMDD } from "../../utils/TimeFormatter";

function CalendarPage() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [diaryDates, setDiaryDates] = useState<string[]>([]); // 일기 있는 날짜 저장

	useEffect(() => {
		const loadMonthlyDiaries = async () => {
			if (!date) return;
			const month = formatToYYYYMM(date);
			try {
				const response = await API_CALENDAR.getMonthDiary(month);
				console.log("API Response:", response); // 응답 데이터 확인

				// 일기가 있는 날짜 추출
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
		<div className="flex flex-col w-full h-full">
			<div className="flex-shrink-0 w-full px-8 py-4 z-20 shadow-md">
				<WeeklyCalendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="w-full"
					diaryDates={diaryDates} // 일기 날짜 전달
				/>
			</div>
			<div className="flex flex-col flex-grow justify-start items-center bg-white-aneuk overflow-y-auto pb-24">
				<Card />
			</div>
		</div>
	);
}

export default CalendarPage;
