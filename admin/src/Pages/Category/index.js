import {
  Avatar,
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Space,
  Table,
  Typography,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import axios from "axios";

function Category() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [imageAsset, setImageAsset] = useState("");

  const handleUpload = (e) => {
    const files = e.target.files;
    const data = new FormData();
    // Append only the first file to the FormData object
    data.append("photo", files[0]);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const filename = res.data.secure_url;

        setImageAsset(filename);
      });
      console.log(imageAsset)
  };

  const handleSubmit = () => {
    axios
      .post("/category/create-category", {
        category_name: categoryName,
        img_category: imageAsset,
      })
      .then((res) => {
        alert("create success");
        window.location.reload();
      });
  };
  const handleRemove = (category_id) => {
    axios.delete(`/category/delete-category/${category_id}`).then((res) => {
      alert(" remove success");
      window.location.reload();
    });
  };
  useEffect(() => {
    setLoading(true);
    axios.get("/category/get-categories").then((res) => {
      setDataSource(res.data);
     
      setLoading(false);
    });
  }, []);

  console.log(dataSource)

  return (
    <Space size={40} direction="vertical">
      <Typography.Title level={4}>Category</Typography.Title>
      <Space>
        <Button
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Create New Category
        </Button>
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Image",
            dataIndex: "img_category",
            render: (image_url) => {
              return <Avatar src={image_url} />;
            },
          },
          {
            title: "Category Name",
            dataIndex: "category_name",
          },
          {
            title: "Total Products",
            dataIndex: "total_products",
          },
          {
            title: "Action",
            dataIndex: "category_id",
            key: "x",
            render: (category_id) => (
              <button onClick={() => handleRemove(category_id)}>Delete</button>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Drawer
        title="Create Category"
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
          <Form.Item label="Category Name" name="category_name">
            <Input onChange={(e) => setCategoryName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Category Image" name="img_category">
            {imageAsset && <Image width={200} src={imageAsset} />}

            <div>
              <input type="file" onChange={handleUpload} />
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
}
export default Category;
