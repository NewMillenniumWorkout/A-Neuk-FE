import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";
import CheckboxGroup from "./CheckBoxGroup";
import { API_DIARY } from "../../api/diary";
import { debounce } from "lodash";

const EmotionSelectPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		emotionData,
		setCurDescIndex,
		curIndex,
		setCurIndex,
		displayContent,
		setDisplayContent,
		selectedEmotions,
		setSelectedEmotions,
		setIsSelectComplete,
	} = useEmotionSelectPage();

	const [isLoading, setIsLoading] = useState(false);
	const latestRequestIdRef = useRef(0);
	const contentList = emotionData?.data.content_list;

	const handleNext = () => {
		if (contentList !== undefined) {
			if (curIndex < contentList.length - 1) {
				setCurIndex((prevIndex) => prevIndex + 1);
				console.log(
					emotionData?.data.diary_id,
					curIndex,
					selectedEmotions
				);
				setSelectedEmotions([]);
				setCurDescIndex(null);
			}
		}
	};

	const handelGen = async () => {
		try {
			if (emotionData !== null) {
				await API_DIARY.genFinalDiary(emotionData.data.diary_id);
			}
		} catch (error) {
			console.error("Error fetching new content:", error);
		} finally {
			navigate("/calendar");
		}
	};
	const debouncedFetchContent = useCallback(
		debounce(async () => {
			if (emotionData !== null && contentList !== undefined) {
				const requestId = Date.now();
				latestRequestIdRef.current = requestId;

				if (selectedEmotions.length === 0) {
					setDisplayContent(contentList[curIndex].original_content);
					return;
				}

				setIsLoading(true);
				try {
					const response = await API_DIARY.genNewContent(
						emotionData.data.diary_id,
						curIndex,
						contentList[curIndex].original_content,
						selectedEmotions
					);

					if (requestId === latestRequestIdRef.current) {
						setDisplayContent(response.data.final_content);
					}
				} catch (error) {
					console.error("Error fetching new content:", error);
				} finally {
					if (requestId === latestRequestIdRef.current) {
						setIsLoading(false);
					}
				}
			}
		}, 300),
		[emotionData, contentList, curIndex, selectedEmotions]
	);

	useEffect(() => {
		debouncedFetchContent();
		return () => debouncedFetchContent.cancel();
	}, [curIndex, selectedEmotions]);

	if (contentList === undefined) {
		window.location.replace("/chat");
		return;
	}

	return (
		<div className="absolute inset-0 bg-white-aneuk flex flex-col overflow-hidden">
			<div className="w-full h-full flex flex-col items-center justify-center">
				<div className="font-pretendard font-bold text-2xl text-[#6F6F6F] mb-8">
					느꼈던 감정에 가까운 단어가 있나요?
				</div>
				<div className="flex flex-col w-[90%] aspect-[2/2.8] p-5 bg-white rounded-[32px] shadow-custom-strong overflow-hidden">
					<div className="mb-5 ml-1 font-gowun-bold text-xl text-black-aneuk text-opacity-80 tracking-widest">
						#{curIndex + 1}/{contentList.length}
					</div>
					<div className="min-h-[20%] max-h-[40%] mb-6 overflow-y-auto">
						{isLoading ? (
							<div
								role="status"
								className="max-w-sm animate-pulse"
							>
								<div className="h-5 bg-gray-200 rounded-full mb-4"></div>
								<div className="h-5 bg-gray-200 rounded-full mb-4"></div>
								<div className="h-5 bg-gray-200 rounded-full max-w-[280px] mb-4"></div>
								<span className="sr-only">Loading...</span>
							</div>
						) : (
							<div className="font-gowun-regular text-black-aneuk text-opacity-80 text-xl">
								{displayContent}
							</div>
						)}
					</div>
					<div className="ml-2 mb-2 font-gowun-regular text-[#6F6F6F] text-sm">
						추천 단어
					</div>
					<div className="flex-1 px-2 overflow-y-auto">
						<CheckboxGroup />
					</div>
				</div>

				<div className="flex w-full justify-center mt-8">
					{curIndex + 1 === contentList.length ? (
						<button
							onClick={() => {
								setIsSelectComplete(true);
								setCurIndex(0);
								handelGen();
							}}
							className="px-5 py-5 text-white bg-black-aneuk shadow-custom-strong border-[1px] rounded-full disabled:opacity-50"
							disabled={isLoading}
						>
							<IconProvider.SendIcon className="ml-0.5" />
						</button>
					) : (
						<button
							onClick={handleNext}
							className="flex flex-row justify-center items-center pl-6 pr-2.5 py-2.5 text-black-aneuk bg-white shadow-lg border-[1px] rounded-full disabled:opacity-50"
							disabled={isLoading}
						>
							다음 문단
							<IconProvider.RightArrowIcon className="ml-0.5" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmotionSelectPage;
