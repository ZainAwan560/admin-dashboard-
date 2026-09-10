import React from "react";
import {
  ArrowUpRight,
  Clock3,
  DollarSign,
  MoreHorizontal,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ordersSeed, revenueData } from "../../data";
import PageHeader from "../../components/PageHeader/PageHeader";
import StatCard from "../../components/StatCard/StatCard";
import ChartCard from "../../components/ChartCard/ChartCard";
import Panel from "../../components/Panel/Panel";
import Table from "../../components/Table/Table";
import CustomerCell from "../../components/CustomerCell/CustomerCell";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import "./Dashboard.css";

export default function Dashboard() {
  const pending = ordersSeed.filter(
    (order) => order.status === "Pending",
  ).length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="A clean overview of your store performance."
      />

      <div className="dashboard__stats">
        <StatCard
          icon={<DollarSign />}
          label="Total Revenue"
          value="$12,845"
          change="+18.4%"
          tone="purple"
        />
        <StatCard
          icon={<ShoppingBag />}
          label="Total Orders"
          value="961"
          change="+12.7%"
          tone="blue"
        />
        <StatCard
          icon={<Clock3 />}
          label="Pending Orders"
          value={pending}
          change="Needs action"
          tone="orange"
        />
        <StatCard
          icon={<Users />}
          label="Signed-in Users"
          value="1,284"
          change="+8.2%"
          tone="green"
        />
      </div>

      <div className="dashboard__charts">
        <ChartCard
          title="Revenue overview"
          subtitle="Monthly sales performance"
          action={
            <Button variant="secondary">
              This year⌄
            </Button>
          }
        >
          <div className="dashboard__chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="rev"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                      stopOpacity=".24"
                    />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f5"
                />
                <XAxis
                  dataKey="name"
                  stroke="#9aa3b5"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9aa3b5"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e1e5ed",
                    borderRadius: 10,
                    color: "#30394c",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Orders"
          subtitle="Monthly order volume"
          action={<MoreHorizontal size={18} color="#8993a5" />}
        >
          <div className="dashboard__mini-number">
            961 <span>orders</span>
          </div>

          <div className="dashboard__mini">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e1e5ed",
                    borderRadius: 10,
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#4b8df8"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Panel className="dashboard__recent">
        <div className="dashboard__recent-head">
          <div>
            <h2>Recent orders</h2>
            <p>Latest customer activity</p>
          </div>

          <Button variant="text">
            <ArrowUpRight size={14} />
            View all
          </Button>
        </div>

        <Table
          headers={[
            "Order ID",
            "Customer",
            "Product",
            "Amount",
            "Date",
            "Status",
          ]}
        >
          {ordersSeed.slice(0, 5).map((order) => (
            <tr key={order.id}>
              <td className="id-cell">{order.id}</td>
              <td>
                <CustomerCell
                  name={order.customer}
                  email={order.email}
                />
              </td>
              <td>{order.product}</td>
              <td className="money">
                ${order.amount.toFixed(2)}
              </td>
              <td>{order.date}</td>
              <td>
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
