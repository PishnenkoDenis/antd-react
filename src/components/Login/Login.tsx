import { Button, Checkbox, Form, Input, Typography, notification } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { FC, useState } from "react";

export type TField = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  remember: boolean;
};

const { Title, Text } = Typography;

export const Login: FC = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmissions = (result: TField) => {
    if (!result) {
      api.open({
        message: "Something went wrong",
        description: "Please try again!",
        duration: 0,
      });
    } else {
      form.resetFields();
      api.open({
        message: "You successfuly login",
        description: `${result.firstName} ${result.lastName}`,
        duration: 0,
      });
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      setIsLoading(false);
      handleSubmissions(values);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Login Page
      </Title>
      <Text
        type="secondary"
        style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        You need to authorize
      </Text>
      <Form
        name="login-form"
        layout="vertical"
        form={form}
        wrapperCol={{ span: 6 }}
        style={{
          marginTop: 20,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Form.Item<TField>
          label="First Name"
          name="firstName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Enter a first name",
            },
          ]}
        >
          <Input
            placeholder="First Name"
            prefix={<UserOutlined style={{ color: "lightgrey" }} />}
          />
        </Form.Item>
        <Form.Item<TField>
          label="Last Name"
          name="lastName"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Enter a last name",
            },
          ]}
        >
          <Input
            placeholder="Last Name"
            prefix={<UserOutlined style={{ color: "lightgrey" }} />}
          />
        </Form.Item>
        <Form.Item<TField>
          label="email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Enter your email",
            },
            {
              type: "email",
              message: "Enter a correct email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<MailOutlined style={{ color: "lightgrey" }} />}
          />
        </Form.Item>
        <Form.Item<TField>
          label="password"
          name="password"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Enter password",
            },
            {
              min: 4,
              message: "Password should be more than 4 characters",
            },
            {
              max: 20,
              message: "Password should be less than 20 characters ",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined style={{ color: "lightgrey" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item<TField> name="remember" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            style={{ marginLeft: 235 }}
            onClick={onSubmit}
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
