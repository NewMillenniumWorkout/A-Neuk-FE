import React, { useState } from "react";
import IconButton from "../IconButton";
import axios from "axios";
import { IconProvider } from "../../utils/IconProvider";

const LoginPage = () => {
	const path = "http://10.210.60.64:7010";
	const sendGetRequest = async () => {
		try {
			const response = await axios.get(`${path}/login/oauth2/code/naver`);

			console.log("응답 데이터:", response.data);
		} catch (error) {
			console.error("API 요청 실패:", error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-8">
			<div className="flex flex-col w-full space-y-2">
				<button
					className="bg-green-500 text-white w-full h-11 rounded-lg"
					onClick={sendGetRequest}
				>
					네이버 로그인
				</button>

				<button className="bg-yellow-400 text-amber-950 w-full h-10 rounded-xl">
					카카오 로그인
				</button>

				<button className="bg-white border-2 w-full h-10 rounded-xl">
					구글 로그인
				</button>
			</div>
		</div>
	);
};

interface SocialLoginButtonProps {
	handleLogin: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
	handleLogin,
}) => {
	return (
		<button
			className="bg-green-500 text-white w-full h-11 rounded-lg"
			onClick={handleLogin}
		>
			네이버 로그인
		</button>
	);
};

export default LoginPage;
