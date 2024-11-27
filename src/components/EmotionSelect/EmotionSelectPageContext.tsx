import React, { createContext, ReactNode, useContext, useState } from "react";
import { emotionSelectData, EmotionSelectData } from "./EmotionSelectData";

interface EmotionSelectPageContextType {
	emotionData: EmotionSelectData;
	curIndex: number;
	setCurIndex: React.Dispatch<React.SetStateAction<number>>;
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
	const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

	return (
		<EmotionSelectPageContext.Provider
			value={{
				emotionData: emotionSelectData,
				curIndex,
				setCurIndex,
				selectedEmotions,
				setSelectedEmotions,
			}}
		>
			{children}
		</EmotionSelectPageContext.Provider>
	);
};
