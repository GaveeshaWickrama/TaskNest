import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillHousesFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import {
  MdDashboard,
  MdAccountCircle,
  MdBuild,
  MdGroup,
  MdAssessment,
} from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { MdReportProblem } from "react-icons/md";


const iconMap = {
  Home: "home",
  "Dashboard": <MdDashboard />,
  "Manage Moderators": <MdAccountCircle />,
  "User Page": "account_circle",
  "My Profile": "account_circle",
  Moderators: "account_circle",
  PropertyOwners: "account_circle",
  Tenants: "account_circle",
  "My Profile": "account_circle",
  Moderators: "account_circle",
  PropertyOwners: "account_circle",
  Tenants: "account_circle",
  Reviews: "rate_review",
  Reservations: "event_available",
  "Host Dashboard": "dashboard",
  "Your Listings": "house",
  "New Listing": "add_box",
  Login: "login",
  Signup: "person_add",
  Chat: "chat",
  "View New Properties": <BsFillHousesFill />,
  Payments: <FaCreditCard />,
  Report: <MdAssessment />,
  Technicians: <MdBuild />,
  "My Listings": <CiCircleList />,
  "Complaints": <MdReportProblem />,
  "Manage Users": <MdGroup />,
  
  
  
};

function Sidebar({ title, links, logout, isVisible }) {
  return (
    <nav
      className={`sidebar ${
        isVisible ? "visible" : ""
      } h-full w-64 fixed top-20 left-0 bg-gray-800 z-2 text-white flex flex-col p-4`}
    >
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <IconContext.Provider value={{ className: "inline-block mr-2" }}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="mb-2 p-2 hover:bg-gray-700 rounded flex items-center"
          >
            <span className="material-icons">{iconMap[link.label]}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </IconContext.Provider>
      {logout && (
        <button
          onClick={logout}
          className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
        >
          <RiLogoutBoxRLine className="inline-block mr-2" />
          Logout
        </button>
      )}
    </nav>
  );
}

function Navbar({ isVisible }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
   
    { path: "/admin/AdminDashboard", label: "Dashboard" },
    
  ];  

  const userLinks = [
    // { path: "/technician/dashboard", label: "Home" },
    { path: "/user/dashboard", label: "Dashboard" },
    { path: "/user/changePassword", label: "Change Password" },
    
  ];

  const publicLinks = [
    // { path: "/", label: "Home" },
    // { path: "/login", label: "Login" },
    // { path: "/signup/guest", label: "Signup" },
  ];

  if (!currentUser) {
    return (
      <Sidebar 
      title="Welcome" 
      links={publicLinks} isVisible={isVisible} />
    );
    // return null; // Do not render the Navbar if the user is not logged in
  }

  if (currentUser.role === "admin") {
    return (
      <Sidebar
        // title="Admin Nav"
        links={adminLinks}
        logout={handleLogout}
        isVisible={isVisible}
      />
    );
    }
    if (currentUser.role === "user") {
        return (
            <Sidebar
            // title="Admin Nav"
            links={userLinks}
            logout={handleLogout}
            isVisible={isVisible}
            />
        );
    }

  

  

  
  

  return null;
}

export default Navbar;