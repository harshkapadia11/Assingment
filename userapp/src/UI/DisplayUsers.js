import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../Api/Apicontroller";
import "./Dissplay.css";
import { useNavigate } from "react-router-dom";
const DisplayUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setData(res);
    });
  }, []);
  console.log(data);

  const handleEdit = (id) => {
    navigate("/edit", { state: { id: id } });
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(dob) {
    let date = new Date(dob);
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  const DeleteUser = (id) => {
    if (window.confirm("Confirm to delete!") === true) {
      window.location.reload(false);
      deleteUser(id).catch((e) => {
        alert(`error:${e}`);
      });
    }
  };

  return (
    <>
      <table borer={1}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>BIO</th>
            <th>Actions</th>
          </tr>
          {data?.map((user) => {
            let date = formatDate(user.dob);
            return (
              <tr key={user._id}>
                <th>{user.firstName}</th>
                <th>{user.lastName}</th>
                <th>{user.email}</th>
                <th>{date}</th>
                <th>{user.bio}</th>
                <th>
                  <button
                    className="button"
                    onClick={() => DeleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <br />
                  <button
                    className="button"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                </th>
              </tr>
            );
          })}
        </thead>
      </table>
    </>
  );
};
export default DisplayUser;
