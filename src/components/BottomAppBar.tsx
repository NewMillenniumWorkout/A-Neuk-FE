import React, { useState } from "react";
import IconButton from "./IconButton";
import { IconProvider } from "../utils/IconProvider";

function BottomAppBar() {
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	return (
		<div className="w-full h-16 bg-white text-black-aneuk flex justify-around items-center">
			<IconButton
				icon={<IconProvider.CalendarIcon />}
				label="Calendar"
				selected={selectedIcon === "calendar"}
				onClick={() => setSelectedIcon("calendar")}
			/>
			<IconButton
				icon={<IconProvider.ChartIcon />}
				label="Chart"
				selected={selectedIcon === "chart"}
				onClick={() => setSelectedIcon("chart")}
			/>
			<IconButton
				icon={<IconProvider.UserIcon />}
				label="Profile"
				selected={selectedIcon === "user"}
				onClick={() => setSelectedIcon("user")}
			/>
		</div>
	);
}

export default BottomAppBar;
