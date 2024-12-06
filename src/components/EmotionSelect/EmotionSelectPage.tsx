import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IconProvider } from "../../utils/IconProvider";
import { useEmotionSelectPage } from "./EmotionSelectPageContext";
import { API_DIARY } from "../../api/diary";
import { debounce } from "lodash";
import EmotionCard from "./EmotionCard";

const EmotionSelectPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		emotionData,
		setCurDescIndex,
		curIndex,
		setCurIndex,
		setDisplayContent,
		selectedEmotions,
		setSelectedEmotions,
		setIsSelectComplete,
	} = useEmotionSelectPage();

	const [isLoading, setIsLoading] = useState(false);
	const latestRequestIdRef = useRef(0);
	const contentList = emotionData?.data.content_list;

	const handleNext = () => {
		const handleSendEmotions = async () => {
			if (emotionData) {
				try {
					await API_DIARY.sendSelectedEmotion(
						emotionData.data.diary_id,
						curIndex,
						selectedEmotions
					);
				} catch (error: any) {
					console.error("Error handleSendEmotions: ", error);
				}
			}
		};
		if (contentList !== undefined) {
			if (curIndex < contentList.length - 1) {
				setCurIndex((prevIndex) => prevIndex + 1);
				handleSendEmotions();
				setSelectedEmotions([]);
				setCurDescIndex(null);
			}
		}
	};

	const handelGen = async () => {
		setIsLoading(true);
		try {
			if (emotionData !== null) {
				try {
					await API_DIARY.sendSelectedEmotion(
						emotionData.data.diary_id,
						curIndex,
						selectedEmotions
					);
				} catch (error: any) {
					console.error("Error handleSendEmotions: ", error);
				}
				setSelectedEmotions([]);
				setCurDescIndex(null);
				await API_DIARY.genFinalDiary(emotionData.data.diary_id);
			}
		} catch (error) {
			console.error("Error fetching new content:", error);
		} finally {
			navigate("/calendar");
			setIsLoading(false);
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
				<EmotionCard
					key={curIndex}
					contentList={contentList}
					isLoading={isLoading}
				/>
				<div className="flex w-full justify-center">
					{curIndex + 1 === contentList.length ? (
						<button
							onClick={() => {
								setIsSelectComplete(true);
								setCurIndex(0);
								handelGen();
							}}
							className="px-2.5 py-2.5 text-white bg-black-aneuk shadow-custom-strong border-[1px] rounded-full disabled:opacity-50"
							disabled={isLoading}
						>
							<IconProvider.CheckIcon className="ml-0.5 w-8 size-8" />
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
