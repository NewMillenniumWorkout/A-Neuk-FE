import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../utils/IconProvider";
import logoImg from "../assets/images/logo_shadow.png";

type FloatingActionButtonProps = {};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({}) => {
	const navigate = useNavigate();
	const [isFloating, setIsFloating] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsFloating(true), 500);
		return () => clearTimeout(timer);
	}, []);
	return (
		<img
			src={logoImg}
			onClick={() => {
				navigate("/chat");
			}}
			className={`w-24 absolute bottom-20 right-4 object-contain animate-floating cursor-pointer ${
				isFloating ? "animate-floating" : "animate-slide-up"
			}`}
		></img>
	);
};

export default FloatingActionButton;
