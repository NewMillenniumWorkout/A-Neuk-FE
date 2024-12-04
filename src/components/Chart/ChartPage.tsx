import React, { useState } from "react";
import { API_CHART } from "../../api/chart";

const ChartPage: React.FC = () => {
	const handleCollectionButton = async () => {
		await API_CHART.getCollection();
	};
	const handleMonthButton = async () => {
		await API_CHART.getLastMonth();
	};
	return (
		<div className="flex flex-col space-y-8 justify-center items-center w-full h-full bg-white-aneuk p-8 bg-blue-700-100">
			<button
				className="bg-black-aneuk text-white font-pretendard-bold p-5 rounded-2xl shadow-xl"
				onClick={handleCollectionButton}
			>
				도감
			</button>
			<button
				className="bg-black-aneuk text-white font-pretendard-bold p-5 rounded-2xl shadow-xl"
				onClick={handleMonthButton}
			>
				최근 30일
			</button>
		</div>
	);
};

export default ChartPage;
