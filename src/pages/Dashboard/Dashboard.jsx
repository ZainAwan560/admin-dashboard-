import React, { useEffect, useState } from "react";
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
import { revenueData } from "../../data"; // Graph ke liye dummy data wahi rakha hai
import PageHeader from "../../components/PageHeader/PageHeader";
import StatCard from "../../components/StatCard/StatCard";
import ChartCard from "../../components/ChartCard/ChartCard";
import Panel from "../../components/Panel/Panel";
import Table from "../../components/Table/Table";
import CustomerCell from "../../components/CustomerCell/CustomerCell";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import { API_BASE_URL } from "../../config/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
  });

  // NAYA: Real Database se data fetch aur calculate karne ka logic
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders`);
        const data = await response.json();

        let revenue = 0;
        let pending = 0;
        const uniqueCustomers = new Set();

        const formattedOrders = data.map((order) => {
          // Stats calculation
          revenue += order.totalAmount || 0;
          if (order.status === "Pending") pending += 1;
          
          const customerKey = (order.customerName ? order.customerName.trim() : "Guest").toLowerCase();
          uniqueCustomers.add(customerKey);

          // Table ke liye product format karna
          const currentItems = order.items || [];
          const productNames = currentItems.length > 0 
            ? currentItems.map(item => item.name).join(", ") 
            : "No items listed"; 
          
          const orderDate = order.createdAt || order.date;

          return {
            id: order._id.slice(-6).toUpperCase(),
            customer: order.customerName || "Guest",
            email: email,
            product: productNames,
            amount: order.totalAmount || 0,
            date: orderDate ? new Date(orderDate).toLocaleDateString("en-GB") : "N/A",
            status: order.status || "Pending",
          };
        });

        // Hamesha naye orders oopar ayenge
        setOrders(formattedOrders);
        
        // Final numbers ko update karna
        setStats({
          totalRevenue: revenue,
          totalOrders: data.length,
          pendingOrders: pending,
          totalCustomers: uniqueCustomers.size,
        });

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();

    window.addEventListener("focus", fetchDashboardData);
    return () => window.removeEventListener("focus", fetchDashboardData);
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="A clean overview of your store performance."
      />

      {/* 1. REAL STAT CARDS */}
      <div className="dashboard__stats">
        <StatCard
          icon={<DollarSign />}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="Updated live"
          tone="purple"
        />
        <StatCard
          icon={<ShoppingBag />}
          label="Total Orders"
          value={stats.totalOrders}
          change="Updated live"
          tone="blue"
        />
        <StatCard
          icon={<Clock3 />}
          label="Pending Orders"
          value={stats.pendingOrders}
          change="Needs action"
          tone="orange"
        />
        <StatCard
          icon={<Users />}
          label="Customers"
          value={stats.totalCustomers}
          change="Unique buyers"
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
            {stats.totalOrders} <span>orders</span>
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

      {/* 2. REAL RECENT ORDERS TABLE */}
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

        {orders.length === 0 ? (
           <div style={{ padding: "30px", textAlign: "center", color: "#666" }}>
             No orders placed yet.
           </div>
        ) : (
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
            {/* Sirf naye/latest 5 orders show karega */}
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id}>
                <td className="id-cell">#{order.id}</td>
                <td>
                  <CustomerCell
                    name={order.customer}
                    email={order.email}
                  />
                </td>
                <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {order.product}
                </td>
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
        )}
      </Panel>
    </>
  );
}