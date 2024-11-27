import React, { useState } from "react";

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
					<span className="text-black-aneuk text-sm">
						{option.label}
					</span>
				</label>
			))}
		</div>
	);
};

export default CheckboxGroup;
