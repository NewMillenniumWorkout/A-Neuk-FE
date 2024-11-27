import React, { useState } from "react";
import { IconProvider } from "../../utils/IconProvider";

interface CheckboxOption {
	id: number;
	label: string;
}

interface CheckboxGroupProps {
	options: CheckboxOption[];
	selectedOptions: string[];
	onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	const handleCheckboxChange = (label: string) => {
		if (selectedOptions.includes(label)) {
			onChange(selectedOptions.filter((option) => option !== label));
		} else {
			onChange([...selectedOptions, label]);
		}
	};

	return (
		<div>
			{options.map((option) => (
				<div className="flex flex-row">
					<label
						key={option.id}
						className="flex w-full items-center cursor-pointer space-x-2"
					>
						<input
							type="checkbox"
							checked={selectedOptions.includes(option.label)}
							onChange={() => handleCheckboxChange(option.label)}
							className="form-checkbox text-blue-600"
						/>
						<div className="h-6 my-2 justify-between items-center">
							<span className="text-black-aneuk text-md font-gowun-bold">
								{option.label}
							</span>
						</div>
					</label>

					<button onClick={() => {}} className="text-gray-aneuk">
						<IconProvider.DownArrowIcon className="ml-0.5" />
					</button>
				</div>
			))}
		</div>
	);
};

export default CheckboxGroup;
