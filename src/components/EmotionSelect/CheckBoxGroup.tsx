import React, { useState } from "react";
import { IconProvider } from "../../utils/IconProvider";

interface CheckboxOption {
	id: number;
	label: string;
}

interface CheckboxGroupProps {
	options: CheckboxOption[];
	selectedOptions: number[];
	onChange: (selected: number[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	const handleCheckboxChange = (id: number) => {
		if (selectedOptions.includes(id)) {
			onChange(selectedOptions.filter((optionId) => optionId !== id));
		} else {
			onChange([...selectedOptions, id]);
		}
	};

	return (
		<div className="space-y-2">
			{options.map((option) => (
				<label
					key={option.id}
					className="flex items-center cursor-pointer space-x-2"
				>
					<input
						type="checkbox"
						checked={selectedOptions.includes(option.id)}
						onChange={() => handleCheckboxChange(option.id)}
						className="form-checkbox text-blue-600"
					/>
					<div className="flex flex-row w-full h-6 my-2 justify-between items-center">
						<span className="text-black-aneuk text-md font-gowun-bold">
							{option.label}
						</span>

						<button onClick={() => {}} className="text-black-aneuk">
							<IconProvider.RightArrowIcon className="ml-0.5" />
						</button>
					</div>
				</label>
			))}
		</div>
	);
};

export default CheckboxGroup;
