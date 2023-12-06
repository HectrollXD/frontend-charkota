//-------------------------------------------------------------------------------------------------- Imports
import { Button, Divider, Table, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { getAllProviders } from "../../../methdos/methdos";
import { ColumnsType } from "antd/es/table";
import { formatPhoneNumber } from "../../../common/formatPhoneNumber";



//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = "success" | "info" | "warning" | "error";

interface DataType {
	key: string;
	name: string;
	rfc: string;
	phone: string;
	email: string;
};



//-------------------------------------------------------------------------------------------------- View
const Providers = () => {
	const navigate = useNavigate();
	const [provedores, set_Provedores] = useState<DataType[]>([]);
	const [api, contextHolder] = notification.useNotification();
	const columns: ColumnsType<DataType>= [
		{
			title: "Nombre",
			dataIndex: "name"
		},
		{
			title: "RFC",
			dataIndex: "rfc"
		},
		{
			title: "Teléfono de contacto",
			dataIndex: "phone"
		},
		{
			title: "Email de contacto",
			dataIndex: "email"
		},
	];



	const openNotification = useCallback(
		(type: NotificationType, title: string, message: string) => {
			api[type]({
				type: type,
				message: title,
				description: message,
				duration: 5,
			});
		},
		[api]
	);

	useEffect(() => {
		getAllProviders()
			.then((resp) => {
				if (resp.status) {
					set_Provedores(
						resp.data.providers.map(prv => ({
							key: prv.id,
							email: prv.email,
							name: prv.name,
							rfc: prv.rfc,
							phone: formatPhoneNumber(prv.phone)
						} as DataType))
					);
				} else {
					openNotification(
						"error",
						"Error al obtener la lista de proveedores",
						resp.message
					);
				}
			})
			.catch(() => {
				openNotification(
					"error",
					"Error al obtener la lista de proveedores",
					`Ocurrió un error al momento de obtener la lista de los proveedores.
				Intente de nuevo más tarde.`
				);
			});
	}, [openNotification]);

	return (
		<React.Fragment>
			{contextHolder}
			<DefaultLayout
				title="Proveedores"
				renderButton={
					<Button
						style={{ backgroundColor: "#12b754" }}
						type="primary"
						onClick={() => navigate("create-new")}
					>
						Agregar nuevo porveedor
					</Button>
				}
			>
				<h1>Todos los proveedores registrados</h1>
				<Divider />
				<Table columns={columns} dataSource={provedores} />
			</DefaultLayout>
		</React.Fragment>
	);
};

//-------------------------------------------------------------------------------------------------- Exports
export default Providers;
