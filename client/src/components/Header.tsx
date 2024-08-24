import React, { MouseEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

function Header() {
  const { isAuth, logout } = useAuth();

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="w-full flex justify-between items-center p-4 mb-4 bg-blue-500 text-white">
      <div className="flex-grow text-center">
        <h2 className="text-3xl font-bold">Tasks</h2>
      </div>
      {isAuth && (
        <nav className="ml-auto">
          <button
            className="bg-red-500 hover:bg-red-700 text-white p-2 rounded flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
