import { Button, Space, Table, TableProps, Typography } from "antd";
import { IPost } from "../../api/posts";
import { FC } from "react";
import { Link } from "react-router-dom";

const columns: TableProps<IPost>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "useId",
    dataIndex: "userId",
    key: "id",
    align: "center",
    sorter: (a, b) => a.userId - b.userId,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "id",
  },
  {
    title: "Post",
    dataIndex: "body",
    key: "id",
    render: (value, record) => (
      <Space>
        <Typography.Text>{value}</Typography.Text>
        <Button type="link">
          <Link to={`${record.id}`}>More</Link>
        </Button>
      </Space>
    ),
  },
];

export const PostsTable: FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <Table
      dataSource={posts}
      columns={columns}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15],
        total: posts.length,
        showTotal: (total) => (
          <Typography.Text>Total posts: {total}</Typography.Text>
        ),
      }}
    />
  );
};
