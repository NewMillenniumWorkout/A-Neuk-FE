import React from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";

const TopAppBar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full min-h-14 h-14 bg-white flex justify-center items-center px-4">
			<button
				onClick={() => {
					navigate(-1);
				}}
				className="absolute left-4"
			>
				<IconProvider.LeftArrowIcon className="w-8 h-8" />
			</button>
			<h1 className="text-lg font-bold text-gray-800">아늑</h1>
		</div>
	);
};

export default TopAppBar;
