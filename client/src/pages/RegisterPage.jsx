import React, { useEffect, useState } from "react";
import { baseUrl } from "../../url";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
    // if (formData.password === formData.confirmPassword) {
    //   setPasswordMatch(true);
    // } else {
    //   setPasswordMatch(false);
    // }
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (let key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Registeration failed", error.message);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register_content">
          <form className="register_content_form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            {!passwordMatch && (
              <p style={{ color: "red" }}>Password are not matched !!</p>
            )}
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add profile photo" />
              <p>Upload Your Photo</p>
            </label>
            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile Photo"
                style={{ maxWidth: "80px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}>
              Register
            </button>
          </form>
          <a href="/login">Already have an account? Log In Here</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
