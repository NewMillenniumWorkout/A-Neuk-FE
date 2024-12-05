import React from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../utils/IconProvider";

type FloatingActionButtonProps = {};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({}) => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				navigate("/chat");
			}}
			className="flex justify-center items-center w-14 bg-white text-black-aneuk rounded-full shadow-lg transition duration-300 ease-in-out absolute bottom-20 right-4"
			style={{ aspectRatio: "1 / 1" }}
		>
			<IconProvider.FileEditIcon className="w-[28px] h-[28px]" />
		</button>
	);
};

export default FloatingActionButton;
