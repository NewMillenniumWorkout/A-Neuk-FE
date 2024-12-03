import React, { createContext, ReactNode, useContext, useState } from "react";
import { emotionSelectData, EmotionSelectData } from "./EmotionSelectData";

interface EmotionSelectPageContextType {
	emotionData: EmotionSelectData | null;
	setEmotionData: React.Dispatch<
		React.SetStateAction<EmotionSelectData | null>
	>;
	curIndex: number;
	setCurIndex: React.Dispatch<React.SetStateAction<number>>;
	curDescIndex: number | null;
	setCurDescIndex: React.Dispatch<React.SetStateAction<number | null>>;
	displayContent: string | null;
	setDisplayContent: React.Dispatch<React.SetStateAction<string | null>>;
	selectedEmotions: string[];
	setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmotionSelectPageContext = createContext<
	EmotionSelectPageContextType | undefined
>(undefined);

export const useEmotionSelectPage = () => {
	const context = useContext(EmotionSelectPageContext);
	if (!context) {
		throw new Error(
			"useEmotionSelectPage must be used within EmotionSelectPageProvider"
		);
	}
	return context;
};

interface EmotionSelectPageProviderProps {
	children: ReactNode;
}

export const EmotionSelectPageProvider: React.FC<
	EmotionSelectPageProviderProps
> = ({ children }) => {
	const [curIndex, setCurIndex] = useState(0);
	const [emotionData, setEmotionData] = useState<EmotionSelectData | null>(
		null
	);
	const [curDescIndex, setCurDescIndex] = useState<number | null>(null);
	const [displayContent, setDisplayContent] = useState<string | null>(null);
	const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

	return (
		<EmotionSelectPageContext.Provider
			value={{
				emotionData,
				setEmotionData,
				curIndex,
				setCurIndex,
				curDescIndex,
				setCurDescIndex,
				displayContent,
				setDisplayContent,
				selectedEmotions,
				setSelectedEmotions,
			}}
		>
			{children}
		</EmotionSelectPageContext.Provider>
	);
};
