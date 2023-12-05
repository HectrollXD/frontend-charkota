//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";
import StyleSheet from "../../../StyleSheet";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { CreateMultipleAnimalFamilyRequest } from "../../../types/requests";
import SubmitButton from "../../../components/SubmitButton";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { createMultipleFamiliest } from "../../../methdos/methdos";
import _ from "lodash";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateFamilies = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();
	const [disable, setDisable] = useState<boolean>(false);
	// Data



	const openNotification = useCallback((type: NotificationType, message: string) => {
		api[type]({
			type: type,
			message: "Agregar familias de animales",
			description: message,
			duration: 5
		});
	}, [api]);

	const onFinish = useCallback(async (values: CreateMultipleAnimalFamilyRequest) => {
		if (_.isEmpty(values.families)) {
			openNotification(
				"warning",
				"Por lo menos de debe de agregar una fila de registros."
			);
			return;
		}

		setDisable(true);

		await createMultipleFamiliest(values)
			.then((resp) => {
				if (resp.status) {
					openNotification(
						"success",
						"Las familias de animales se han guardado correctamente."
					);
					form.resetFields();
				}
				else {
					openNotification(
						"warning",
						resp.message
					);
				}
			}).catch(() => {
				openNotification(
					"error",
					`
					Ocurrió un error al intentar guardar las familias. Asegúrese que algúna de las
					familias no se encuentren registradas en el sistema.
					`
				);
			});

		setDisable(false);
	}, [openNotification, form]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Agregar familias de animales"
				renderButton={
					<Button danger type="primary" onClick={() => navigate(-1)}>
						Cancelar
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h2>Datos generales de las familias de animales</h2>
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
										name="families"
									>
										{(fields, { add, remove }) => (
											<Row>
												<Col span={24} style={styles.bottonDelContainer}>
													<Button
														disabled={disable}
														type="primary"
														icon={<PlusCircleOutlined />}
														style={{ backgroundColor: "#12b754" }}
														onClick={() => add(undefined, 0)}
													>
														Agregar nueva fila
													</Button>
												</Col>
												<Col span={24}>
													{fields.map(({ key, name, ...restField }) => (
														<Row key={key}>
															<Col span={24} style={styles.inputContainer}>
																<Form.Item
																	{...restField}
																	label="Nombre de la familia"
																	name={[name, "familyName"]}
																	tooltip="Este campo hace referencia al nombre que define el tipo de animal: (canino, felino, reptíl, etcétera)."
																	rules={[{
																		required: true,
																		message: "El nombre de la familia es obligatorio."
																	}]}
																>
																	<Input minLength={2} maxLength={32} />
																</Form.Item>
															</Col>
															<Col span={24} style={styles.inputContainer} >
																<Form.Item
																	{...restField}
																	label="Descripción"
																	name={[name, "description"]}
																	tooltip="Descripción de los tipos de animales que abarca. Ejemplo: canino -> (perros, lobos, coyotes)"
																>
																	<TextArea minLength={1} maxLength={128} />
																</Form.Item>
															</Col>
															<Col span={24} style={styles.inputContainer}>
																<Row>
																	<Col span={24} style={styles.bottonDelContainer}>
																		<Button disabled={disable} danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
																			Eliminar fila
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
										<SubmitButton form={form} />
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
export default CreateFamilies;
