import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../Card";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a4de6c",
  "#d0ed57",
];

type PieChartData = {
  name: string;
  value: number;
};

interface PieChartCardProps {
  title?: string;
  data: PieChartData[];
}

export default function PieChartCard({
  title = "Clases",
  data,
}: PieChartCardProps) {
  return (
    <Card className="w-full max-w-md shadow-md rounded-2xl">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
