//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Row, Table, notification } from "antd";
import StyleSheet from "../../../StyleSheet";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { Key, useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { deleteProduct, getProducts } from "../../../methdos/methdos";
import _ from "lodash";



//-------------------------------------------------------------------------------------------------- Interfaces
export interface ProductDataType {
	key: string;
	name: string;
	price: string;
	qtty: number;
	providerName: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const Porducts = () => {
	const navigate = useNavigate();
	const mxnFormatter = Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [deleteItemRender, setDeleteItemRender] = useState<boolean>(false);
	// Data
	const [products, setProducts] = useState<ProductDataType[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const columns: ColumnsType<ProductDataType> = [
		{
			title: 'Nombre',
			dataIndex: 'name',
		},
		{
			title: 'Precio',
			dataIndex: 'price',
		},
		{
			title: 'Cantidad',
			dataIndex: 'qtty',
		},
		{
			title: 'Nombre del proveedor',
			dataIndex: 'providerName',
		}
	];



	// Para la notificación
	const openNotification = useCallback((
		type: NotificationType, message: string
	) => {
		api[type]({
			type: type,
			message: "Productos",
			description: message,
			duration: 5
		});
	}, [api]);

	// Para la tabla cuando seleccionas itmes
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[]) => {
			setSelectedItems(selectedRowKeys.map(key => key.toString()));
		},
	};

	// Aquí se llama al api para eliminar
	const handleDeleteItems = useCallback(() => {
		selectedItems.forEach(item => {
			deleteProduct(item).then((resp) => {
				if( resp.status ) {
					openNotification(
						"success",
						`Se ha eliminado el producto con id ${item} satisfactoriamente.`
					);
				}
				else{
					openNotification(
						"warning",
						resp.message
					);
				}
			}).catch(() => {
				openNotification(
					"error",
					`No fue posible eliminar el producto con ID ${item}. Inténtelo de nuevo más tarde.`
				);
			});
		});

		setTimeout(() => {window.location.reload()}, 5000);
	}, [selectedItems, openNotification]);

	// Función para obtener los productos
	const getProductsFromBackend = useCallback(() => {
		getProducts()
			.then((resp) => {
				if (resp.data) {
					setProducts(
						resp.data.products.map(prd => ({
							key: prd.id,
							name: prd.name,
							price: mxnFormatter.format(prd.price),
							qtty: prd.qty,
							providerName: prd.provider.name
						} as ProductDataType))
					);
				}
				else {
					openNotification("warning", resp.message);
				}
			}).catch(() => {
				openNotification("error", "No fue posible obtener los productos. Intente de nuevo más tarde.");
			});
	}, [openNotification]);



	// Mandamos a traer los productos del back
	useEffect(() => {
		getProductsFromBackend();
	}, [getProductsFromBackend]);

	// Para escuchar los items seleccionados y saber que botón vamos a renderizar.
	useEffect(() => {
		if (!_.isEmpty(selectedItems)) {
			setDeleteItemRender(true);
		}
		else {
			setDeleteItemRender(false);
		}
	}, [selectedItems]);



	// Renderizado de botón de agregar o eliminar
	const renderButton = () => (
		<>
			{(deleteItemRender) ? (
				<Button danger type="primary" onClick={handleDeleteItems}>
					Eliminar registro(s)
				</Button>
			) : (
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar nuevo producto
				</Button>
			)}
		</>
	);

	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Productos"
				renderButton={renderButton()}
			>
				<Row>
					<Col span={24}>
						<Table
							rowSelection={{
								type: "checkbox",
								...rowSelection
							}}
							columns={columns}
							dataSource={products}
						/>
					</Col>
				</Row>
			</DefaultLayout >
		</>
	);
};



//-------------------------------------------------------------------------------------------------- Styles
const styles = StyleSheet.create({
	createNewButton: {
		backgroundColor: "#12b754",
	},
});



//-------------------------------------------------------------------------------------------------- Exports
export default Porducts;
