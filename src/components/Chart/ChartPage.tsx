import React, { useState, useEffect } from "react";
import { API_CHART } from "../../api/chart";
import DonutChart from "./DonutChart";
import Collection from "./Collection";

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

	// const testData = {
	// 	totalEmotionCount: 414,
	// 	usedEmotionCount: 252,
	// 	categoryStats: {
	// 		기쁨: { totalCount: 67, usedCount: 67 }, // 100% (초록색)
	// 		흥미: { totalCount: 14, usedCount: 5 }, // 35.71% (노란색)
	// 		놀람: { totalCount: 32, usedCount: 10 }, // 31.25% (회색)
	// 		중성: { totalCount: 5, usedCount: 5 }, // 100% (초록색)
	// 		슬픔: { totalCount: 128, usedCount: 60 }, // 46.88% (노란색)
	// 		지루: { totalCount: 21, usedCount: 5 }, // 23.81% (회색)
	// 		공포: { totalCount: 31, usedCount: 25 }, // 80.65% (파란색)
	// 		분노: { totalCount: 56, usedCount: 30 }, // 53.57% (노란색)
	// 		통증: { totalCount: 8, usedCount: 0 }, // 0% (회색)
	// 		혐오: { totalCount: 38, usedCount: 10 }, // 26.32% (회색)
	// 		기타: { totalCount: 14, usedCount: 10 }, // 71.43% (파란색)
	// 	},
	// };

	useEffect(() => {
		const fetchChartData = async () => {
			try {
				setIsLoading(true);

				const lastMonthData = await API_CHART.getLastMonth();
				const collectionData = await API_CHART.getCollection();

				setLastMonthData(lastMonthData.data.data);
				setCollectionData(collectionData.data.data);
			} catch (error) {
				console.error("Error fetching chart data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchChartData();
	}, []);

	if (isLoading) {
		return <div className="w-full h-full bg-white-aneuk" />;
	}

	return (
		<div className="w-full h-full bg-white-aneuk">
			<div className="flex flex-col justify-start items-center w-full h-full px-4 pb-36 overflow-y-auto">
				{lastMonthData && (
					<div className="w-full my-8 mt-10">
						<DonutChart data={lastMonthData} />
					</div>
				)}
				{collectionData && <Collection data={collectionData} />}
			</div>
		</div>
	);
};

export default ChartPage;
