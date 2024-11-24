import profileImg from "../../assets/images/aneuk_profile.png";
import { IconProvider } from "../../utils/IconProvider";
import { formatTime } from "../../utils/TimeFormatter";
import { useChatPage } from "./ChatPageContext";

const ImageReceiver: React.FC = () => {
	const formattedTime = formatTime(new Date().toISOString());
	const { userImage, setUserImage } = useChatPage();

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const imageUrl = URL.createObjectURL(file);
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
				<div className="min-w-60 min-h-80 pt-2 px-2 rounded-2xl break-words box-border bg-white shadow-custom-strong">
					<div className="relative flex flex-col justify-center items-center min-w-56 min-h-64 w-56 h-64 rounded-xl bg-gray-aneuk opacity">
						<input
							id="file-upload"
							className="mt-2 w-52 hidden"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
						<label
							htmlFor="file-upload"
							className="cursor-pointer w-full h-full"
						>
							{userImage ? (
								<img
									src={userImage}
									alt="Preview"
									className="w-full h-full object-cover rounded-xl"
								/>
							) : (
								<div className="flex flex-col justify-center items-center min-w-56 min-h-64 w-max h-max text-white font-medium">
									<IconProvider.ImageIcon className="mb-2 w-10 h-10" />
									사진 추가하기
								</div>
							)}
						</label>
					</div>
				</div>
			</div>
			<div className="text-xs text-gray-aneuk pl-1">{formattedTime}</div>
		</div>
	);
};

export default ImageReceiver;
