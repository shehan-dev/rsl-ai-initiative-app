"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#1e88e5", "#43a047", "#ffb300", "#ef5350", "#7e57c2"];

type MonthlyPoint = {
  month: string;
  spend: number;
};

type IncomeExpensePoint = {
  name: string;
  value: number;
};

type CategoryPoint = {
  name: string;
  value: number;
};

export function MonthlyTrendChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dde7f2" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="spend" stroke="#1e88e5" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryDonutChart({ data }: { data: CategoryPoint[] }) {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={84} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IncomeExpenseChart({ data }: { data: IncomeExpensePoint[] }) {
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dde7f2" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.name === "Income" ? "#43a047" : "#ef5350"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
