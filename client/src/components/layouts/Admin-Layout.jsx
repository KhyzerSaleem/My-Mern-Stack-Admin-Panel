import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { FaUser, FaServicestack, FaHome } from "react-icons/fa";
import "./Admin-Layout.css";
import { useAuth } from "../../store/auth";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();
  console.log("Admin Layout", user);
  if (isLoading) {
    return <h1>Loading ... </h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header>
        <div className="admin-nav">
          <nav>
            <ul>
              <h1>Admin Panel</h1>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/services">
                  <FaServicestack /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
    </>
  );
}
