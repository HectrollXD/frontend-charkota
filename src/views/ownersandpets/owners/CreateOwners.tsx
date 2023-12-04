//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton";
import { useCallback } from "react";
import StyleSheet from "../../../StyleSheet";
import { OwnerRequest } from "../../../types/requests";
import { createOwner } from "../../../methdos/methdos";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateOwners = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();



	const openNotification = useCallback((type: NotificationType, message: string
	) => {
		api[type]({
			type: type,
			message: "Agregar dueños de animales",
			description: message,
			duration: 5
		});
	}, [api]);

	const onFinish = useCallback(async (values: OwnerRequest) => {
		await createOwner(values).then((resp) => {
			if (resp.status && resp.data) {
				openNotification(
					"success",
					`Se ha registrado a ${values.name} ${values.lastname} de manera correcta.`
				);
				form.resetFields();
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification(
				"error",
				`
				Ocurrió un error al intentar guardar ${values.name} ${values.lastname}. Asegúrese
				que no se encuentre registrado/a en el sistema.
				`
			);
		});
	}, [openNotification, form]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Agregar dueños de animales"
				renderButton={
					<Button danger type="primary" onClick={() => navigate(-1)}>
						Cancelar
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h2>Datos generales del producto</h2>
					</Col>
					<Divider />
					<Col span={24}>
						<Form
							form={form}
							onFinish={onFinish}
						>
							<Row>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Nombre del propietario"
										name={"name"}
										tooltip="Nombre de la persona encargada de una mascota."
										rules={[{
											required: true,
											message: "El nombre del propietario es obligatorio."
										}]}
									>
										<Input maxLength={64}/>
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Apellido(s)"
										name={"lastname"}
										tooltip="Apellidos de la persona encargada de una mascota."
										rules={[{
											required: true,
											message: "El apellido es obligatorio."
										}]}
									>
										<Input maxLength={64}/>
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Teléfono"
										name={"phone"}
										tooltip="Télefono de contacto de la persona."
										rules={[{
											required: true,
											message: "El teléfono es obligatorio."
										}]}
									>
										<Input maxLength={10}/>
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Correo electrónico"
										name={"email"}
										tooltip="Correo electrónico de contacto de la persona."
										rules={[{
											required: true,
											message: "El correo es obligatorio."
										}]}
									>
										<Input maxLength={128}/>
									</Form.Item>
								</Col>
								<Col span={24} style={styles.inputContainer}>
									<Form.Item
										label="Dirección"
										name={"address"}
										tooltip="Dirección de la persona."
									>
										<Input maxLength={256}/>
									</Form.Item>
								</Col>
								<Col span={24} style={styles.inputContainer}>
									<Row>
										<Col span={24} style={styles.bottonDelContainer}>
											<SubmitButton form={form} />
										</Col>
									</Row>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</DefaultLayout>
		</>
	)
};



//-------------------------------------------------------------------------------------------------- Styles
const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
	},
	bottonDelContainer: {
		display: "flex",
		justifyContent: "flex-end",
		marginBottom: 20
	},
});



//-------------------------------------------------------------------------------------------------- Exports
export default CreateOwners;
