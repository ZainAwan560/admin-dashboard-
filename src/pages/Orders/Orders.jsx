import React, { useMemo, useState } from "react";
import {
  CheckCircle,
  Clock3,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { ordersSeed } from "../../data";
import PageHeader from "../../components/PageHeader/PageHeader";
import Panel from "../../components/Panel/Panel";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import Table from "../../components/Table/Table";
import CustomerCell from "../../components/CustomerCell/CustomerCell";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState(ordersSeed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const update = (id, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    );
  };

  const filtered = useMemo(() => {
    const search = query.toLowerCase();

    return orders.filter((order) => {
      const matchesSearch = `${order.id} ${order.customer} ${order.email} ${order.product}`
        .toLowerCase()
        .includes(search);

      const matchesFilter =
        filter === "All" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, query, filter]);

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Track orders, payments and shipment status."
      />

      <div className="orders__stats">
        <div>
          <ShoppingBag />
          <b>{orders.length}</b>
          <span>Total orders</span>
        </div>

        <div>
          <Clock3 />
          <b>
            {orders.filter((order) => order.status === "Pending").length}
          </b>
          <span>Pending</span>
        </div>

        <div>
          <Truck />
          <b>
            {orders.filter((order) => order.status === "Dispatched").length}
          </b>
          <span>Dispatched</span>
        </div>

        <div>
          <CheckCircle />
          <b>
            {orders.filter((order) => order.status === "Delivered").length}
          </b>
          <span>Delivered</span>
        </div>
      </div>

      <Panel>
        <TableToolbar
          placeholder="Search order, customer or product..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        >
          <select
            className="orders__filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Dispatched</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </TableToolbar>

        <Table
          headers={[
            "ID",
            "Customer",
            "Product",
            "Qty",
            "Total amount",
            "Payment",
            "Date",
            "Status",
          ]}
        >
          {filtered.map((order) => (
            <tr key={order.id}>
              <td className="id-cell">{order.id}</td>
              <td>
                <CustomerCell
                  name={order.customer}
                  email={order.email}
                />
              </td>
              <td>{order.product}</td>
              <td>{order.qty}</td>
              <td className="money">
                ${order.amount.toFixed(2)}
              </td>
              <td>{order.payment}</td>
              <td>{order.date}</td>
              <td>
                <StatusSelect
                  value={order.status}
                  onChange={(status) => update(order.id, status)}
                />
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
