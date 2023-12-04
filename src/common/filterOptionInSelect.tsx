export interface SelectOption {
	label: string;
	value: string;

};



export const filterOption = (input: string, option?: SelectOption) => (
	option?.label ?? '').toLowerCase().includes(input.toLowerCase()
);
