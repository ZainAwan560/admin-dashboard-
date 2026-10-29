import React, { useEffect, useMemo, useState } from "react";
import { UserCheck, UserPlus, Users } from "lucide-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import Panel from "../../components/Panel/Panel";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import Table from "../../components/Table/Table";
import CustomerCell from "../../components/CustomerCell/CustomerCell";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import "./Customers.css";
import { API_BASE_URL } from "../../config/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]); // Fake data hata kar empty array laga diya
  const [query, setQuery] = useState("");

  // NAYA: Backend se Orders mangwa kar unse Customers generate karna
  useEffect(() => {
    const fetchCustomersFromOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/orders`);
        const ordersData = await response.json();

        const customerMap = {};

        // Har order ko check karke unique customer ka data banana
        (Array.isArray(ordersData) ? ordersData : []).forEach((order) => {
          const name = order.customerName ? order.customerName.trim() : "Guest Customer";
          const email = order.customerEmail && order.customerEmail !== "customer@example.com"
            ? order.customerEmail
            : `${name.toLowerCase().replace(/\s+/g, '')}@example.com`;

          // Unique key: naam aur email taake har alag banda apna alag record banaye
          const key = name.toLowerCase();

          if (!customerMap[key]) {
            customerMap[key] = {
              id: order._id || key,
              name: name,
              email: email,
              phone: order.phone || "+92 300 1234567",
              country: order.address ? order.address.split(',').pop().trim() : "Pakistan",
              orders: 1,
              spent: order.totalAmount || 0,
              joined: order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB") : "Today",
              status: "Active",
            };
          } else {
            customerMap[key].orders += 1;
            customerMap[key].spent += order.totalAmount || 0;
            if (order.phone) customerMap[key].phone = order.phone;
            if (order.address) customerMap[key].country = order.address.split(',').pop().trim();
          }
        });

        // Object ko wapas Array mein convert karke state mein save karna
        setCustomers(Object.values(customerMap));
      } catch (error) {
        console.error("Customers fetch error:", error);
      }
    };

    fetchCustomersFromOrders();

    // Focus hone par auto-update
    window.addEventListener("focus", fetchCustomersFromOrders);
    return () => window.removeEventListener("focus", fetchCustomersFromOrders);
  }, []);

  const filtered = useMemo(() => {
    const search = query.toLowerCase();

    return customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.country}`
        .toLowerCase()
        .includes(search),
    );
  }, [query, customers]);

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="View customers who signed up and use your store."
      />

      <div className="customers__stats">
        <div>
          <Users />
          <b>{customers.length}</b>
          <span>Total customers</span>
        </div>

        <div>
          <UserCheck />
          <b>{customers.length}</b>
          <span>Active users</span>
        </div>

        <div>
          <UserPlus />
          <b>{customers.length > 0 ? customers.length : 0}</b>
          <span>New this month</span>
        </div>
      </div>

      <Panel>
        <TableToolbar
          placeholder="Search customer..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {customers.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
            No customers found. Wait for orders to arrive.
          </div>
        ) : (
          <Table
            headers={[
              "Customer",
              "Email",
              "Phone",
              "Country",
              "Orders",
              "Total spent",
              "Joined",
              "Status",
            ]}
          >
            {filtered.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <CustomerCell name={customer.name} />
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.country}</td>
                <td>{customer.orders}</td>
                <td className="money">
                  ${customer.spent.toFixed(2)}
                </td>
                <td>{customer.joined}</td>
                <td>
                  <StatusBadge status={customer.status} />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Panel>
    </>
  );
}