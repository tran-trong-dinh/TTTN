import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/order/get-all-order").then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Order Id",
            dataIndex: "order_id",
          },

          {
            title: "Full Name",
            dataIndex: "full_name",
          },
          {
            title: "Address",
            dataIndex: "address_order",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Product Image",
            dataIndex: "image_url",
            render: (image_url) => {
              return <Avatar src={image_url} />;
            },
          },
          {
            title: "Product Name",
            dataIndex: "product_name",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "New Price",
            dataIndex: "new_price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Total Price Of Order",
            dataIndex: "total_price",
            render: (value) => <span>${value}</span>,
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
export default Orders;
