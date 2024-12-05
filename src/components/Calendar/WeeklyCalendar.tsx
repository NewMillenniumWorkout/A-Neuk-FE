import * as React from "react";
import { ChevronLeft, ChevronRight, Icon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { IconProvider } from "../../utils/IconProvider";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function WeeklyCalendar({
	className,
	classNames,
	showOutsideDays = false,
	diaryDates = [],
	selectedDate,
	onDateChange,
	...props
}: CalendarProps & {
	diaryDates?: string[];
	selectedDate: Date | undefined;
	onDateChange: (date: Date) => void;
}) {
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

	const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

	return (
		<div>
			<div className="flex justify-between h-16 items-center px-3">
				<span className="font-pretendard-bold text-2xl">
					{format(endWeek, "yyyy년 M월")}
				</span>
				<div className="flex flex-row space-x-6">
					<button
						onClick={handlePrevWeek}
						className="flex justify-center items-center text-black-aneuk rounded-lg h-[28px] w-[28px]"
					>
						<IconProvider.LeftArrowIcon className="h-[28px] w-[28px]" />
					</button>
					<button
						onClick={handleNextWeek}
						className="flex justify-center items-center text-black-aneuk rounded-lg h-[28px] w-[28px]"
					>
						<IconProvider.RightArrowIcon className="h-[28px] w-[28px]" />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-x-2 place-items-center">
				{dayNames.map((dayName, index) => (
					<div
						key={index}
						className={`font-pretendard-regular text-center text-xs 
							${index === 0 || index === 6 ? "text-[#ED6A5B]" : "text-black-aneuk"}`}
					>
						{dayName}
					</div>
				))}

				{weekDays.map((date, index) => (
					<button
						key={index}
						onClick={() => onDateChange(date)}
						className={`mb-2 w-[90%] aspect-square rounded-xl
							${
								selectedDate &&
								date.toDateString() ===
									selectedDate.toDateString()
									? "bg-black-aneuk text-white"
									: index === 0 || index === 6
									? "bg-white text-[#ED6A5B] hover:bg-gray-100"
									: "bg-white text-black-aneuk hover:bg-gray-100"
							}`}
					>
						<span className="text-lg font-pretendard-light">
							{format(date, "d")}
						</span>
					</button>
				))}
				{weekDays.map((date, index) => (
					<div key={index} className="w-1.5 h-1.5">
						{diaryDates.includes(format(date, "yyyy-MM-dd")) && (
							<div className="w-1.5 h-1.5 bg-black-aneuk rounded-full mx-auto"></div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
