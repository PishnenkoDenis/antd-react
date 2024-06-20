import { Line } from "@ant-design/charts";
import { FC } from "react";

const myData = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 11 },
  { x: 4, y: 9 },
  { x: 5, y: 14 },
  { x: 6, y: 19 },
  { x: 7, y: 17 },
  { x: 8, y: 22 },
  { x: 9, y: 24 },
  { x: 10, y: 23 },
  { x: 11, y: 27 },
  { x: 12, y: 32 },
  { x: 13, y: 30 },
  { x: 14, y: 35 },
  { x: 15, y: 37 },
  { x: 16, y: 40 },
];

export const Chart: FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", marginTop: 100 }}>
      <Line
        data={myData}
        height={700}
        xField="x"
        yField="y"
        colorField={"blue"}
      />
    </div>
  );
};
