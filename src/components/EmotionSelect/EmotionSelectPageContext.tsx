import React, { createContext, ReactNode, useContext } from "react";
import { emotionSelectData, EmotionSelectData } from "./EmotionSelectData";

interface EmotionSelectPageContextType {
	emotionData: EmotionSelectData;
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
	return (
		<EmotionSelectPageContext.Provider
			value={{ emotionData: emotionSelectData }}
		>
			{children}
		</EmotionSelectPageContext.Provider>
	);
};
