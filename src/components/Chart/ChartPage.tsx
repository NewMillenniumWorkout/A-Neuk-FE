import React, { useState, useEffect } from "react";
import { API_CHART } from "../../api/chart";
import DonutChart from "./DonutChart";

interface LastMonthData {
	[key: string]: number;
}

interface CollectionData {
	totalEmotionCount: number;
	usedEmotionCount: number;
	categoryStats: {
		[key: string]: {
			totalCount: number;
			usedCount: number;
		};
	};
}

const ChartPage: React.FC = () => {
	const [lastMonthData, setLastMonthData] = useState<LastMonthData | null>(
		null
	);
	const [collectionData, setCollectionData] = useState<CollectionData | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchChartData = async () => {
			try {
				setIsLoading(true);

				const lastMonthData = await API_CHART.getLastMonth();
				const collectionData = await API_CHART.getCollection();

				setLastMonthData(lastMonthData.data.data);
				setCollectionData(collectionData.data);
			} catch (error) {
				console.error("Error fetching chart data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchChartData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full h-full bg-white-aneuk">
			<div className="w-full min-h-14 h-14 bg-white flex justify-center items-center px-4">
				<h1 className="text-lg font-bold text-black-aneuk">아늑</h1>
			</div>
			<div className="flex flex-col justify-start items-center w-full">
				{lastMonthData && (
					<div className="my-8">
						<DonutChart data={lastMonthData} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ChartPage;
