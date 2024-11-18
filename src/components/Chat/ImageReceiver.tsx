import profileImg from "../../assets/images/aneuk_profile.png";
import { formatTime } from "../../utils/TimeFormatter";
import { useState } from "react";

export function ImageReceiver() {
	const [userImage, setUserImage] = useState<string | null>(null);
	const formattedTime = formatTime(new Date().toISOString());

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const imageUrl = URL.createObjectURL(file); // 미리보기 URL 생성
			setUserImage(imageUrl);
		}
	};

	return (
		<div className="flex flex-row justify-start items-end mb-4">
			<img
				src={profileImg}
				alt="Profile"
				className="self-start w-9 h-9 mr-1 rounded-[16px] clip-round-40"
			></img>
			<div className="flex flex-col min-w-60">
				<div className="ml-1.5 mb-1 mt-0.5 text-black-aneuk text-sm">
					아늑
				</div>
				<div className="w-44 pt-2 pb-2.5 px-4 rounded-3xl box-border bg-black-aneuk text-white">
					일기 생성을 완료했어!
				</div>
				<div className="max-w-60 pt-2 pb-2.5 px-4 mt-1 rounded-3xl break-words box-border bg-black-aneuk text-white">
					<div className="min-h-60 flex flex-col justify-center items-center">
						<input
							id="file-upload"
							className="mt-2 w-52 hidden"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
						<label
							htmlFor="file-upload"
							className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
						>
							파일 선택
						</label>
						{userImage && (
							<img
								src={userImage}
								alt="Preview"
								className="py-1 w-56 aspect-square object-cover rounded-2xl"
							/>
						)}
					</div>
				</div>
			</div>
			<div className="text-xs text-gray-aneuk pl-1">{formattedTime}</div>
		</div>
	);
}
