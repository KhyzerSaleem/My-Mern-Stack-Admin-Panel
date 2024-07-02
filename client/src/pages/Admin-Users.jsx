import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./Admin-Users.css";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/users/", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log(`users: ${data}`);
    } catch (error) {
      console.error(error);
    }
  };

  //Delete User from delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`Users After Delete:  ${data}`);

      if (response.ok) {
        alert("User Deleted Successfully");
        getAllUsersData();
      }
    } catch (error) {
      console.error(`Server Error! Deleting Users ${error}`);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div className="admin-users-container">
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((currUser, index) => {
              return (
                <tr key={index}>
                  <td>{currUser.username}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phone}</td>
                  <td>
                    <Link to={`/admin/users/${currUser._id}`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(currUser._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
