import React from "react";
import { LayoutDashboard, Package, ShoppingBag, Sparkles, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/products",
    label: "Products",
    icon: Package,
  },
  {
    to: "/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    to: "/customers",
    label: "Customers",
    icon: Users,
  },
];

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="brand">
        <span className="brand__mark">
          <Sparkles size={17} />
        </span>
        <span>BERRY</span>
      </div>

      <div className="sidebar__label">E-COMMERCE</div>

      <nav className="nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav__item ${isActive ? "nav__item--active" : ""}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="online" />
        Admin panel
      </div>
    </aside>
  );
}
