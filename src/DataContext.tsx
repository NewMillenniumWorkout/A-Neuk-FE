import React, { createContext, ReactNode, useContext, useState } from "react";

interface DataContextType {
	userToken: string | null;
	setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useDataContext must be used within DataProvider");
	}
	return context;
};

interface DataProviderProps {
	children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
	const [userToken, setUserToken] = useState<string | null>(null);

	return (
		<DataContext.Provider
			value={{
				userToken,
				setUserToken,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
