import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Table, Button, Input, Popconfirm, message, Space, Form, Row, Col } from "antd";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", body: "" });
  const [newPostData, setNewPostData] = useState({ title: "", body: "", userId: "" });
  const baseURL = "https://jsonplaceholder.typicode.com/";

  const getUserData = async () => {
    try {
      let response = await axios.get(baseURL + "posts", {
        params: {
          _limit: 5,
          _start: 55,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (id, title, body) => {
    try {
      await axios.patch(
        baseURL + "posts/" + id,
        { title: title, body: body },
        { headers: { "Content-Type": "application/json" } }
      );
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, title: title, body: body } : post
        )
      );
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(baseURL + "posts/" + id);
      setPosts(posts.filter((post) => post.id !== id));
      message.success("Post deleted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete post.");
    }
  };

  const createNewPost = async () => {
    const { title, body, userId } = newPostData;

    try {
      let response = await axios.post(
        baseURL + "posts",
        { title, body, userId },
        { headers: { "Content-Type": "application/json" } }
      );
      setPosts([response.data, ...posts]);
      message.success("New post created successfully!");
      setNewPostData({ title: "", body: "", userId: "" });
    } catch (error) {
      console.log(error);
      message.error("Failed to create post.");
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditedData({ title: record.title, body: record.body });
  };

  const handleSave = (id) => {
    updateData(id, editedData.title, editedData.body);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) =>
        editingId === record.id ? (
          <Input
            name="title"
            value={editedData.title}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (text, record) =>
        editingId === record.id ? (
          <Input
            name="body"
            value={editedData.body}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {editingId === record.id ? (
            <Button type="primary" onClick={() => handleSave(record.id)}>
              Save
            </Button>
          ) : (
            <Button type="danger" onClick={() => handleEdit(record)} icon={<EditFilled />} />
          )}
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => deleteData(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 8 }} icon={<DeleteFilled />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="home">
        <h2>We're practicing</h2>
        <Row gutter={[16, 16]}>
          <Col sm={12} md={8} lg={6}>
            <Form layout="vertical" style={{ marginBottom: "20px" }}>
              <Form.Item>
                <Input
                  placeholder="Title"
                  name="title"
                  value={newPostData.title}
                  onChange={handleNewPostChange}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col sm={12} md={8} lg={6}>
            <Form.Item>
              <Input
                placeholder="Body"
                name="body"
                value={newPostData.body}
                onChange={handleNewPostChange}
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8} lg={6}>
            <Form.Item>
              <Input
                placeholder="User ID"
                name="userId"
                value={newPostData.userId}
                onChange={handleNewPostChange}
              />
            </Form.Item>
          </Col>
          <Col sm={12} md={8} lg={6}>
            <Form.Item>
              <Button type="primary" onClick={createNewPost} icon={<PlusOutlined />}>
                Add Post
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <div className="table-container">
          <Table
            dataSource={posts}
            columns={columns}
            rowKey="id"
            pagination={{ position: ["none", "none"] }}
            scroll={{ x: '100%' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
