import { Button } from "../shadcn/ui/button";
import { Calendar } from "../shadcn/ui/calendar";
import { WeeklyCalendar } from "../shadcn/ui/weeklycalendar";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../shadcn/ui/drawer";
import React, { useState } from "react";

function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<div className="w-full h-full p-8">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="w-full"
			/>
			<WeeklyCalendar />
			{/* <Drawer>
				<DrawerTrigger>Open</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer> */}
		</div>
	);
}

export default CalendarPage;
