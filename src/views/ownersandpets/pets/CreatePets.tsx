//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../../components/DefaultLayout";
import { useCallback, useEffect, useState } from "react";
import { OwnerRequest, PetRequest } from "../../../types/requests";
import StyleSheet from "../../../StyleSheet";
import SubmitButton from "../../../components/SubmitButton";
import { SelectOption, filterOption } from "../../../common/filterOptionInSelect";
import { createPet, getAllAnimalsBreeds, getOwnersData } from "../../../methdos/methdos";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreatePets = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [disable, setDisable] = useState<boolean>(false);
	const [form] = Form.useForm();
	// Data
	const [owners, setOwners] = useState<SelectOption[]>([]);
	const [breeds, setBreeds] = useState<SelectOption[]>([]);



	const openNotification = useCallback((type: NotificationType, message: string) => {
		api[type]({
			type: type,
			message: "Agregar mascotas",
			description: message,
			duration: 5
		});
	}, [api]);

	const onFinish = useCallback(async (values: PetRequest) => {
		await createPet(values).then((resp) => {
			if (resp.status && resp.data) {
				openNotification(
					"success",
					`Se ha registrado a la mascota ${values.name} de manera correcta.`
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
				Ocurrió un error al intentar guardar a la mascota ${values.name}. Asegúrese
				que no se encuentre registrado/a en el sistema.
				`
			);
		});
	}, [openNotification, form]);


	useEffect(() => {
		getOwnersData()
			.then((resp) => {
				if (resp.data) {
					setOwners(
						resp.data.owners.map(obj => ({
							value: obj.id,
							label: `${obj.name} ${obj.lastname}`
						}))
					)
				}
				else {
					openNotification("warning", resp.message);
				}
			}).catch(() => {
				openNotification(
					"error",
					"No fue posible obtener la lista de los propietarios. Intente de nuevo más tarde."
				);
			});

		getAllAnimalsBreeds()
			.then((resp) => {
				console.log(resp);
				if (resp.data) {
					setBreeds(
						resp.data.map(obj => ({
							value: obj.id,
							label: `${obj.breedName} -> ${obj.family.name}`
						}))
					);
				}
				else {
					openNotification("warning", resp.message);
				}
			}).catch(() => {
				openNotification(
					"error",
					"No fue posible obtener la lista de las razas de animales. Intente de nuevo más tarde."
				);
			});
	}, [openNotification]);


	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Agregar mascotas"
				renderButton={
					<Button danger type="primary" onClick={() => navigate(-1)}>
						Cancelar
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h2>Datos generales de la mascota</h2>
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
										label="Nombre de la mascota"
										name={"name"}
										tooltip="Nombre de la mascota que se agregará al sistema"
										rules={[{
											required: true,
											message: "El nombre de la mascota es obligatorio."
										}]}
									>
										<Input maxLength={255} />
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Fecha de nacimiento"
										name={"birthDate"}
										tooltip="Fecha de nacimiento de la mascota."
										rules={[{
											required: true,
											message: "La fecha de nacimiento es obligatorio."
										}]}
									>
										<DatePicker style={{ width: '100%' }} />
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Raza de la mascota"
										name={"animalBreedId"}
										tooltip="Raza a la que pertenece la mascota."
										rules={[{
											required: true,
											message: "La raza de la mascota es obligatorio."
										}]}
									>
										<Select
											showSearch
											placeholder="Seleccione una opción"
											filterOption={filterOption}
											options={breeds}
										/>
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Propietario de la mascota"
										name={"ownerId"}
										tooltip="Propietario encargado de las desiciones de la mascota."
										rules={[{
											required: true,
											message: "El propietarion es obligatorio."
										}]}
									>
										<Select
											showSearch
											placeholder="Seleccione una opción"
											filterOption={filterOption}
											options={owners}
										/>
									</Form.Item>
								</Col>


								<Col span={24}>
									<Form.List
										name={"vaccines"}
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
														Agregar nueva vacuna
													</Button>
												</Col>
												{fields.map(({ key, name, ...restField }) => (
													<>
														<Col span={8} style={styles.inputContainer}>
															<Form.Item
																{...restField}
																label="Nombre de vacuna"
																name={[name, "vaccineName"]}
																tooltip="Nombre de la vacuna aplicada a la mascota."
																rules={[{
																	required: true,
																	message: "El nombre de la vacuna es obligatorio."
																}]}
															>
																<Input maxLength={64} />
															</Form.Item>
														</Col>
														<Col span={5} style={styles.inputContainer}>
															<Form.Item
																{...restField}
																label="Dosis aplicada"
																name={[name, "dose"]}
																tooltip="Mililitros de solución que se aplicó a la mascota."
																rules={[{
																	required: true,
																	message: "La dosis de la vacuna es obligatorio."
																}]}
															>
																<Input type="number" maxLength={64} />
															</Form.Item>
														</Col>
														<Col span={8} style={styles.inputContainer}>
															<Form.Item
																{...restField}
																label="Fecha de aplicación"
																name={[name, "applicationDate"]}
																tooltip="La fecha en que la vacuna fue puesta a la mascota."
																rules={[{
																	required: true,
																	message: "La fecha de aplicación es obligatoria."
																}]}
															>
																<DatePicker style={{ width: '100%' }} />
															</Form.Item>
														</Col>
														<Col span={3} style={styles.inputContainer}>
															<Form.Item
															>
																<Button disabled={disable} danger block icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
																	Eliminar fila
																</Button>
															</Form.Item>
														</Col>
													</>
												))}
											</Row>
										)}
									</Form.List>
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
export default CreatePets;
