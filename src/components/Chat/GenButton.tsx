import { useState, useEffect } from "react";
import { IconProvider } from "../../utils/IconProvider";

export function GenButton({ onClick }: { onClick: () => void }) {
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
			<button className="relative flex justify-center items-center rounded-full pr-2 w-44 h-12 bg-white text-black-aneuk shadow-sm border-2">
				일기 생성하기
				<IconProvider.RightArrowIcon className="absolute right-3 w-6 h-6 text-black-aneuk" />
			</button>
		</div>
	);
}
