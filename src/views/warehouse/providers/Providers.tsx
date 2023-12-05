//-------------------------------------------------------------------------------------------------- Imports
import { Button, Table, notification } from "antd";
import DefaultLayout from "../../../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { getAllProviders } from "../../../methdos/methdos";

//-------------------------------------------------------------------------------------------------- Interfaces and types
type NotificationType = "success" | "info" | "warning" | "error";
interface DataType {
  title: string
  dataIndex: string
  key: string
}

//-------------------------------------------------------------------------------------------------- View
const Providers = () => {
  const navigate = useNavigate();
  const [provedores, set_Provedores] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const columns: DataType[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "RFC",
      dataIndex: "rfc",
      key: "rfc",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const openNotification = useCallback(
    (type: NotificationType, title: string, message: string) => {
      api[type]({
        type: type,
        message: title,
        description: message,
        duration: 5,
      });
    },
    [api]
  );

  useEffect(() => {
    getAllProviders()
      .then((resp) => {
        if (resp.status) {
          set_Provedores(resp.data.providers as any );
        } else {
          openNotification(
            "error",
            "Error al obtener la lista de proveedores",
            resp.message
          );
        }
      })
      .catch(() => {
        openNotification(
          "error",
          "Error al obtener la lista de proveedores",
          `Ocurrió un error al momento de obtener la lista de los proveedores.
				Intente de nuevo más tarde.`
        );
      });
  }, [openNotification]);

  return (
    <React.Fragment>
      {contextHolder}
      <DefaultLayout
        title="Proveedores"
        renderButton={
          <Button
            style={{ backgroundColor: "#12b754" }}
            type="primary"
            onClick={() => navigate("create-new")}
          >
            Agregar nuevo porveedor
          </Button>
        }
      >
        Proveedores
        <Table columns={columns} dataSource={provedores} />
      </DefaultLayout>
    </React.Fragment>
  );
};

//-------------------------------------------------------------------------------------------------- Exports
export default Providers;
