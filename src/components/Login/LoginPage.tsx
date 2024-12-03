import React, { useState, useEffect } from "react";
import naverImg from "../../assets/images/naver.png";
import kakaoImg from "../../assets/images/kakao.png";
import googleImg from "../../assets/images/google.png";
import aneukImg from "../../assets/images/aneuk_profile.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const LoginPage = () => {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email");
	const accessToken = searchParams.get("accessToken");

	const navigate = useNavigate();
	const { setAuth } = useAuth();

	useEffect(() => {
		if (email && accessToken) {
			setAuth(accessToken, email);
			navigate("/calendar", { replace: true });
		}
	}, [email, accessToken, navigate, setAuth]);

	return (
		<div className="absolute inset-0 z-50 bg-white flex flex-col justify-center items-center w-full h-full p-8">
			<img src={aneukImg} className="w-[25%] rounded-full mb-2" />
			<div className="font-pretendard-bold text-2xl mb-44">아늑</div>
			<div className="font-pretendard-light text-gray-aneuk text-base mb-4">
				- 로그인하여 나의 감정 알아보러 가기 -
			</div>
			<div className="flex flex-col w-full space-y-2">
				<SocialLoginButton
					handleLogin={() => {
						window.location.href =
							"https://aneuk-api.dev-lr.com/oauth2/authorization/naver";
					}}
					img={naverImg}
					label="네이버 로그인"
					labelColor="text-white"
					bgColor="bg-[#03C75A]"
				/>
				<SocialLoginButton
					handleLogin={() => {
						window.location.href =
							"https://aneuk-api.dev-lr.com/oauth2/authorization/kakao";
					}}
					img={kakaoImg}
					label="Kakao 로그인"
					labelColor="text-black"
					bgColor="bg-[#FEE500]"
				/>
				<SocialLoginButton
					handleLogin={() => {
						window.location.href =
							"https://aneuk-api.dev-lr.com/oauth2/authorization/google";
					}}
					img={googleImg}
					label="Google 로그인"
					labelColor="text-black"
					bgColor="bg-white border"
				/>
			</div>
		</div>
	);
};

interface SocialLoginButtonProps {
	handleLogin: () => void;
	img: string;
	label: string;
	labelColor: string;
	bgColor: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
	handleLogin,
	img,
	label,
	labelColor,
	bgColor,
}) => {
	return (
		<button
			className={`flex justify-center items-center ${labelColor} ${bgColor} w-full h-11 rounded-[12px] px-4`}
			onClick={handleLogin}
		>
			<div className="flex flex-row justify-start items-center">
				<img src={img} className="w-10" />
				<div className="w-28 font-pretendard-regular text-base">
					{label}
				</div>
			</div>
		</button>
	);
};

export default LoginPage;
