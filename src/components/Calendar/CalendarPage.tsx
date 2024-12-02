import { WeeklyCalendar } from "./WeeklyCalendar";
import React, { useState } from "react";

function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

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
				<div className="flex flex-col w-[90%] aspect-[2/2.8] p-5 mt-[5%] bg-white rounded-[32px] shadow-custom-strong"></div>
				<div className="flex flex-col w-[90%] aspect-[2/2.8] p-5 mt-[5%] bg-white rounded-[32px] shadow-custom-strong"></div>
			</div>
		</div>
	);
}

export default CalendarPage;
