import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import axios from "axios";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleRemove = (user_id) => {
    axios.delete(`/auth/delete-user/${user_id}`).then((res) => {
      alert(" remove success");
      window.location.reload();
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get("/auth/get-all-users").then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User Name",
            dataIndex: "username",
          },
          {
            title: "Full Name",
            dataIndex: "full_name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },

          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Action",
            dataIndex: "user_id",
            key: "x",
            render: (user_id) => (
              <Button
                type="primary"
                danger
                ghost
                onClick={() => handleRemove(user_id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Users;
