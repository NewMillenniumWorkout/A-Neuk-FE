import React from "react";

interface IconButtonProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	selected?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	label,
	onClick,
	selected = false,
}) => {
	return (
		<button
			className={`flex flex-col items-center justify-center w-20 p-2 ${
				selected ? "text-black" : "text-gray-300"
			}`}
			onClick={onClick}
			aria-label={label}
		>
			<div
				className={`h-6 w-6 mb-1 ${
					selected ? "fill-black" : "fill-gray-300"
				}`}
			>
				{icon}
			</div>
			<span className="text-xs">{label}</span>
		</button>
	);
};

export default IconButton;
