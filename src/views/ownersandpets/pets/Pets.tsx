//-------------------------------------------------------------------------------------------------- Imports

import { Button } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import StyleSheet from "../../../StyleSheet";
import { useNavigate } from "react-router-dom";

//-------------------------------------------------------------------------------------------------- View
const Pets = () => {
	const navigate = useNavigate();



	return(
		<DefaultLayout
			title="Mascotas"
			renderButton={
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar mascotas
				</Button>
			}
		>
			<h1>
				Mascotas
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
export default Pets;
