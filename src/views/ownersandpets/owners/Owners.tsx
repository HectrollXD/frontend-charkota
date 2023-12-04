//-------------------------------------------------------------------------------------------------- Imports
import { Button } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import StyleSheet from "../../../StyleSheet";



//-------------------------------------------------------------------------------------------------- View
const Owners = () => {
	const navigate = useNavigate();



	return (
		<DefaultLayout
			title="Propietarios de mascotas"
			renderButton={
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar dueños
				</Button>
			}
		>
			<h1>
				Propietarios
			</h1>
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
export default Owners;
