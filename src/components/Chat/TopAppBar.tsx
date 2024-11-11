import React from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";

const TopAppBar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-16 bg-white shadow-md flex items-center px-4">
			<button
				onClick={() => {
					navigate(-1);
				}}
				className="mr-4"
			>
				<IconProvider.LeftArrowIcon />
			</button>
			<h1 className="text-lg font-bold text-gray-800">아늑</h1>
		</div>
	);
};

export default TopAppBar;
