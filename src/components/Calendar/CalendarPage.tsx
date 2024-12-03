import { WeeklyCalendar } from "./WeeklyCalendar";
import Card from "./Card";
import React, { useEffect, useState } from "react";
import { API_CALENDAR } from "../../api/calendar";
import { formatToYYYYMM } from "../../utils/TimeFormatter";

function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	useEffect(() => {
		const loadMonthlyDiaries = async () => {
			if (!date) return;
			const month = formatToYYYYMM(date);
			try {
				const response = await API_CALENDAR.getMonthDiary(month);
				console.log(response);
			} catch (error: any) {
				console.error("Error load monthly diaries: ", error);
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
				/>
			</div>
			<div className="flex flex-col flex-grow justify-start items-center bg-white-aneuk overflow-y-auto pb-24">
				<Card />
			</div>
		</div>
	);
}

export default CalendarPage;
