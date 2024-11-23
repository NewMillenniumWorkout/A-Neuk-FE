import { useNavigate } from "react-router-dom";

const EmotionSelectPage = () => {
	const navigate = useNavigate();
	return (
		<div className="absolute inset-0 bg-white flex flex-col overflow-hidden">
			감정 선택 페이지
			<button
				className="bg-slate-300 h-10 w-20"
				onClick={() => navigate("/calendar")}
			>
				{" "}
				나가기{" "}
			</button>
		</div>
	);
};

export default EmotionSelectPage;
