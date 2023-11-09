import {
  Avatar,
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Rate,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

import axios from "axios";
import TextArea from "antd/es/input/TextArea";

function Products() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [imageAsset, setImageAsset] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState(0);
  const [promotionId, setPromotionId] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateOldPrice, setUpdateOldPrice] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateImageUrl, setUpdateImageUrl] = useState("");
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
  };

  const handleSubmit = () => {
    console.log(typeof stock);
    axios
      .post("/product/create-product", {
        product_name: productName,
        image_url: imageAsset,
        old_price: price,
        description: description,
        stock: Number(stock),
        category_id: categoryId,
        promotion_id: promotionId,
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      });
  };
  const handleRemove = (product_id) => {
    axios.delete(`/product/delete-product/${product_id}`).then((res) => {
      alert("remove success");
      window.location.reload();
    });
  };

  const handleOpenUpdate = (product_id) => {
    setUpdateOpen(true);
    axios.get(`/product/get-detail-product/${product_id}`).then((res) => {
      setProduct(res.data);
    });
  };

  const handleUpdate = (product_id) => {
    axios
      .post(`/product/update-product/${product_id}`, {
        product_name: updateProductName,
        old_price: updateOldPrice,
        description: updateDescription,
        image_url: updateImageUrl,
      })
      .then((res) => {
        alert("update success");
        window.location.reload();
      });
  };
  useEffect(() => {
    setLoading(true);
    axios.get("/product/get-products").then((res) => {
      console.log(res);
      setDataSource(res.data);

      setLoading(false);
    });

    axios.get("/category/get-categories").then((res) => {
      setCategories(res.data);
    });

    axios.get("/promotion/get-promotions").then((res) => {
      setPromotions(res.data);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Products</Typography.Title>
      <Space>
        <Button
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          Create New Product
        </Button>
      </Space>
      <Table
        loading={loading}
        size="large"
        tableLayout="fixed"
        columns={[
          {
            title: "Image",
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
            title: "Old Price",
            dataIndex: "old_price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "New Price",
            dataIndex: "old_price",
            render: (value) => <span>${value}</span>,
          },

          {
            title: "Category",
            dataIndex: "category_name",
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },

          {
            title: "Promotion",
            dataIndex: "promotion_code",
          },
          {
            title: "Rating",
            dataIndex: "average_rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Action",
            dataIndex: "product_id",
            key: "x",
            render: (product_id) => (
              <>
                <button onClick={() => handleRemove(product_id)}>Delete</button>
                <button onClick={() => handleOpenUpdate(product_id)}>
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
        size="large"
        title="Create Product"
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
          <Form.Item label="Product Name" name="product_name">
            <Input onChange={(e) => setProductName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Product Image" name="image_url">
            {imageAsset && <Image width={200} src={imageAsset} />}

            <div>
              <input type="file" onChange={handleUpload} />
            </div>
          </Form.Item>

          <Form.Item label="Price" name="old_price">
            <Input onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Stock" name="stock">
            <Input onChange={(e) => setStock(e.target.value)} />
          </Form.Item>

          <Form.Item label="Category" name="category_id">
            <Select onChange={(e) => setCategoryId(e)}>
              {categories.map((category) => (
                <Select.Option
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.category_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Promotion" name="promotion_id">
            <Select onChange={(e) => setPromotionId(e)} defaultValue={null}>
              {promotions.map((promotion) => (
                <Select.Option
                  key={promotion.promotion_id}
                  value={promotion.promotion_id}
                >
                  {promotion.promotion_code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        size="large"
        title="Update Product"
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
        }}
        maskClosable
      >
        <div>
          <input
            type="text"
            value={product.product_name}
            onChange={(e) => setUpdateProductName(e.target.value)}
          />
          <input
            type="text"
            value={product.old_price}
            onChange={(e) => setUpdateOldPrice(e.target.value)}
          />
          <input
            type="text"
            value={product.description}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
          <input
            type="text"
            value={product.image_url}
            onChange={(e) => setUpdateImageUrl(e.target.value)}
          />

          <button onClick={() => handleUpdate(product.product_id)}>
            Update
          </button>
        </div>
      </Drawer>
    </Space>
  );
}
export default Products;
