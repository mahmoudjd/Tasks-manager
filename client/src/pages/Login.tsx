import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMSG, setError] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      if (data.token) {
        login(data.token);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl w-full p-4 flex flex-col items-center justify-center bg-slate-100 border-none rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-24">Login</h2>
      <div className="flex flex-col items-center w-full gap-4">
        <MyInput
          placeholder="Enter your email"
          type="email"
          value={email}
          setValue={setEmail}
        />

        <MyInput
          placeholder="Enter your password"
          type="password"
          value={password}
          setValue={setPassword}
        />

        {errorMSG && (
          <p className="text-rose-700 align-left w-full text-sm ">{errorMSG}</p>
        )}

        <MyButton type="submit" name="Login" handleClick={() => {}} />

        <p>
          You don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline font-semibold">
            Create an Account
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
