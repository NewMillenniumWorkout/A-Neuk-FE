import React, { createContext, ReactNode, useContext, useState } from "react";
import { emotionSelectData, EmotionSelectData } from "./EmotionSelectData";

interface EmotionSelectPageContextType {
	emotionData: EmotionSelectData;
	curIndex: number;
	setCurIndex: React.Dispatch<React.SetStateAction<number>>;
	curDescIndex: number | null;
	setCurDescIndex: React.Dispatch<React.SetStateAction<number | null>>;
	selectedEmotions: string[];
	setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>;
	isSelectComplete: boolean;
	setIsSelectComplete: React.Dispatch<React.SetStateAction<boolean>>;
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
	const [curDescIndex, setCurDescIndex] = useState<number | null>(null);
	const [isSelectComplete, setIsSelectComplete] = useState(false);
	const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

	return (
		<EmotionSelectPageContext.Provider
			value={{
				emotionData: emotionSelectData,
				curIndex,
				setCurIndex,
				curDescIndex,
				setCurDescIndex,
				selectedEmotions,
				setSelectedEmotions,
				isSelectComplete,
				setIsSelectComplete,
			}}
		>
			{children}
		</EmotionSelectPageContext.Provider>
	);
};
