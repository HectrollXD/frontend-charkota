//-------------------------------------------------------------------------------------------------- Imports
import { Card, Col, Layout, Menu, MenuProps, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { CSSProperties, ReactElement, ReactNode, useState } from "react";
import StyleSheet from "../StyleSheet";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../stores/slices/userDataSlice";



//-------------------------------------------------------------------------------------------------- Interfaces and types
interface DefaultLayoutProsp {
	children: ReactNode;
	title: string;
	renderButton?: ReactElement;
};

type MenuItem = Required<MenuProps>['items'][number];



//-------------------------------------------------------------------------------------------------- Functions
const getItem = (
	label: React.ReactNode, key: React.Key, icon?: React.ReactNode,
	children?: MenuItem[], style?: CSSProperties, theme?: "light" | "dark"
): MenuItem => {
	return { key, icon, children, label, style, theme } as MenuItem;
};



//-------------------------------------------------------------------------------------------------- Component
const DefaultLayout = (props: DefaultLayoutProsp) => {
	const { children, title, renderButton } = props;
	const userData = useSelector(getUserData);
	// Control
	const [current, setCurrent] = useState("/");
	const navigate = useNavigate();
	const items: MenuItem[] = [
		getItem("Inicio", "/", <HomeOutlined />),
		getItem("Almacén", "sub1", null, [
			getItem("Productos", "/warehouse/products"),
			getItem("Proveedores", "/warehouse/providers"),
		], undefined, "dark"),
		getItem("Animales", "sub2", null, [
			getItem("Familias", "/animals/families"),
			getItem("Razas", "/animals/breeds"),
		]),
		getItem("Dueños y mascotas", "sub3", null, [
			getItem("Dueños", "/patients/pets/owners"),
			getItem("Mascotas", "/patients/pets"),
		]),
		getItem("Citas", "/dates"),
		getItem("Ventas", "/sells"),
	];



	const handleClick: MenuProps["onClick"] = (e) => {
		setCurrent(e.key);
		navigate(e.key);
	};



	return (
		<Layout style={styles.mainLayout}>
			<Header style={styles.headerStyles}>
				<Row>
					<Col span={2} style={styles.imageContainer}>
						<img style={styles.logoImage} src={process.env.PUBLIC_URL + "/pata.png"} alt="Logo pata" />
					</Col>
					<Col span={10} style={styles.nameAppContainer}>
						<h1 style={{ color: "#ffffff" }}>Char [KOTA]</h1>
					</Col>
					<Col span={10} style={styles.alignFlexEnd}>
						<h2 style={{ color: "#ffffff" }}>{`${userData.username} | ${userData.userType}`}</h2>
					</Col>
					<Col span={2} style={styles.imageContainer}>
						<UserOutlined style={styles.iconStyle} />
					</Col>
				</Row>
			</Header>
			<Layout>
				<Sider style={styles.siderStyles}>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["/"]}
						defaultOpenKeys={["sub1", "sub2", "sub3"]}
						selectedKeys={[current]}
						items={items}
						style={styles.menuStyles}
						onClick={handleClick}
					/>
				</Sider>
				<Content style={styles.contenContainer}>
					<Row style={styles.mainContainer}>
						<Col span={24} style={styles.colContainer}>
							<Card style={styles.cardStyle}>
								<Row>
									<Col span={20}>
										<h2>{title}</h2>
									</Col>
									<Col span={4} style={styles.alignFlexEnd}>
										{(renderButton) && (
											renderButton
										)}
									</Col>
								</Row>
							</Card>
						</Col>
						<Col span={24}>
							<Card style={styles.cardStyle}>
								{children}
							</Card>
						</Col>
					</Row>
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
		padding: 0,
		backgroundColor: "#00687e",
	},
	imageContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	iconStyle: {
		fontSize: 30,
		color: "#ffffff",
	},
	nameAppContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	alignFlexEnd: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	logoImage: {
		width: 50,
	},
	siderStyles: {
		backgroundColor: "#00afd6",
	},
	menuStyles: {
		fontWeight: "bold",
		color: "#ffffff",
		backgroundColor: "transparent",
	},
	contenContainer: {
		backgroundColor: "#e5e5e5",
		height: "100%",
	},
	mainContainer: {
		padding: 50,
	},
	colContainer: {
		marginBottom: 50,
	},
	cardStyle: {
		boxShadow: "-5px 5px 5px #7f7f7f"
	}
});



//-------------------------------------------------------------------------------------------------- Exports
export default DefaultLayout;
