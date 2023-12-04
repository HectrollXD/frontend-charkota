//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import StyleSheet from "../../../StyleSheet";
import { useCallback, useState } from "react";
import { CreateMultipleProviderRequest } from "../../../types/requests";
import { createMultipleProviders } from "../../../methdos/methdos";
import SubmitButton from "../../../components/SubmitButton";
import _ from "lodash";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateProvider = () => {
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();
	// Control
	const [disable, setDisable] = useState<boolean>(false);
	const [form] = Form.useForm();



	const openNotification = useCallback((type: NotificationType, message: string) => {
		api[type]({
			type: type,
			message: "Crear proveedores",
			description: message,
			duration: 5
		});
	}, [api]);



	const onFinish = useCallback(async (values: CreateMultipleProviderRequest) => {
		if( _.isEmpty(values.providers) ){
			openNotification("warning", "Por lo menos de debe de agregar una fila de registros.");
			return;
		}

		setDisable(true);

		await createMultipleProviders(values).then((resp) => {
			if (resp.status && resp.data) {
				openNotification("success", `Se han agregado los proveedores correctamente.`);
				form.resetFields();
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification(
				"error",
				`
				Ocurrió un error al intentar guardar los proveedores. Asegúrese que algún proveedor
				no esté registrado o que el RFC, número de teléfono o correo electrónico no esté
				registrtado con otro proveedor.
				`
			);
		});

		setDisable(false);
	}, [openNotification, form]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Crear proveedores"
				renderButton={
					<Button danger type="primary" onClick={() => navigate(-1)}>Regresar</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h2>Datos generales del proveedor</h2>
					</Col>
					<Divider />
					<Col span={24}>
						<Form
							form={form}
							onFinish={onFinish}
						>
							<Row>
								<Col span={24}>
									<Form.List
										name="providers"
									>
										{(fields, { add, remove }) => (
											<Row>
												<Col span={24} style={styles.bottonDelContainer}>
													<Button
														disabled={disable}
														type="primary"
														icon={<PlusCircleOutlined />}
														style={{backgroundColor: "#12b754"}}
														onClick={() => add(undefined, 0)} 
													>
														Agregar nuevo
													</Button>
												</Col>
												<Col span={24}>
													{fields.map(({ key, name, ...restField }) => (
														<Row key={key}>
															<Col span={12} style={styles.inputContainer}>
																<Form.Item
																	{...restField}
																	label="Nombre del proveedor"
																	name={[name, "name"]}
																	tooltip="Nombre del proveedor: FEMSA, BIMBO, Sabritas, etc."
																	rules={[{
																		required: true,
																		message: "El nombre del provedor es obligatorio."
																	}]}
																>
																	<Input />
																</Form.Item>
															</Col>
															<Col span={12} style={styles.inputContainer} >
																<Form.Item
																	{...restField}
																	label="RFC"
																	name={[name, "rfc"]}
																	tooltip="Registro Federal de Contribuyente del proveedor."
																	rules={[{
																		required: true,
																		message: "El RFC del proveedor es obligatorio."
																	}]}>
																	<Input />
																</Form.Item>
															</Col>
															<Col span={12} style={styles.inputContainer}>
																<Form.Item
																	{...restField}
																	label="Número de teléfono"
																	name={[name, "phone"]}
																	tooltip="Número de teléfono con solo números. No se admiten carácteres especiales"
																	rules={[{
																		required: true,
																		message: "El número telefónico del proveedor es obligatorio."
																	}]}>
																	<Input type="phone" />
																</Form.Item>
															</Col>
															<Col span={12} style={styles.inputContainer}>
																<Form.Item
																	{...restField}
																	label="Correo electrónico"
																	name={[name, "email"]}
																	tooltip="Correo electrónico de contacto del proveedor."
																	rules={[{
																		required: true,
																		message: "El correo electrónico del proveedor es obligatorio."
																	}]}
																>
																	<Input type="email" />
																</Form.Item>
															</Col>
															<Col span={24} style={styles.inputContainer}>
																<Row>
																	<Col span={24} style={styles.bottonDelContainer}>
																		<Button disabled={disable} danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
																			Eliminar registro
																		</Button>
																	</Col>
																</Row>
															</Col>
															<Divider />
														</Row>
													))}
												</Col>
											</Row>
										)}
									</Form.List>
								</Col>
								<Col span={24} style={styles.saveButtonContainer}>
									<Form.Item >
										<SubmitButton form={form}/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</DefaultLayout>
		</>
	);
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
	saveButtonContainer: {
		display: "flex",
		justifyContent: "flex-end",
	},
});



//-------------------------------------------------------------------------------------------------- Exports
export default CreateProvider;
