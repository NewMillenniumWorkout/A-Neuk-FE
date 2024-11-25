import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";

const EmotionSelectPage = () => {
	const navigate = useNavigate();
	return (
		<div className="absolute inset-0 bg-white-aneuk flex flex-col overflow-hidden">
			<div className="w-full min-h-14 h-14 bg-transparent flex justify-center items-center px-4">
				<button
					onClick={() => {
						navigate(-1);
					}}
					className="absolute left-4"
				>
					<IconProvider.LeftArrowIcon className="w-8 h-8" />
				</button>
			</div>
			<div className="w-full h-full flex flex-col justify-center items-center">
				<div className="w-80 aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong">
					#1/17
				</div>
			</div>
		</div>
	);
};

export default EmotionSelectPage;
