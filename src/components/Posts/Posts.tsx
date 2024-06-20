import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { addPost, fetchPosts } from "../../api/posts";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Result,
  Row,
  Spin,
  notification,
} from "antd";
import { PostsTable } from "./PostsTable";

export type TAddPost = {
  title: string;
  body: string;
};

export const Posts: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const showModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const {
    isFetching,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    select: ({ data }) => data,
    retry: 2,
  });

  const { mutate } = useMutation({
    mutationKey: ["posts"],
    mutationFn: (form: TAddPost) => addPost(form),
    onSuccess: ({ data }) => {
      form.resetFields();
      setIsOpen(false);
      api.open({
        message: "Adding Post",
        description: `Title: ${data.title}, postId: ${data.id}`,
        duration: 0,
      });
    },
  });

  const addNewPost = async () => {
    const values = await form.validateFields();
    mutate(values);
  };

  if (error) {
    return <Result status={"error"} title={`${error}`} />;
  }
  return (
    <Card bordered={false}>
      {contextHolder}
      <Spin spinning={isFetching}>
        {posts?.length ? (
          <Row>
            <Col xs={24} md={{ span: 18, offset: 3 }}>
              <Button
                type="primary"
                style={{ marginBottom: 5 }}
                size="large"
                onClick={showModal}
              >
                Add Post
              </Button>
              <Modal
                title="Add post"
                open={isOpen}
                onCancel={closeModal}
                onOk={addNewPost}
              >
                <Form title="Post" form={form} layout="vertical">
                  <Form.Item<TAddPost>
                    label="Title"
                    name="title"
                    required
                    tooltip="This is a required field"
                    rules={[
                      {
                        required: true,
                        message: "Enter a first name",
                      },
                    ]}
                  >
                    <Input placeholder="Title" />
                  </Form.Item>
                  <Form.Item<TAddPost>
                    label="Post"
                    name="body"
                    required
                    tooltip="This is a required field"
                    rules={[
                      {
                        required: true,
                        message: "Enter a first name",
                      },
                    ]}
                  >
                    <Input placeholder="Post" />
                  </Form.Item>
                </Form>
              </Modal>
              <PostsTable posts={posts} />
            </Col>
          </Row>
        ) : null}
      </Spin>
    </Card>
  );
};
