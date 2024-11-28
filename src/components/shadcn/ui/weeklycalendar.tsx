import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../utils";
import { buttonVariants } from "./button";
import { startOfWeek, endOfWeek, format } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function WeeklyCalendar({
	className,
	classNames,
	showOutsideDays = false,
	...props
}: CalendarProps) {
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
		undefined
	);
	const [currentWeek, setCurrentWeek] = React.useState<Date>(new Date());

	const startWeek = startOfWeek(currentWeek, { weekStartsOn: 0 });
	const endWeek = endOfWeek(currentWeek, { weekStartsOn: 0 });

	const weekDays = [];
	for (
		let date = startWeek;
		date <= endWeek;
		date.setDate(date.getDate() + 1)
	) {
		weekDays.push(new Date(date));
	}

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
	};

	const handlePrevWeek = () => {
		const prevWeek = new Date(currentWeek);
		prevWeek.setDate(currentWeek.getDate() - 7);
		setCurrentWeek(prevWeek);
	};

	const handleNextWeek = () => {
		const nextWeek = new Date(currentWeek);
		nextWeek.setDate(currentWeek.getDate() + 7);
		setCurrentWeek(nextWeek);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<button onClick={handlePrevWeek} className="text-gray-600">
					<ChevronLeft className="h-4 w-4" />
				</button>
				<span className="font-semibold text-lg">
					{format(endWeek, "M월")}
				</span>
				<button onClick={handleNextWeek} className="text-gray-600">
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-2">
				{weekDays.map((date) => (
					<button
						key={date.toISOString()}
						onClick={() => handleDateChange(date)}
						className={cn(
							"aspect-square text-center rounded-md",
							selectedDate &&
								date.toDateString() ===
									selectedDate.toDateString()
								? "bg-black-aneuk text-white"
								: "bg-white hover:bg-gray-100"
						)}
					>
						{format(date, "dd")}
					</button>
				))}
			</div>
		</div>
	);
}

WeeklyCalendar.displayName = "WeeklyCalendar";

export { WeeklyCalendar };
