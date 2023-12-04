//-------------------------------------------------------------------------------------------------- Immports
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import type { FormInstance } from 'antd';
import { useEffect, useState } from "react";



//-------------------------------------------------------------------------------------------------- Interfaces
interface SubmitButtonProps {
	form: FormInstance;
};



//-------------------------------------------------------------------------------------------------- Component
const SubmitButton = (props: SubmitButtonProps) => {
	const { form } = props;
	const [submittable, setSubmittable] = useState(false);
	const values = Form.useWatch([], form);



	useEffect(() => {
		form.validateFields({ validateOnly: true }).then(
			() => {
				setSubmittable(true);
			},
			() => {
				setSubmittable(false);
			},
		);
	}, [values, form]);



	return (
		<Button
			type="primary"
			htmlType="submit"
			icon={<SaveOutlined/>}
			disabled={!submittable}
			style={{backgroundColor: "#127cb7", color: "#ffffff"}}
		>
			Guardar
		</Button>
	);
};



//-------------------------------------------------------------------------------------------------- Exports
export default SubmitButton;
