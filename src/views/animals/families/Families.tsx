//-------------------------------------------------------------------------------------------------- Imports
import { Button } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import StyleSheet from "../../../StyleSheet";



//-------------------------------------------------------------------------------------------------- View
const Families = () => {
	const navigate = useNavigate();



	return(
		<DefaultLayout
			title="Familias de animales"
			renderButton={
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar familias
				</Button>
			}
		>
			<h1>
				Familias
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
export default Families;
