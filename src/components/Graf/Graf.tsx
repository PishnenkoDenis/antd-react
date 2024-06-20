import { FC, useEffect, useState } from "react";
import data from "./data.json";
import { Card, Spin } from "antd";
import { Line } from "@ant-design/charts";

export const Graf: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataGraph, setDataGraph] = useState<typeof data>([]);

  useEffect(() => {
    setTimeout(() => {
      setDataGraph(data);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Card
      title="Antd Chart"
      bordered={false}
      style={{ width: "100%", height: "100%", marginTop: 100 }}
    >
      <Spin spinning={isLoading}>
        <Line
          data={dataGraph}
          xField={"time"}
          yField={"value"}
          smooth
          autoFit={true}
          seriesField={"name"}
          appendPadding={[0, 0, 8]}
          legend={{ position: "bottom" }}
        />
      </Spin>
    </Card>
  );
};
