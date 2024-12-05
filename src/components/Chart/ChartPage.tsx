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
