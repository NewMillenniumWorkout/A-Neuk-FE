import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";

const EmotionSelectPage = () => {
	const navigate = useNavigate();
	const { emotionData } = useEmotionSelectPage();

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
			<div className="text-xs">
				{emotionData.data.content_list.map((content) => (
					<div key={content.order_index}>
						<p>{content.original_content}</p>
						<ul>
							{content.recommend_emotion.map((emotion) => (
								<li key={emotion.id}>
									<strong>{emotion.title}</strong>:
									{emotion.description}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			{/* <div className="w-full h-full flex flex-col justify-center items-center">
				<div className="pb-36">
					<div className="font-pretendard font-bold text-xl text-black-aneuk mb-8">
						느꼈던 감정에 가까운 단어가 있나요?
					</div>
					<div className="w-80 aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong">
						<div className="mb-5 font-gowun-bold text-lg text-black-aneuk text-opacity-80">
							# 1 / 17
						</div>
						<div className="min-h-32 max-h-60 mb-6 px-3 overflow-y-auto">
							<div className="font-gowun-regular text-black-aneuk text-opacity-80 text-">
								오후에는 친구와 함께 카페에 가서 커피를 마셨다.
							</div>
						</div>
						<div className="px-5">
							<div className="mb-2 font-gowun-regular text-[#6F6F6F] text-xs">
								추천 단어
							</div>
							<div className="w-full h-6 bg-red-200"></div>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default EmotionSelectPage;
