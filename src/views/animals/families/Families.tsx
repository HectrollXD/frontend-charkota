//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Row, Table, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import StyleSheet from "../../../StyleSheet";
import { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import _ from "lodash";
import {
	deleteMultipleAnimalFamilies,
	getAllAnimalFamilies,
} from "../../../methdos/methdos";
import { DeleteMultipleAnimalFamilyRequest } from "../../../types/requests";

//-------------------------------------------------------------------------------------------------- Interface
type NotificationType = "success" | "info" | "warning" | "error";

interface FamiliesDataType {
	name: string;
	description: string;
	key: string;
}

//-------------------------------------------------------------------------------------------------- View
const Families = () => {
	//Navegation
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	const [deleteItemRender, setDeleteItemRender] = useState<boolean>(false);
	// Data
	const [families, setFamilies] = useState<FamiliesDataType[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	//Columnas de la tabla
	const columns: ColumnsType<FamiliesDataType> = [
		{
			title: "Nombre de familia",
			dataIndex: "name",
		},
		{
			title: "Descripcion de la familia",
			dataIndex: "description",
		},
	];

	//Alerta
	const openNotification = useCallback(
		(type: NotificationType, message: string) => {
			api[type]({
				type: type,
				message: "Familias",
				description: message,
				duration: 5,
			});
		},
		[api]
	);

	// Para la tabla cuando seleccionas itmes
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[]) => {
			setSelectedItems(selectedRowKeys.map((key) => key.toString()));
		},
	};

	// Aquí se llama al api para eliminar
	const handleDeleteItems = useCallback(() => {
		let request: DeleteMultipleAnimalFamilyRequest = {
			familiesId: selectedItems,
		};

		deleteMultipleAnimalFamilies(request)
			.then((resp) => {
				if (!resp.status) {
					openNotification(
						"success",
						"Se han eliminado los registros seleccionados satisfactoriamente"
					);
				} else {
					openNotification("warning", resp.message);
				}
				setTimeout(() => {
					window.location.reload();
				}, 5000);
			})
			.catch(() => {
				openNotification(
					"error",
					"Ocurrió un error al intentar eliminar los registros"
				);
			});
	}, [selectedItems, openNotification]);

	// Función para obtener los productos
	const getFamiliesFromBackend = useCallback(() => {
		getAllAnimalFamilies()
			.then((resp) => {
				if (resp.data) {
					setFamilies(
						resp.data.map(
							(famile) =>
							({
								name: famile.name,
								key: famile.id,
								description: famile.description,
							} as FamiliesDataType)
						)
					);
				} else {
					openNotification("warning", resp.message);
				}
			})
			.catch(() => {
				openNotification(
					"warning",
					"No fue posible obtener las familias. Intente de nuevo más tarde."
				);
			});
	}, [openNotification]);

	useEffect(() => {
		getFamiliesFromBackend();
	}, [getFamiliesFromBackend]);

	useEffect(() => {
		if (!_.isEmpty(selectedItems)) {
			setDeleteItemRender(true);
		} else {
			setDeleteItemRender(false);
		}
	}, [selectedItems]);

	const renderButton = () => (
		<>
			{deleteItemRender ? (
				<Button danger type="primary" onClick={handleDeleteItems}>
					Eliminar registro(s)
				</Button>
			) : (
				<Button
					style={styles.createNewButton}
					type="primary"
					onClick={() => navigate("create-new")}
				>
					Agregar familias
				</Button>
			)}
		</>
	);

	return (
		<>
			{contextHolder}
			<DefaultLayout title="Familias de animales" renderButton={renderButton()}>
				<Row>
					<Col span={24}>
						<h1>
							Todas las familias registradas
						</h1>
						<Divider />
						<Table
							rowSelection={{
								type: "checkbox",
								...rowSelection,
							}}
							columns={columns}
							dataSource={families}
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
export default Families;
