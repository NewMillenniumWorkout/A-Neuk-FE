import React, { useState } from "react";
import IconButton from "./IconButton";
import { IconProvider } from "../utils/IconProvider";
import { useNavigate } from "react-router-dom";

function BottomAppBar() {
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	const navigate = useNavigate();
	return (
		<div className="w-full h-16 bg-white text-black-aneuk flex justify-around items-center">
			<IconButton
				icon={<IconProvider.CalendarIcon />}
				label="Calendar"
				selected={selectedIcon === "calendar"}
				onClick={() => {
					setSelectedIcon("calendar");
					navigate("/calendar");
				}}
			/>
			<IconButton
				icon={<IconProvider.ChartIcon />}
				label="Chart"
				selected={selectedIcon === "chart"}
				onClick={() => {
					setSelectedIcon("chart");
					navigate("/chart");
				}}
			/>
			<IconButton
				icon={<IconProvider.UserIcon />}
				label="Profile"
				selected={selectedIcon === "profile"}
				onClick={() => {
					setSelectedIcon("profile");
					navigate("/profile");
				}}
			/>
		</div>
	);
}

export default BottomAppBar;
