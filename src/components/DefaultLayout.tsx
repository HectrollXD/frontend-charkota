//-------------------------------------------------------------------------------------------------- Imports
import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { CSSProperties, ReactNode } from "react";
import StyleSheet from "../StyleSheet";
import { HomeOutlined } from "@ant-design/icons";



//-------------------------------------------------------------------------------------------------- Interfaces
interface DefaultLayoutProsp {
	children: ReactNode;
};



//-------------------------------------------------------------------------------------------------- Component
const DefaultLayout = (props: DefaultLayoutProsp) => {
	const { children } = props;
	type MenuItem = Required<MenuProps>['items'][number];



	const getItem = (
		label: React.ReactNode, key: React.Key, icon?: React.ReactNode,
		children?: MenuItem[], style?: CSSProperties, theme?: "light" | "dark"
	): MenuItem => {
		return { key, icon, children, label, style, theme } as MenuItem;
	};



	const items: MenuItem[] = [
		getItem("Inicio", 0, <HomeOutlined />),
		getItem("Almacén", 1, null, [
			getItem("Productos", 2, undefined, undefined, {backgroundColor: "#ff00ff"}),
			getItem("Proveedores", 3),	
		], undefined, "dark"),
		getItem("Animales", 4, null, [
			getItem("Familias", 5),
			getItem("Razas", 6),
		]),
		getItem("Dueños y mascotas", 7, null, [
			getItem("Dueños", 8),	
			getItem("Mascotas", 9),
		]),
		getItem("Citas", 10),
		getItem("Ventas", 11),
	];



	return (
		<Layout style={styles.mainLayout}>
			<Header style={styles.headerStyles}>

			</Header>
			<Layout>
				<Sider style={styles.siderStyles}>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["0"]}
						items={items}
						style={styles.menuStyles}
					/>
				</Sider>
				<Content style={styles.contenContainer}>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};



//-------------------------------------------------------------------------------------------------- Styles
const styles = StyleSheet.create({
	mainLayout: {
		height: "100vh",
	},
	headerStyles: {
		backgroundColor: "#00687e",
	},
	siderStyles: {
		backgroundColor: "#00afd6",
	},
	menuStyles:{
		fontWeight: "bold",
		color: "#ffffff",
		backgroundColor: "transparent",
	},
	contenContainer: {
		backgroundColor: "#e5e5e5",
		height: "100%",
	},
});



//-------------------------------------------------------------------------------------------------- Exports
export default DefaultLayout;
