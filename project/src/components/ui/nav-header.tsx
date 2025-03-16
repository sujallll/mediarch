"use client"; 

import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavHeader() {
  const location = useLocation();

  return (
    <ul className="flex gap-8">
      <Tab to="/" isActive={location.pathname === "/"}>Home</Tab>
      <Tab to="/about" isActive={location.pathname === "/about"}>About</Tab>
      <Tab to="/contact" isActive={location.pathname === "/contact"}>Contact</Tab>
    </ul>
  );
}

const Tab = ({
  children,
  to,
  isActive,
}: {
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}) => {
  return (
    <li>
      <Link
        to={to}
        className={`text-base uppercase transition-colors ${
          isActive ? 'text-yellow-500' : 'text-white'
        } hover:text-yellow-500`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavHeader;