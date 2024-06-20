import { FC, useState } from "react";
import { Col, Result, Row, Slider, Spin, Typography } from "antd";
import { ITodo, fetchTodos } from "../../api/todos";
import { TodoTable } from "./TodoTable";
import { useQuery } from "@tanstack/react-query";

export type TAppTodo = Omit<ITodo, "completed"> & {
  completed: string;
};

export const Todo: FC = () => {
  const [rows, setRows] = useState(5);

  const {
    isFetching,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    select: ({ data }) => data,
    retry: 2,
  });
  if (error) {
    return <Result status={"error"} title={`${error}`} />;
  }

  return (
    <>
      {isFetching ? (
        <Spin size="large" fullscreen={true} tip={"Loading"} />
      ) : todos?.length ? (
        <Row>
          <Col xs={24} md={{ span: 12, offset: 6 }}>
            <Typography.Title level={4}>Amount of todos</Typography.Title>
            <Slider min={5} max={15} defaultValue={rows} onChange={setRows} />
            <TodoTable todos={todos} rows={rows} />
          </Col>
        </Row>
      ) : null}
    </>
  );
};
