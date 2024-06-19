import { useQuery } from "@tanstack/react-query";
import { Avatar, Breadcrumb, Card, FloatButton, Result, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { FC } from "react";
import { fetchPost } from "../../api/posts";
import { useNavigate, useParams } from "react-router-dom";
import { PictureOutlined, BackwardOutlined } from "@ant-design/icons";

export const PostCard: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isFetching, error, data } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPost(Number(id)),
    select: ({ data }) => data,
    retry: 3,
  });

  if (error) {
    return <Result title={`${error}`} status={"error"} />;
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Posts",
            onClick: () => navigate("/posts"),
          },
          {
            title: `Post-${id}`,
          },
        ]}
      />
      <Card
        style={{
          width: 700,
          marginTop: 100,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Skeleton loading={isFetching} active avatar paragraph={{ rows: 4 }}>
          <Meta
            avatar={<Avatar icon={<PictureOutlined />} size={"large"} />}
            title={data?.title}
            description={data?.body}
          />
        </Skeleton>
      </Card>
      <FloatButton
        icon={<BackwardOutlined />}
        onClick={() => navigate("/posts")}
        style={{ left: 20, width: 70, height: 70 }}
      />
    </>
  );
};
