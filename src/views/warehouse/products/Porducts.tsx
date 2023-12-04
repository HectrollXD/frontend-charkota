//-------------------------------------------------------------------------------------------------- Imports
import { Button } from "antd";
import StyleSheet from "../../../StyleSheet";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";



//-------------------------------------------------------------------------------------------------- View
const Porducts = () => {
	const navigate = useNavigate();



	return (
		<DefaultLayout
			title="Productos"
			renderButton={
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar nuevo producto
				</Button>
			}
		>
			Tabla
		</DefaultLayout>
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
