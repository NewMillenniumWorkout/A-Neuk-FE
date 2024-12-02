import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
	token: string | null;
	email: string | null;
	setAuth: (token: string, email: string) => void;
	clearAuth: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		const savedToken = Cookies.get("userToken");
		const savedEmail = Cookies.get("userEmail");
		if (savedToken && savedEmail) {
			setToken(savedToken);
			setEmail(savedEmail);
		}
	}, []);

	const setAuth = (newToken: string, newEmail: string) => {
		Cookies.set("userToken", newToken, {
			expires: 1,
			secure: true,
			sameSite: "Strict",
		});
		Cookies.set("userEmail", newEmail, {
			expires: 1,
			secure: true,
			sameSite: "Strict",
		});
		setToken(newToken);
		setEmail(newEmail);
	};

	const clearAuth = () => {
		Cookies.remove("userToken");
		Cookies.remove("userEmail");
		setToken(null);
		setEmail(null);
	};

	return (
		<AuthContext.Provider value={{ token, email, setAuth, clearAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
