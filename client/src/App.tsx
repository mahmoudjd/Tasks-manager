import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppTask from "./pages/AppTask";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-w-full ">
          <Header />
          <main className="flex flex-col w-full min-w-full p-2">
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute component={<AppTask />} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
