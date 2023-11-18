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
  const [updateOpen, setUpdateOpen] = useState(false);
  const [detailPromotion, setDetailPromotion] = useState({});

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

  const handleOpenUpdate = (promotion_id) => {
    axios.get(`/promotion/get-promotion/${promotion_id}`).then((res) => {
      setDetailPromotion(res.data);
    });
    setUpdateOpen(true);
  };

  const handleUpdate = () => {
    axios
      .post(`/promotion/update-promotion/${detailPromotion.promotion_id}`, {
        promotion_code: detailPromotion.promotion_code,
        discount: detailPromotion.discount,
        start_date: detailPromotion.start_date.slice(0, 10),
        end_date: detailPromotion.end_date.slice(0, 10),
      })
      .then((res) => {
        alert(" update success");
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
            render: (date) => {
              return <>{date.slice(0, 10)}</>;
            },
          },
          {
            title: "End Date",
            dataIndex: "end_date",
            render: (date) => {
              return <>{date.slice(0, 10)}</>;
            },
          },
          {
            title: "Action",
            dataIndex: "promotion_id",
            key: "x",
            render: (promotion_id) => (
              <>
                <button onClick={() => handleRemove(promotion_id)}>
                  Delete
                </button>
                <button onClick={() => handleOpenUpdate(promotion_id)}>
                  Update
                </button>
              </>
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
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="End Date" name="end_date">
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={hanleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="Update Promotion"
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
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
          <div>
            <label>Promotion Code:</label>
            <input
              type="text"
              className="input"
              value={detailPromotion?.promotion_code}
              onChange={(e) =>
                setDetailPromotion({
                  ...detailPromotion,
                  promotion_code: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Discount:</label>
            <input
              type="text"
              className="input"
              value={detailPromotion?.discount}
              onChange={(e) =>
                setDetailPromotion({
                  ...detailPromotion,
                  discount: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Start Date:</label>
            <input
              type="date"
              className="input"
              value={detailPromotion?.start_date?.slice(0, 10)}
              onChange={(e) =>
                setDetailPromotion({
                  ...detailPromotion,
                  start_date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>End Date:</label>
            <input
              type="date"
              className="input"
              value={detailPromotion?.end_date?.slice(0, 10)}
              onChange={(e) =>
                setDetailPromotion({
                  ...detailPromotion,
                  end_date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <button
              className="button"
              onClick={() => handleUpdate(detailPromotion?.promotion_id)}
            >
              Update
            </button>
          </div>
        </Form>
      </Drawer>
    </Space>
  );
}
export default Promotions;
