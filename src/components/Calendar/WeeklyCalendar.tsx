import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
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

	const dayNames = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 이름 배열

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

			<div className="grid grid-cols-7 gap-y-1 gap-x-2 place-items-center">
				{dayNames.map((dayName, index) => (
					<div
						key={index}
						className="font-pretendard-regular text-center text-xs text-gray-aneuk"
					>
						{dayName}
					</div>
				))}

				{weekDays.map((date, index) => (
					<button
						key={date.toISOString()}
						onClick={() => handleDateChange(date)}
						className={`w-12 aspect-square rounded-xl
							${
								selectedDate &&
								date.toDateString() ===
									selectedDate.toDateString()
									? "bg-black-aneuk text-white"
									: index === 0 || index === 6
									? "bg-white text-red-500 hover:bg-gray-100"
									: "bg-white text-black-aneuk hover:bg-gray-100"
							}`}
					>
						<span className="text-lg">{format(date, "d")}</span>
					</button>
				))}
			</div>
		</div>
	);
}

WeeklyCalendar.displayName = "WeeklyCalendar";

export { WeeklyCalendar };
