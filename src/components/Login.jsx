import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId: emailId,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your first name..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your last name..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter your email..."
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <p className="text-red-500">{error}</p>
            <button className="btn btn-primary my-4" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="text-white-500 cursor-pointer m-auto" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Sign Up here" : "Existing User? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
