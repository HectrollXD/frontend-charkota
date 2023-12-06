//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Row, notification } from "antd";
import DefaultLayout from "../../components/DefaultLayout";
import StyleSheet from "../../StyleSheet";
import { useNavigate } from "react-router-dom";
import Table, { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { getAllAnimalsBreeds, getAllSales } from "../../methdos/methdos";
import moment from "moment";
import { slice } from "lodash";



//-------------------------------------------------------------------------------------------------- Interfaces
export interface SellDataType {
	key: string;
	datetime: string;
	user: string;
	total: string;
	products: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const Sells = () => {
	const navigate = useNavigate();
	// Control
	const mxnFormatter = Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
	const [api, contextHolder] = notification.useNotification();
	// Data
	const [sales, setSales] = useState<SellDataType[]>([]);
	const columns: ColumnsType<SellDataType> = [
		{
			title: 'Fecha y hora de venta',
			dataIndex: 'datetime',
		},
		{
			title: 'Nombre de usuario',
			dataIndex: 'user',
		},
		{
			title: 'Total de la venta',
			dataIndex: 'total',
		},
		{
			title: 'Productos',
			dataIndex: 'products',
		},
	];



	const openNotification = useCallback((
		type: NotificationType, message: string
	) => {
		api[type]({
			type: type,
			message: "Ventas",
			description: message,
			duration: 5
		});
	}, [api]);



	useEffect(() => {
		getAllSales().then((resp) => {
			if (resp.data) {
				setSales(
					resp.data.sales.map(sale => ({
						key: sale.id,
						datetime: moment(sale.datetime).format("YYYY-MM-DD hh:mm:ss"),
						total: mxnFormatter.format(sale.total),
						user: sale.user.username,
						products: sale.products.map(prd => " " + prd.product.name ).toString()
					} as SellDataType))
				)
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification("error", "No fue posible obtener las razas. Intente de nuevo más tarde.");
		});
	}, [openNotification]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Ventas"
				renderButton={
					<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
						Generar nueva venta
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h1>
							Todas las ventas registradas
						</h1>
						<Divider />
						<Table
							columns={columns}
							dataSource={sales}
						/>
					</Col>
				</Row>
			</DefaultLayout>
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
export default Sells;
