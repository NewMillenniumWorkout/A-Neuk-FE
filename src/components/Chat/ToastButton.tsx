import { useState, useEffect } from "react";
import { IconProvider } from "../../utils/IconProvider";

interface ToastButtonProps {
	label: string;
	onClick: () => void;
}

export const ToastButton: React.FC<ToastButtonProps> = ({ label, onClick }) => {
	const [isFloating, setIsFloating] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsFloating(true), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`absolute bottom-16 inset-x-0 flex justify-center items-end ${
				isFloating ? "animate-floating" : "animate-slide-up"
			}`}
		>
			<button
				className="relative flex justify-center items-center rounded-full w-44 h-12 bg-white text-black-aneuk shadow-sm border-2"
				onClick={onClick}
			>
				{label}
			</button>
		</div>
	);
};
