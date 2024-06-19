import { Radio, Space, Table, Typography } from "antd";
import { FC, useState } from "react";
import type { RadioChangeEvent, TableProps } from "antd";
import { ITodo } from "../../api/todos";

const columns: TableProps<ITodo>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "id",
    sorter: (a, b) => a.userId - b.userId, //сортировка эл-ов столбца
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "id",
    render: (text) => <Typography.Text copyable>{text}</Typography.Text>, //ф-ия отображения эл-ов, copyable - копирование текста
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "id",
    filters: [
      //данные окна фильтрации эл-ов
      {
        text: "completed",
        value: true,
      },
      {
        text: "uncompleted",
        value: false,
      },
    ],
    onFilter: (value, record) => record.completed === value, //ф-ия фильтрации
    render: (value, record) => (
      <Space>
        <Typography.Text>{record.completed ? "Yes" : "No"}</Typography.Text>
        <Radio.Group
          value={value}
          onChange={(e: RadioChangeEvent) =>
            (record.completed = e.target.value)
          }
        >
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </Space>
    ),
  },
];

interface ITodoTableProps {
  todos: ITodo[];
  rows?: number;
}

export const TodoTable: FC<ITodoTableProps> = ({ todos, rows = 5 }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //ф-я выбора всех эл-ов стр-цы
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      dataSource={todos}
      columns={columns}
      rowSelection={rowSelection}
      pagination={{
        //настройки пагинации
        pageSize: rows,
        // defaultPageSize: 15, //кол-во эл-ов на странице по-умолчанию
        // showSizeChanger: true,
        // pageSizeOptions: [5, 10, 15], //выбор кол-ва эл-ов на странице
        total: todos.length, //общее кол-во эл-ов
        showTotal: (total) => (
          <Typography.Text>Total todos: {total}</Typography.Text>
        ),
        position: ["bottomCenter"],
      }}
    />
  );
};
