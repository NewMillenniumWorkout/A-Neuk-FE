import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const emotionColors: Record<
	| "공포"
	| "기쁨"
	| "기타"
	| "놀람"
	| "분노"
	| "슬픔"
	| "중성"
	| "지루"
	| "통증"
	| "혐오"
	| "흥미",
	string
> = {
	공포: "#3498DB",
	기쁨: "#FF6384",
	기타: "#FFCE56",
	놀람: "#8E44AD",
	분노: "#E74C3C",
	슬픔: "#36A2EB",
	중성: "#F1C40F",
	지루: "#2ECC71",
	통증: "#95A5A6",
	혐오: "#9B59B6",
	흥미: "#1ABC9C",
};

interface LastMonthData {
	[key: string]: number;
}

interface DonutChartProps {
	data: LastMonthData;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
	const labels = Object.keys(data) as (keyof typeof emotionColors)[];
	const series = Object.values(data);
	const colors = labels.map((label) => emotionColors[label]);

	const chartOptions: ApexOptions = {
		chart: {
			height: 320,
			width: "100%",
			type: "donut",
		},
		labels: labels,
		colors: colors,
		plotOptions: {
			pie: {
				donut: {
					size: "80%",
					labels: {
						show: true,
						total: {
							showAlways: true,
							show: true,
							label: "Total",
							formatter: function () {
								return `${series.reduce((a, b) => a + b, 0)}`;
							},
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			position: "bottom",
			fontFamily: "Inter, sans-serif",
		},
	};

	return (
		<div className="w-full bg-white rounded-lg shadow p-4">
			<div className="font-pretendard-bold text-lg text-black-aneuk mb-4">
				최근 30일 동안 사용한 감정은?
			</div>
			<ApexCharts
				options={chartOptions}
				series={series}
				type="donut"
				height={320}
				width={310}
			/>
		</div>
	);
};

export default DonutChart;
