import {
  Avatar,
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

import axios from "axios";

function Promotions() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [promotion_code, setPromotion_code] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log(typeof startDate);
  const hanleSubmit = () => {
    axios
      .post("/promotion/create-promotion", {
        promotion_code,
        discount,
        start_date: startDate,
        end_date: endDate,
      })
      .then((res) => {
        alert(" create success");
        window.location.reload();
      });
  };

  const handleRemove = (promotion_id) => {
    axios.delete(`/promotion/delete-promotion/${promotion_id}`).then((res) => {
      alert(" remove success");
      window.location.reload();
    });
  };
  useEffect(() => {
    setLoading(true);
    axios.get("/promotion/get-promotions").then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Promotions</Typography.Title>
      <Space>
        <Button
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Create New Promotion
        </Button>
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Promotion Code",
            dataIndex: "promotion_code",
          },
          {
            title: "Discount",
            dataIndex: "discount",
          },
          {
            title: "Start Date",
            dataIndex: "start_date",
          },
          {
            title: "End Date",
            dataIndex: "end_date",
          },
          {
            title: "Action",
            dataIndex: "promotion_id",
            key: "x",
            render: (promotion_id) => (
              <button onClick={() => handleRemove(promotion_id)}>Delete</button>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Drawer
        title="Create New Promotion"
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
        maskClosable
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        >
          <Form.Item label="Promotion Code" name="promotion_code">
            <Input onChange={(e) => setPromotion_code(e.target.value)} />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <Input onChange={(e) => setDiscount(e.target.value)} />
          </Form.Item>

          <Form.Item label="Start Date" name="start_date">
            <DatePicker
              onChange={(date, dateString) => {
                setStartDate(dateString);
              }}
            />
          </Form.Item>

          <Form.Item label="End Date" name="end_date">
            <DatePicker
              onChange={(date, dateString) => {
                setEndDate(dateString);
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={hanleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
}
export default Promotions;
