//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Row, Select, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout"
import { useCallback, useEffect, useState } from "react";
import { CreateMultipleAnimalBreedRequest } from "../../../types/requests";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import SubmitButton from "../../../components/SubmitButton";
import StyleSheet from "../../../StyleSheet";
import { createMultipleBreeds, getAllAnimalFamilies } from "../../../methdos/methdos";
import { SelectOption, filterOption } from "../../../common/filterOptionInSelect";
import _ from "lodash";
import { useNavigate } from "react-router-dom";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateBreeds = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();
	const [disable, setDisable] = useState<boolean>(false);
	// Data
	const [families, setFamilies] = useState<SelectOption[]>([]);



	const openNotification = useCallback((type: NotificationType, title:string, message: string) => {
		api[type]({
			type: type,
			message: title,
			description: message,
			duration: 5
		});
	}, [api]);

	const onFinish = useCallback(async (values: CreateMultipleAnimalBreedRequest) => {
		if ( _.isEmpty(values.animalBreedsList) ) {
			openNotification(
				"warning",
				"Agregar razas de animales",
				"Por lo menos de debe de agregar una fila de registros."
			);
			return;
		}

		setDisable(true);

		await createMultipleBreeds(values)
			.then((resp) => {
				if (resp.status) {
					openNotification(
						"success",
						"Agregar razas de animales",
						"Las razas de animales se han guardado correctamente."
					);
					form.resetFields();
				}
				else {
					openNotification(
						"warning",
						"Agregar razas de animales",
						resp.message
					);
				}
			}).catch(() => {
				openNotification(
					"error",
					"Agregar razas de animales",
					`
					Ocurrió un error al intentar guardar las razas. Asegúrese que algúna de las
					razas no se encuentren registradas en el sistema.
					`
				);
			});

		setDisable(false);
	}, [openNotification, form]);



	useEffect(() => {
		getAllAnimalFamilies()
			.then((resp) => {
				if( resp.status ){
					setFamilies(
						resp.data.map((family) => (
							{
								label: `${family.name} | ${family.description}`,
								value: family.id
							} as SelectOption
						))
					);
				}
				else{
					openNotification(
						"error",
						"Error al obtener la lista de familias",
						resp.message
					);
				};
			}).catch(() => {
				openNotification(
					"error",
					"Error al obtener la lista de familias",
					`Ocurrió un error al momento de obtener la lista de las familas.
					Intente de nuevo más tarde.`
				);
			});
	}, [openNotification]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Agregar razas de animales"
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
										name="animalBreedsList"
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
																	label="Nombre de la raza"
																	name={[name, "breedName"]}
																	tooltip="Este campo hace referencia al nombre que define la raza de animal. Como ejemplo de una familia de caninos: labrador, chihuahua, pug, dogo de bordeus, pastor alemán, etcétera."
																	rules={[{
																		required: true,
																		message: "El nombre de la raza es obligatorio."
																	}]}
																>
																	<Input minLength={2} maxLength={32} />
																</Form.Item>
															</Col>
															<Col span={24} style={styles.inputContainer} >
																<Form.Item
																	{...restField}
																	label="Familia"
																	name={[name, "animalFamilyId"]}
																	tooltip="Familia a la que pertenece el animal. Ejemplo: Angora pertenece a felino, Husky pertenece a canino y Haplopelma lividum pertenece a arácnido."
																	rules={[{
																		required: true,
																		message: "La familia del animal es obligatoria."
																	}]}
																>
																	<Select
																		showSearch
																		placeholder="Seleccione una opción"
																		filterOption={filterOption}
																		options={families}
																	/>
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
export default CreateBreeds;
