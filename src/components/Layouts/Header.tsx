import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const baseStyle =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  const activeStyle =
    "text-blue-600 bg-blue-100";

  const inactiveStyle =
    "text-gray-600 hover:text-blue-600 hover:bg-blue-50";

  return (
    <header className="bg-white shadow-md">
      <nav className="p-4 flex justify-between items-center h-16 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Header</h1>

        <ul className="flex gap-4 items-center">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fetch-old"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Fetch Old
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/fetch-rq"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Fetch RQ
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;