//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Row, Table, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import StyleSheet from "../../../StyleSheet";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { deleteMultipleAnimalBreeds, getAllAnimalsBreeds } from "../../../methdos/methdos";
import { DeleteMultipleAnimalBreedsRequest } from "../../../types/requests";
import _ from "lodash";



//-------------------------------------------------------------------------------------------------- Interfaces
export interface BreedDataType {
	key: string;
	breedName: string;
	family: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const Breeds = () => {
	const navigate = useNavigate();
	// Control
	const [deleteItemRender, setDeleteItemRender] = useState<boolean>(false);
	const [api, contextHolder] = notification.useNotification();
	// Data
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [breeds, setBreeds] = useState<BreedDataType[]>([]);
	const columns: ColumnsType<BreedDataType> = [
		{
			title: 'Nombre de raza',
			dataIndex: 'breedName',
		},
		{
			title: 'Familia de animal',
			dataIndex: 'family',
		},
	];



	const openNotification = useCallback((
		type: NotificationType, message: string
	) => {
		api[type]({
			type: type,
			message: "Razas de animales",
			description: message,
			duration: 5
		});
	}, [api]);

	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[]) => {
			setSelectedItems(selectedRowKeys.map(key => key.toString()));
		},
	};

	const handleDeleteItems = useCallback(() => {
		let request: DeleteMultipleAnimalBreedsRequest = {
			animalBreedsIds: selectedItems
		};

		deleteMultipleAnimalBreeds(request).then((resp) => {
			if (resp.status) {
				openNotification(
					"success", "Se han eliminado los registros seleccionados satisfactoriamente."
				);
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification(
				"error",
				"No fue posible eliminar los registros seleccionados. Inténtelo de nuevo más tarde."
			);
		});

		setTimeout(() => { window.location.reload() }, 5000);
	}, [selectedItems, openNotification]);



	useEffect(() => {
		getAllAnimalsBreeds().then((resp) => {
			if (resp.data) {
				setBreeds(
					resp.data.map(breed => ({
						key: breed.id,
						breedName: breed.breedName,
						family: breed.family.name
					} as BreedDataType))
				)
			}
			else {
				openNotification("warning", resp.message);
			}
		}).catch(() => {
			openNotification("error", "No fue posible obtener las razas. Intente de nuevo más tarde.");
		});
	}, [openNotification]);

	useEffect(() => {
		if (!_.isEmpty(selectedItems)) {
			setDeleteItemRender(true);
		}
		else {
			setDeleteItemRender(false);
		}
	}, [selectedItems]);


	const renderButton = () => (
		<>
			{(deleteItemRender) ? (
				<Button danger type="primary" onClick={handleDeleteItems}>
					Eliminar registro(s)
				</Button>
			) : (
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar razas
				</Button>
			)}
		</>
	);

	return (
		<>
			{contextHolder}
			<DefaultLayout
				title="Razas de animales"
				renderButton={renderButton()}
			>
				<Row>
					<Col span={24}>
						<h1>
							Todas las razas registradas
						</h1>
						<Divider />
						<Table
							rowSelection={{
								type: "checkbox",
								...rowSelection
							}}
							columns={columns}
							dataSource={breeds}
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
export default Breeds;
