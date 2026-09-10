import React, { useMemo, useState } from "react";
import { UserCheck, UserPlus, Users } from "lucide-react";
import { customers } from "../../data";
import PageHeader from "../../components/PageHeader/PageHeader";
import Panel from "../../components/Panel/Panel";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import Table from "../../components/Table/Table";
import CustomerCell from "../../components/CustomerCell/CustomerCell";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import "./Customers.css";

export default function Customers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.toLowerCase();

    return customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.country}`
        .toLowerCase()
        .includes(search),
    );
  }, [query]);

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
          <b>18</b>
          <span>New this month</span>
        </div>
      </div>

      <Panel>
        <TableToolbar
          placeholder="Search customer..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

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
      </Panel>
    </>
  );
}
