import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { adduser } from "../Api/Apicontroller";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    bio: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    adduser(formValues)
      .then((res) => {
        if (res.ok) {
          console.log("User inserted");
          navigate("/display");
        }
      })
      .catch((e) => alert("Error", e));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.dob) {
      errors.dob = "DOB is required!";
    }
    if (!values.bio) {
      errors.bio = "bio is required!";
    }

    return errors;
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="register">
          <h1>Login Form</h1>

          <label className="size">First Name:- </label>
          <input
            type="text"
            name="firstName"
            placeholder=""
            value={formValues.firstName}
            onChange={handleChange}
          />
          <p>{formErrors.firstName}</p>
          <label className="size">Last Name:- </label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
          <p>{formErrors.lastName}</p>

          <label className="size">Email:-</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <p>{formErrors.email}</p>
          <label className="size">DOB:- </label>
          <TextField
            id="date"
            onChange={handleChange}
            value={formValues.dob}
            type="date"
            name="dob"
            defaultValue="2022-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p>{formErrors.dob}</p>

          <label className="size">BIO:-</label>
          <br></br>
          <textarea
            type="text"
            rows={3}
            cols={20}
            name="bio"
            onChange={handleChange}
            value={formValues.bio}
          />
          <p>{formErrors.bio}</p>
          <div>
            <button className="btnsubmit">Submit</button>
            <div class="space"></div>

            <button
              className="btn"
              onClick={() => {
                navigate("/display");
              }}
            >
              View All User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
