//-------------------------------------------------------------------------------------------------- Imports
import { Button } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";



//-------------------------------------------------------------------------------------------------- View
const Providers = () => {
	const navigate = useNavigate();



	return(
		<DefaultLayout
			title="Proveedores"
			renderButton={
				<Button style={{backgroundColor: "#12b754"}} type="primary" onClick={() => navigate("create-new")}>
					Agregar nuevo porveedor
				</Button>
			}
		>
			Proveedores
		</DefaultLayout>
	);
};



//-------------------------------------------------------------------------------------------------- Exports
export default Providers;
