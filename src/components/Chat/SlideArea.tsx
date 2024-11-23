import { useState, useRef } from "react";

const SlideArea: React.FC = () => {
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [sliderPos, setSliderPos] = useState(0);
	const sliderContainerRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex flex-row justify-end items-end relative p-2 bg-white z-50">
			<div
				ref={sliderContainerRef}
				className={`w-full max-h-32 h-11 min-h-11 pl-4 pr-14 py-2.5 leading-5 box-border rounded-[22px] bg-white border`}
			/>
		</div>
	);
};

export default SlideArea;
