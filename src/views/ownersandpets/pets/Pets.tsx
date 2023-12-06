//-------------------------------------------------------------------------------------------------- Imports
import { Button, Col, Divider, Row, Table, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import StyleSheet from "../../../StyleSheet";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getAllPets } from "../../../methdos/methdos";



//-------------------------------------------------------------------------------------------------- Interfaces
export interface PetDataType {
	key: string;
	name: string;
	animalBreedAndFamily: string;
	owner: string;
	vaccines: string;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';



//-------------------------------------------------------------------------------------------------- View
const Pets = () => {
	const navigate = useNavigate();
	// Control
	const [api, contextHolder] = notification.useNotification();
	// Data
	const [pets, setPets] = useState<PetDataType[]>([]);
	const columns: ColumnsType<PetDataType> = [
		{
			title: 'Nombre de mascota',
			dataIndex: 'name',
		},
		{
			title: 'Raza y familia de animal',
			dataIndex: 'animalBreedAndFamily',
		},
		{
			title: 'Nombre del propietario',
			dataIndex: 'owner',
		},
		{
			title: 'Vacunas',
			dataIndex: 'vaccines',
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
		getAllPets().then((resp) => {
			if (resp.status) {
				setPets(
					resp.data.pets.map(pet => ({
						key: pet.id,
						name: pet.name,
						animalBreedAndFamily: `${pet.animalBreed.breedName} | ${pet.animalBreed.family.name}`,
						owner: `${pet.owner.name} ${pet.owner.lastname}`,
						vaccines: pet.vaccines.map(vcc => vcc.vaccineName).toString()
					} as PetDataType))
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
				title="Mascotas"
				renderButton={
					<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
						Agregar mascota
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<h1>
							Todas las mascotas registradas
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
export default Pets;
