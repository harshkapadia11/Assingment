import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import "./Form.css";
import { adduser, Retrievesingleuser, Updateuser } from "../Api/Apicontroller";

function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  let id = location.state.id;
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    Retrievesingleuser(id).then((res) => {
      let initialValues = {};
      res.map((i) => {
        initialValues = {
          firstName: i.firstName,
          lastName: i.lastName,
          email: i.email,
          dob: new Date(i.dob).toISOString().slice(0, 10),
          bio: i.bio,
        };
      });
      setFormValues(initialValues);
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    Updateuser(id, formValues).then((res) => {
      if (res.ok) {
        navigate(-1);
      }
    });
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
          <h1>Edit Form</h1>

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
            placeholder="Username"
            value={formValues.lastName}
            onChange={handleChange}
          />
          <p>{formErrors.lastName}</p>

          <label className="size">Email:-</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
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

          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
