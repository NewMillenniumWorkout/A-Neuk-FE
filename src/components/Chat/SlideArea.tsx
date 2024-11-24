import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const SlideArea: React.FC = () => {
	const sliderContainerRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [sliderPos, setSliderPos] = useState(0);
	const navigate = useNavigate();

	const emojis = [
		"🙂",
		"😱",
		"🥰",
		"🫢",
		"🤬",
		"😢",
		"😑",
		"😖",
		"🤔",
		"🤩",
		"😊",
		"🤪",
		"🥳",
		"🫨",
	];

	const getRandomEmojis = (arr: string[], count: number) => {
		const shuffled = [...arr]
			.filter((emoji) => emoji !== "🙂")
			.sort(() => 0.5 - Math.random());
		return ["🙂", ...shuffled.slice(0, count - 1)];
	};

	let randomEmojis = useMemo(() => getRandomEmojis(emojis, 5), []);

	const currentEmoji = (): string => {
		if (!sliderContainerRef.current) return randomEmojis[0];
		const containerWidth = sliderContainerRef.current.offsetWidth;
		const percentage = sliderPos / containerWidth;
		const index = Math.min(
			Math.floor(percentage * randomEmojis.length),
			randomEmojis.length - 1
		);
		return randomEmojis[index];
	};

	const handleStart = () => {
		setIsDragging(true);
		document.body.style.userSelect = "none";
	};

	const handleMove = (clientX: number) => {
		if (!isDragging || !sliderContainerRef.current) return;

		const containerRect =
			sliderContainerRef.current.getBoundingClientRect();
		let newSliderPos = clientX - containerRect.left - 20;

		if (newSliderPos < 0) {
			newSliderPos = 0;
		} else if (newSliderPos > containerRect.width - 44) {
			newSliderPos = containerRect.width - 44;
		}

		setSliderPos(newSliderPos);
	};

	const handleEnd = () => {
		if (!sliderContainerRef.current) return;

		const containerWidth = sliderContainerRef.current.offsetWidth;
		if (sliderPos >= containerWidth - 44) {
			navigate("/emotion-select");
		} else {
			setSliderPos(0);
		}

		setIsDragging(false);
		document.body.style.userSelect = "auto";
	};

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			handleMove(event.clientX);
		};
		const handleMouseUp = () => {
			handleEnd();
		};
		const handleTouchMove = (event: TouchEvent) => {
			handleMove(event.touches[0].clientX);
		};
		const handleTouchEnd = () => {
			handleEnd();
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			document.addEventListener("touchmove", handleTouchMove);
			document.addEventListener("touchend", handleTouchEnd);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};
	}, [isDragging, sliderPos]);

	return (
		<div className="relative flex flex-row justify-end items-end p-2 bg-white z-40">
			<div
				ref={sliderContainerRef}
				className="relative w-full h-11 pl-4 pr-14 py-2.5 rounded-[22px] bg-white border overflow-hidden"
			>
				<span className="absolute inset-0 flex items-center justify-center text-gray-700 font-medium">
					감정 선택하러 가기 →
				</span>
			</div>
			<div
				ref={sliderRef}
				className="slider absolute left-2.5 top-2.5 h-10 w-10 bg-transparent rounded-full cursor-pointer z-50 flex justify-center items-center text-3xl"
				style={{ transform: `translateX(${sliderPos}px)` }}
				onMouseDown={handleStart}
				onTouchStart={handleStart}
			>
				{currentEmoji()}
			</div>
		</div>
	);
};

export default SlideArea;
