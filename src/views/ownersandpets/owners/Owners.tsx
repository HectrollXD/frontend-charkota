//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Row, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import StyleSheet from "../../../StyleSheet";
import { useCallback, useEffect, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { getOwnersData } from "../../../methdos/methdos";
import { formatPhoneNumber } from "../../../common/formatPhoneNumber";



//-------------------------------------------------------------------------------------------------- Interfaces
export interface OwnerDataType {
	key: string;
	name: string;
	email: string;
	phone: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const Owners = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [pets, setPets] = useState<OwnerDataType[]>([]);
	const columns: ColumnsType<OwnerDataType> = [
		{
			title: 'Nombre de persona',
			dataIndex: 'name',
		},
		{
			title: 'Email de contacto',
			dataIndex: 'email',
		},
		{
			title: 'Teléfono de contacto',
			dataIndex: 'phone',
		}
	];



	const openNotification = useCallback((
		type: NotificationType, message: string
	) => {
		api[type]({
			type: type,
			message: "Mascotas",
			description: message,
			duration: 5
		});
	}, [api]);



	useEffect(() => {
		getOwnersData().then((resp) => {
			if (resp.status) {
				setPets(
					resp.data.owners.map(own => ({
						key: own.id,
						name: `${own.name} ${own.lastname}`,
						email: own.email,
						phone: formatPhoneNumber(own.phone)
					} as OwnerDataType))
				);
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification("error", "No fue posible obtener a las mascotas. Intente de nuevo más tarde.");
		});
	}, [openNotification]);



	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Propietarios de mascotas"
				renderButton={
					<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
						Agregar dueños
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h1>
							Todos los dueños registrados
						</h1>
						<Divider />
						<Table
							columns={columns}
							dataSource={pets}
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
export default Owners;
