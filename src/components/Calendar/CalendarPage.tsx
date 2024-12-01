import { WeeklyCalendar } from "./WeeklyCalendar";
import React, { useState } from "react";

function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<div className="flex flex-col h-full">
			<div className="w-full px-8 py-4">
				<WeeklyCalendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="w-full"
				/>
			</div>
			<div className="flex flex-col justify-start items-center pt-8 h-full bg-white-aneuk">
				<div className="flex flex-col w-[90%] aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong overflow-hidden"></div>
			</div>
		</div>
	);
}

export default CalendarPage;
