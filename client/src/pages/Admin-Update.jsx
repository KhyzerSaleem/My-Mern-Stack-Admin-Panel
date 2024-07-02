import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Admin-Update.css";
import { toast } from "react-toastify";

export default function AdminUpdate() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  console.log("Params Single User", params);
  const { authorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/${params.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`Single User Data : ${data}`);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/update/${params.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        toast.success("Update Data Successfully");
      } else {
        toast.error("Can't Update Data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Can't Update Data");
    }
  };

  return (
    <div className="update-container">
      <h2>Update User Details</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>
        <button className="update-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
