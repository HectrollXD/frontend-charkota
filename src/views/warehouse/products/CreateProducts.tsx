//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Row, Select, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import StyleSheet from "../../../StyleSheet";
import { useCallback, useEffect, useState } from "react";
import { createProducts, getAllProviders } from "../../../methdos/methdos";
import { ProductRequest } from "../../../types/requests";
import TextArea from "antd/es/input/TextArea";
import SubmitButton from "../../../components/SubmitButton";
import { SelectOption, filterOption } from "../../../common/filterOptionInSelect";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateProducts = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();
	// Data
	const [providers, setProviders] = useState<SelectOption[]>([]);



	const openNotification = useCallback((
		type: NotificationType, title: string, message: string
	) => {
		api[type]({
			type: type,
			message: title,
			description: message,
			duration: 5
		});
	}, [api]);



	const onFinish = useCallback(async (values: ProductRequest) => {
		await createProducts(values).then((resp) => {
			if (resp.status && resp.data) {
				openNotification(
					"success",
					"Agregar productos",
					`Se ha registrado el producto "${values.name}" de manera correcta.`
				);
				form.resetFields();
			}
			else {
				openNotification("warning", "Agregar productos", resp.message);
			}
		}).catch(() => {
			openNotification(
				"error",
				"Agregar productos",
				`
				Ocurrió un error al intentar guardar los proveedores. Asegúrese que algún proveedor
				no esté registrado o que el RFC, número de teléfono o correo electrónico no esté
				registrtado con otro proveedor.
				`
			);
		});
	}, [openNotification, form]);



	useEffect(() => {
		getAllProviders()
			.then((resp) => {
				if (resp.status) {
					setProviders(
						resp.data.providers.map((prov) => (
							{
								label: prov.name,
								value: prov.id
							} as SelectOption
						))
					);
				}
				else {
					openNotification(
						"error",
						"Error al obtener la lista de proveedores",
						resp.message
					);
				}
			}).catch(() => {
				openNotification(
					"error",
					"Error al obtener la lista de proveedores",
					`
					No fue podoble obtener la lista de los proveedores registrados.
					Intente de nuevo más tarde.
					`
				);
			});
	}, [openNotification]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Agregar productos"
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
										label="Nombre del producto"
										name={"name"}
										tooltip="Nombre con el que se identificará en las ventas (debe de ser breve y conciso)."
										rules={[{
											required: true,
											message: "El nombre del producto es obligatorio."
										}]}
									>
										<Input maxLength={64} />
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer} >
									<Form.Item
										label="Código de barras"
										name={"barCode"}
										tooltip="Datos numéricos o alfanuméricos que se encuentran en el código de barras del producto."
										rules={[{
											required: true,
											message: "El códugio de barras del producto es obligatorio."
										}]}>
										<Input maxLength={16} />
									</Form.Item>
								</Col>
								<Col span={6} style={styles.inputContainer}>
									<Form.Item
										label="Precio"
										name={"price"}
										tooltip="Precio del producto que este tendrá al momento de una venta."
										rules={[{
											required: true,
											message: "El precio del producto es obligatorio."
										}]}>
										<Input type="number" placeholder="$0.0" />
									</Form.Item>
								</Col>
								<Col span={6} style={styles.inputContainer}>
									<Form.Item
										label="Cantidad"
										name={"qty"}
										tooltip="Cantidad de productos que serán ingrasados."
										rules={[{
											required: true,
											message: "La cantidad de productos es obligatorio."
										}]}
									>
										<Input type="number" min={1} />
									</Form.Item>
								</Col>
								<Col span={12} style={styles.inputContainer}>
									<Form.Item
										label="Proveedor"
										name={"providerId"}
										tooltip="Proveedor del producto que se está ingresando."
										rules={[{
											required: true,
											message: "El proveedor es obligatorio"
										}]}
									>
										<Select
											showSearch
											placeholder="Seleccione una opción"
											filterOption={filterOption}
											options={providers}
										/>
									</Form.Item>
								</Col>
								<Col span={24} style={styles.inputContainer}>
									<Form.Item
										label="Descripción del producto"
										name={"description"}
										tooltip="Descripción del producto de manera detallada. Este es para un mejor control interno, no aparecerá en las ventas."
									>
										<TextArea maxLength={256} />
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
export default CreateProducts;
