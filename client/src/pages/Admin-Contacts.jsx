import React, { useEffect, useReducer } from "react";
import { useAuth } from "../store/auth";
import "./Admin-Contacts.css";
import { toast } from "react-toastify";
const initialState = {
  loading: true,
  contacts: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        contacts: [],
        error: "No Contacts Found",
      };
    default:
      return state;
  }
};

export default function AdminContacts() {
  const { authorizationToken } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getContactsData = async (req, res) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Contacts Data : ", data);
      if (response.ok) {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        // console.log(response);
      } else {
        dispatch({ type: "FETCH_ERROR" });
      }
    } catch (error) {
      // console.log(error);
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // const data = await response.json();
      // console.log(`Contacts After Delete:  ${data}`);
      if (response.ok) {
        getContactsData();
        dispatch({ type: "DELETE_SUCCESS", payload: id });
        toast.success("Contact Deleted Successfully");
      } else {
        toast.error("Can't Delete User");
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <div className="admin-contacts-container">
        <h1 className="admin-contacts-title">Contacts Management</h1>
        {state.loading ? (
          <p className="admin-contacts-loading">Loading...</p>
        ) : state.error ? (
          <p className="admin-contacts-error">{state.error}</p>
        ) : (
          <ul className="admin-contacts-list">
            {state.contacts.map((contact, index) => {
              const { username, email, message, _id } = contact;
              return (
                <li key={index} className="admin-contact-item">
                  <span className="contact-username">{username}</span>
                  <span className="contact-email">{email}</span>
                  <span className="contact-message">{message}</span>
                  <button
                    className="btn"
                    onClick={() => deleteContactById(_id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
