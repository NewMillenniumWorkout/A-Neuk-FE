import React, { useState } from "react";
import apiClient from "../../api";
import { FinalDiary } from "../../api/diary";
import Card from "../Calendar/Card";

const HomePage: React.FC = () => {
	const [randomDiary, setRandomDiary] = useState<FinalDiary | null>(null);
	const handleRandomButton = () => {
		const getRandomDiary = async () => {
			try {
				const response = await apiClient.get("/home/random");
				console.log(response);
				setRandomDiary(response.data);
			} catch (error: any) {
				console.error("Error getting random diary:", error.message);
				throw error;
			}
		};
		getRandomDiary();
	};
	return (
		<div className="flex flex-col space-y-8 justify-center items-center w-full h-full bg-white-aneuk p-8 bg-blue-700-100">
			<Card curDiary={randomDiary} />
			<button
				className="bg-black-aneuk text-white font-pretendard-bold p-5 rounded-2xl shadow-xl"
				onClick={handleRandomButton}
			>
				행복버튼
			</button>
		</div>
	);
};

export default HomePage;
