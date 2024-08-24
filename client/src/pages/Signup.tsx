import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMSG, setError] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        setError("Signup failed, please try again.");
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
      console.error(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl w-full p-4 flex flex-col items-center justify-center bg-slate-100 border-none rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-24">Signup</h2>

      <div className="flex flex-col items-center w-full gap-4">
        <MyInput
          type="text"
          value={name}
          setValue={setName}
          placeholder="Enter your full name"
        />

        <MyInput
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="Enter your email"
        />

        <MyInput
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Enter your password"
        />
        {errorMSG && (
          <p className="text-rose-700 align-left w-full text-sm ">{errorMSG}</p>
        )}
        <MyButton type="submit" name="Signup" handleClick={() => {}} />

        <hr />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
