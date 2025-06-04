import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logoo from "../assets/logoo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const commonButtonStyles = {
    display: "inline-block",
    padding: "10px 8px",
    fontSize: "19px",
    fontWeight: "bold",
    color: "#ffffff", // White text color
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    textTransform: "uppercase", // Optional: to make text uppercase
  };
  return (
    <header className="bg-white shadow-lg">
      {/* <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=M+PLUS+Rounded+1c&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
          
          body {
            font-family: "M PLUS Rounded 1c", sans-serif, Arial;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style> */}
      <div className="flex justify-between items-center max-w-8xl mx-auto p-3 border-b border-gray-300 px-20 ">
        <div className="pl-10">
          <Link to="/" className="flex items-center">
            <img className=" h-14 w-14 object-cover " src={logoo} alt=" " />
            <h1 className="font-bold text-2xl flex flex-wrap ml-2">
              <span className="text-black ">Leo</span>
              <span style={{ color: "#2f6690ff" }} className="">
                Properties
              </span>
            </h1>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none w-26 sm:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600 "></FaSearch>
          </button>
        </form>
        <ul className="flex gap-3  items-center justify-center">
          <Link to="/">
            <li
              style={{
                ...commonButtonStyles,
                backgroundColor: "transparent", // No background color
                color: "#000000",
              }}
              className="Hidden sm:inline text-gray-900 hover:scale-105 text-xl font-medium "
            >
              Home
            </li>
          </Link>

          <Link to="/About">
            <li
              style={{
                ...commonButtonStyles,
                backgroundColor: "transparent", // No background color
                color: "#000000",
              }}
              className="Hidden sm:inline text-gray-900 hover:scale-105 text-xl font-medium"
            >
              About
            </li>
          </Link>
          <Link to="/emi-calculator">
            <li
              style={{
                ...commonButtonStyles,
                backgroundColor: "transparent", // No background color
                color: "#000000",
              }}
              className="Hidden sm:inline text-gray-900 hover:scale-105 text-xl font-medium"
            >
              Tools
            </li>
          </Link>
          {currentUser && (
            <Link to="/saved-listings">
              <li
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#ffffff", // White text color
                  backgroundColor: "#007bff", // Primary blue
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  textTransform: "uppercase", // Optional: to make text uppercase
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3"; // Darker blue on hover
                  e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff"; // Reset to primary blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = "#004494"; // Even darker blue on click
                  e.currentTarget.style.transform = "scale(0.95)"; // Slightly shrink on click
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff"; // Reset to primary blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
                className="Hidden sm:inline text-gray-900 hover:scale-105 text-xl font-medium"
              >
                Favourites
              </li>
            </Link>
          )}
          <Link to="/sign-in">
            {!currentUser && (
              <li
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#ffffff", // White text color
                  backgroundColor: "#007bff", // Primary blue
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  textTransform: "uppercase", // Optional: to make text uppercase
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3"; // Darker blue on hover
                  e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff"; // Reset to primary blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = "#004494"; // Even darker blue on click
                  e.currentTarget.style.transform = "scale(0.95)"; // Slightly shrink on click
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff"; // Reset to primary blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
                // className="text-white hover:opacity-95 h-10 w-20 rounded-md text-center flex items-center justify-center bg-blue-400 font-semibold"
              >
                Sign in
              </li>
            )}
          </Link>

          <Link to="/Profile">
            {currentUser ? (
              <span
                className="text-white hover:opacity-95 h-12 w-32 text-center flex items-center justify-center text-lg font-bold gap-2 uppercase"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                  backgroundColor: "#31b0d5",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#31b0d5"; // Medium blue on hover
                  e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#5bc0de"; // Reset to light blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = "#31b0d5"; // Medium blue on click
                  e.currentTarget.style.transform = "scale(0.95)"; // Slightly shrink on click
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = "#5bc0de"; // Reset to light blue
                  e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                }}
              >
                {" "}
                Profile
                <img
                  className="rounded-full h-9 w-9 object-cover "
                  src={formData.avatar || currentUser.avatar}
                  alt="Profile"
                />
              </span>
            ) : (
              <Link to="/sign-up">
                <li
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#ffffff", // White text color
                    backgroundColor: "#31b0d5", // Primary blue
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                    textTransform: "uppercase", // Optional: to make text uppercase
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#31b0d5"; // Medium blue on hover
                    e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#5bc0de"; // Reset to light blue
                    e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor = "#31b0d5"; // Medium blue on click
                    e.currentTarget.style.transform = "scale(0.95)"; // Slightly shrink on click
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor = "#5bc0de"; // Reset to light blue
                    e.currentTarget.style.transform = "scale(1)"; // Reset to original size
                  }}

                  // style={{ background: "rgb(14,100,210)" }}
                >
                  Sign up
                </li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
