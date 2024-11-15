import profileImg from "../../assets/images/aneuk_profile.png";
import { formatTime } from "../../utils/TimeFormatter";

export function ImageReceiver() {
	const formattedTime = formatTime(new Date().toISOString());
	return (
		<div className="flex flex-row justify-start items-end mb-4">
			<img
				src={profileImg}
				alt="Profile"
				className="self-start w-9 h-9 mr-1 rounded-[16px] clip-round-40"
			></img>
			<div className="flex flex-col">
				<div className="ml-1.5 mb-1 mt-0.5 text-black-aneuk text-sm">
					아늑
				</div>
				<div className="w-44 pt-2 pb-2.5 px-4 rounded-3xl box-border bg-black-aneuk text-white">
					일기 생성을 완료했어!
				</div>
				<div className="max-w-60 pt-2 pb-2.5 px-4 mt-1 rounded-3xl break-words whitespace-pre-wrap box-border bg-black-aneuk text-white">
					<div className="w-44 min-h-44">이미지 버튼 자리</div>
				</div>
			</div>
			<div className="text-xs text-gray-aneuk pl-1">{formattedTime}</div>
		</div>
	);
}
