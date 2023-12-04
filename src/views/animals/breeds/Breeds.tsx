//-------------------------------------------------------------------------------------------------- Imports
import { Button } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import StyleSheet from "../../../StyleSheet";
import { useNavigate } from "react-router-dom";



//-------------------------------------------------------------------------------------------------- View
const Breeds = () => {
	const navigate = useNavigate();



	return(
		<DefaultLayout
			title="Razas de animales"
			renderButton={
				<Button style={styles.createNewButton} type="primary" onClick={() => navigate("create-new")}>
					Agregar razas
				</Button>
			}
		>
			<h1>
				Razas
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
export default Breeds;
