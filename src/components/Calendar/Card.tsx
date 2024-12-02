import sampleImg from "../../assets/images/aneuk_profile.png";

const Card: React.FC = () => {
	return (
		<div className="flex flex-col w-[90%] aspect-[2/2.8] p-2 mt-[5%] bg-white rounded-[32px] shadow-custom-strong">
			<img
				src={sampleImg}
				className="flex flex-col justify-center items-center w-[100%] h-[80%] rounded-[24px] object-cover"
			/>
			<div className="flex flex-row flex-1 justify-start items-start p-2 space-x-2">
				<div className="aspect-square w-[8%] rounded-full bg-green-500" />
				<div className="aspect-square w-[8%] rounded-full bg-blue-500" />
			</div>
		</div>
	);
};

export default Card;
