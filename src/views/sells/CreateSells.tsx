//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Form, Input, Modal, Row, notification } from "antd";
import DefaultLayout from "../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { createNewSell, getProducts } from "../../methdos/methdos";
import _ from "lodash";
import { MinusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import SubmitButton from "../../components/SubmitButton";
import StyleSheet from "../../StyleSheet";
import { StoreValue } from "antd/es/form/interface";
import { SellRequest } from "../../types/requests";
import { useSelector } from "react-redux";
import { getUserData } from "../../stores/slices/userDataSlice";
import { SellResponse } from "../../types/respones";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const CreateSells = () => {
	const { userId } = useSelector(getUserData);
	const navigate = useNavigate();
	// Control
	const mxnFormatter = Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
	const [api, contextHolder] = notification.useNotification();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	// Data
	const [search, setSearch] = useState<string>("");
	const [sellData, setSellData] = useState<SellResponse>();
	const [qtty, setQtty] = useState<number>(1);
	const [form] = Form.useForm();



	const openNotification = useCallback((type: NotificationType, message: string) => {
		api[type]({
			type: type,
			message: "Ventas",
			description: message,
			duration: 5
		});
	}, [api]);



	const searchProduct = useCallback((add: (defaultValue?: StoreValue, insertIndex?: number) => void) => {
		if (qtty < 1) {
			openNotification(
				"error",
				`El valor de la cantidad debe de ser como mínimo 1.`
			);
		}
		else {
			getProducts(undefined, undefined, search).then((resp) => {
				if (resp.status) {
					if (!_.isEmpty(resp.data.products)) {
						add({
							productId: resp.data.products[0].id,
							name: resp.data.products[0].name,
							qty: qtty,
							unitaryPrice: resp.data.products[0].price,
							totalPrice: resp.data.products[0].price * qtty
						});
					}
					else {
						openNotification(
							"warning",
							`No se encontró un producto con el código de barras ${search}`
						);
					}
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
					`Ocurrió un error al intentar obtener el producto. Intente de nuevo más tarde.`
				);
			});

			setSearch("");
			setQtty(1);
		}
	}, [search, qtty, openNotification]);


	const registrySell = useCallback((values: SellRequest) => {
		values.userId = userId;

		createNewSell(values).then((resp) => {
			if (resp.status) {
				setSellData(resp.data);
				form.resetFields();
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification("error", "No fue posible registrar la venta. Intente de nuevo más tarde.");
			form.resetFields();
		});
	}, [openNotification, userId]);

	const handleOkModal = useCallback(() => {
		setIsModalOpen(false);
		setSellData(undefined);
	}, []);



	useEffect(() => {
		if (sellData) {
			setIsModalOpen(true);
		}
	}, [sellData]);



	return (
		<>
			<Modal
				title="Detalles de la venta"
				closable={false}
				open={isModalOpen}
				footer={[
					<Button type="primary" onClick={handleOkModal}>
						Aceptar
					</Button>
				]}
			>
				{(sellData) && (
					<>
						<p><b>ID de la venta</b>: {sellData.sellId}</p>
						<p><b>Total de la venta</b>: {mxnFormatter.format(sellData.total)}</p>
					</>
				)}
			</Modal >
			{contextHolder}
			< DefaultLayout
				title={"Nueva venta"}
				renderButton={
					< Button danger type="primary" onClick={() => navigate(-1)}>
						Cancelar
					</Button >
				}
			>
				<Form
					form={form}
					onFinish={registrySell}
				>
					<Row>
						<Col span={24}>
							<Form.List
								name={"productsSales"}
							>
								{(fields, { add, remove }) => (
									<Row>
										<Col span={24}>
											<Row>
												<Col span={16} style={styles.inputContainer}>
													<Form.Item
														label="Código del producto"
													>
														<Input
															value={search}
															maxLength={16}
															onChange={(e) => setSearch(e.target.value)}
															onKeyUp={(e) => (e.key === "Enter") && searchProduct(add)}
														/>
													</Form.Item>
												</Col>
												<Col span={6} style={styles.inputContainer}>
													<Form.Item
														label="Cantidad"
													>
														<Input
															value={qtty}
															maxLength={16}
															onChange={(e) => setQtty(Number.parseInt(e.target.value))}
															onKeyUp={(e) => (e.key === "Enter") && searchProduct(add)}
														/>
													</Form.Item>
												</Col>
												<Col span={2} style={{ ...styles.inputContainer, ...{ display: "flex", justifyContent: "flex-end" } }}>
													<Button
														type="primary"
														icon={<SearchOutlined />}
														onClick={() => searchProduct(add)}
													>
														Buscar
													</Button>
												</Col>
											</Row>

										</Col>
										<Divider />
										<Col span={24}>
											<Row>
												<Col span={10} style={styles.inputContainer}>
													<h3>Nombre del producto</h3>
												</Col>
												<Col span={4} style={styles.inputContainer}>
													<h3>Cantidad</h3>
												</Col>
												<Col span={4} style={styles.inputContainer}>
													<h3>Precio unitario</h3>
												</Col>
												<Col span={4} style={styles.inputContainer}>
													<h3>Subtotal</h3>
												</Col>
												<Col span={2} style={styles.inputContainer}>
													<h3>Acción</h3>
												</Col>
											</Row>
											{fields.map((field) => (
												<Row key={field.key}>
													<Col span={0}>
														<Form.Item
															{...field}
															name={[field.name, "productId"]}
														>
															<Input type="hidden" disabled />
														</Form.Item>
													</Col>
													<Col span={10} style={styles.inputContainer}>
														<Form.Item
															{...field}
															name={[field.name, "name"]}
														>
															<Input disabled />
														</Form.Item>
													</Col>
													<Col span={4} style={styles.inputContainer}>
														<Form.Item
															{...field}
															name={[field.name, "qty"]}
														>
															<Input disabled />
														</Form.Item>
													</Col>
													<Col span={4} style={styles.inputContainer}>
														<Form.Item
															{...field}
															name={[field.name, "unitaryPrice"]}
														>
															<Input disabled />
														</Form.Item>
													</Col>
													<Col span={4} style={styles.inputContainer}>
														<Form.Item
															{...field}
															name={[field.name, "totalPrice"]}
														>
															<Input disabled />
														</Form.Item>
													</Col>
													<Col span={2} style={styles.inputContainer}>
														<Button danger type="primary" block icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
													</Col>
												</Row>
											))}
										</Col>
									</Row>
								)}
							</Form.List>
						</Col >
						<Col span={24} style={styles.bottonDelContainer}>
							<SubmitButton form={form} />
						</Col>
					</Row >
				</Form >
			</DefaultLayout >
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
		marginBottom: 20,
	},
});



//-------------------------------------------------------------------------------------------------- Exports
export default CreateSells;