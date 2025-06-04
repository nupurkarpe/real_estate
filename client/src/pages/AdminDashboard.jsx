import { Cursor } from "mongoose";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/Glassmorphism.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faList,
  faUserShield,
  faPlus,
  faSignOutAlt,
  faClock,
  faBuilding,
  faChartPie,
  faAddressBook,
  faTag,
  faHouseUser,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ToDoList from "../components/ToDoList";
import PriceComparisonChart from "../components/PriceComparisonChart";
import ListingsByFurnishedStatusChart from "../components/ListingByFurnishedStatusChart";
import ListingsByParkingStatusChart from "../components/ListingByParkingStatus";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [contactError, setContactError] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [recentLogins, setRecentLogins] = useState([]);
  const [housesOnRent, setHousesOnRent] = useState(0);
  const [housesOnSell, setHousesOnSell] = useState(0);
  const [housesOnOffer, setHousesOnOffer] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  const fetchOverviewData = async () => {
    try {
      const [usersRes, listingsRes, adminsRes, contactsRes] = await Promise.all(
        [
          fetch("/api/admin/users"),
          fetch("/api/admin/listings"),
          fetch("/api/admin/admins"),
        ]
      );

      const usersData = await usersRes.json();
      const listingsData = await listingsRes.json();
      const adminsData = await adminsRes.json();

      setUsers(usersData);
      setListings(listingsData);
      setAdmins(adminsData);

      const [rentCountRes, sellCountRes, offerCountRes] = await Promise.all([
        fetch("/api/admin/count?ype=rent"),
        fetch("/api/admin/count?type=sell"),
        fetch("/api/admin/count?offer=true"),
      ]);

      const rentCountData = await rentCountRes.json();
      const sellCountData = await sellCountRes.json();
      const offerCountData = await offerCountRes.json();

      setHousesOnRent(rentCountData.count);
      setHousesOnSell(sellCountData.count);
      setHousesOnOffer(offerCountData.count);

      const activitiesRes = await fetch("/api/admin/recent-activities");
      const activitiesData = await activitiesRes.json();
      setRecentActivities(activitiesData);
    } catch (error) {
      setError("An error occurred while fetching data for the overview.");
    }
  };

  useEffect(() => {
    if (activeSection === "dashboard") {
      fetchOverviewData();
    } else if (activeSection === "getAllUsers") {
      fetchUsers();
    } else if (activeSection === "getAllListings") {
      fetchListings();
    } else if (activeSection === "manageAdmins") {
      fetchAdmins();
    } else if (activeSection === "recentLogins") {
      const fetchRecentLogins = async () => {
        try {
          const response = await fetch("/api/admin/recent-logins");
          const result = await response.json();
          if (response.ok) {
            setRecentLogins(result);
          } else {
            setError(result.message);
          }
        } catch (err) {
          setError("An error occurred while fetching recent logins.");
        }
      };

      fetchRecentLogins();
    } else if (activeSection === "manageContacts") {
      fetchContacts();
    }
  }, [activeSection]);

  const renderActivity = (activity) => {
    switch (activity.type) {
      case "rent":
        return (
          <div key={activity._id}>
            <p>
              <strong>New Listing:</strong> {activity.name} -{" "}
              {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      case "user":
        return (
          <div key={activity._id}>
            <p>
              <strong>New User:</strong> {activity.username} -{" "}
              {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      case "sell":
        return (
          <div key={activity._id}>
            <p>
              <strong>New Listing:</strong> {activity.name} -{" "}
              {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setUsers(result);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while fetching users.");
    }
  };

  const fetchListings = async () => {
    try {
      const response = await fetch("/api/admin/listings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setListings(result);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while fetching listings.");
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin/admins", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (response.ok) {
        setAdmins(result);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while fetching admins.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while deleting the user.");
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`/api/admin/listing/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setListings(listings.filter((listing) => listing._id !== listingId));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while deleting the listing.");
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await fetch(`/api/admin/admin/${adminId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setAdmins(admins.filter((admin) => admin._id !== adminId));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while deleting the admin.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const containerStyle = {
    marginLeft: "250px",
    display: "flex",
    justifyContent: "space-between",
    // height: "100vh",
    padding: "20px",
    boxSizing: "border-box",
  };

  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    position: "fixed",
    background: "#333",
    color: "#ffffff",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "#80c3c1",
    paddingTop: "100px",
  };

  const sidebarItemStyle = {
    padding: "15px 10px",
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    cursor: "pointer",
  };
  const iconStyle = {
    marginRight: "20px",
  };

  const sidebarLogoStyle = {
    marginBottom: "30px",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const mainContentStyle = {
    flexGrow: 1,
    background: "#f4f4f4",
    padding: "20px",
    boxSizing: "border-box",
  };

  const overviewCardStyle = {
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    margin: "10px",
    textAlign: "center",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const overviewContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  };

  const overviewIconStyle = {
    fontSize: "4rem",
    color: "black", // A bright blue color
    marginBottom: "10px",
  };

  const linkStyle = {
    display: "block",
    padding: "10px 0",
    color: "#fff",
    textDecoration: "none",
  };

  const titleStyle = {
    marginBottom: "10px",
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
  };

  const overviewTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "10px",
  };

  const overviewCountStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  const userTableStyle = {
    width: "90%",
    borderCollapse: "collapse",
    backgroundColor: "#e0f7fa",
    color: "#333",
    border: "1px solid #81d4fa",
    margin: "0 auto",
  };

  const tableStyle = {
    width: "90%",
    borderCollapse: "collapse",
    backgroundColor: "#e0f7fa",
    color: "#333",
    border: "1px solid #81d4fa",
    margin: "0 auto",
  };

  const thStyle = {
    backgroundColor: "#4fc3f7",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #29b6f6",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #81d4fa",
    backgroundColor: "#b3e5fc",
  };

  const deleteButtonStyle = {
    backgroundColor: "#29b6f6",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
  };

  const toggleAdminButtonStyle = {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    marginRight: "10px",
  };

  const errorMessageStyle = {
    color: "#cc0000",
    marginTop: "20px",
  };

  const logoutModalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
    textAlign: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    // width: "250px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center", // Centers the button horizontally
    marginTop: "20px", // Adjust the margin as needed
  };

  const AddButonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centers text inside the button
    textAlign: "center",
    gap: "5px",
    width: "250px",
  };

  const sectionsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  };

  const sectionStyle = {
    flex: "1",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const sectionHeaderStyle = {
    borderBottom: "2px solid #3498db",
    marginBottom: "10px",
    paddingBottom: "5px",
  };

  const sectionTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  };

  const activitiesStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const activityCardStyle = {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const detailsStyle = {
    flex: "1",
  };

  const activityTitleStyle = {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "5px",
    color: "#333",
  };

  const activityDescriptionStyle = {
    fontSize: "14px",
    color: "#666",
  };
  const activityListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={containerStyle} className="mt-16 mb-10">
      <div className=" cursor-pointer rounded-md" style={sidebarStyle}>
        <h2 style={sidebarLogoStyle}>Admin Dashboard</h2>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("dashboard")}
        >
          {" "}
          <FontAwesomeIcon icon={faChartPie} style={iconStyle} />
          Overview
        </a>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("getAllUsers")}
        >
          <FontAwesomeIcon icon={faUsers} style={iconStyle} />
          Get all Users
        </a>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("getAllListings")}
        >
          <FontAwesomeIcon icon={faBuilding} style={iconStyle} />
          Get all Listings
        </a>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("manageAdmins")}
        >
          <FontAwesomeIcon icon={faUserShield} style={iconStyle} />
          Manage Admins
        </a>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("todoList")}
        >
          <FontAwesomeIcon icon={faList} style={iconStyle} />
          To-Do List
        </a>
        <a
          style={sidebarItemStyle}
          onClick={() => setActiveSection("recentLogins")}
        >
          <FontAwesomeIcon icon={faClock} style={iconStyle} />
          Recent Logins
        </a>
      </div>
      <div style={mainContentStyle}>
        {activeSection === "dashboard" && (
          <div>
            <h1 style={titleStyle}>Admin Dashboard Overview</h1>
            <div style={overviewContainerStyle}>
              <div style={{ ...overviewCardStyle, backgroundColor: "#EAF7FE" }}>
                <FontAwesomeIcon icon={faUsers} style={overviewIconStyle} />
                <h2 style={overviewTitleStyle}>Total Users</h2>
                <p style={overviewCountStyle}>{users.length}</p>
              </div>
              <div style={{ ...overviewCardStyle, backgroundColor: "#DBF1FD" }}>
                <FontAwesomeIcon icon={faBuilding} style={overviewIconStyle} />
                <h2 style={overviewTitleStyle}>Total Listings</h2>
                <p style={overviewCountStyle}>{listings.length}</p>
              </div>
              <div style={{ ...overviewCardStyle, backgroundColor: "#B7E3FA" }}>
                <FontAwesomeIcon
                  icon={faUserShield}
                  style={overviewIconStyle}
                />
                <h2 style={overviewTitleStyle}>Total Admins</h2>
                <p style={overviewCountStyle}>{admins.length}</p>
              </div>
            </div>
            <div style={overviewContainerStyle}>
              <div style={{ ...overviewCardStyle, backgroundColor: "#8FD3F7" }}>
                <FontAwesomeIcon icon={faTag} style={overviewIconStyle} />
                <h2 style={overviewTitleStyle}>Houses on Rent</h2>
                <p style={overviewCountStyle}>{housesOnRent}</p>
              </div>
              <div style={{ ...overviewCardStyle, backgroundColor: "#66C3F4" }}>
                <FontAwesomeIcon icon={faTag} style={overviewIconStyle} />
                <h2 style={overviewTitleStyle}>Houses for Sell</h2>
                <p style={overviewCountStyle}>{housesOnSell}</p>
              </div>
              <div style={{ ...overviewCardStyle, backgroundColor: "#3EB3F2" }}>
                <FontAwesomeIcon icon={faTag} style={overviewIconStyle} />
                <h2 style={overviewTitleStyle}>Houses on Offer</h2>
                <p style={overviewCountStyle}>{housesOnOffer}</p>
              </div>
            </div>
            <br />
            <h2 style={titleStyle}>Recent Activities</h2>
            {error && <p style={errorStyle}>{error}</p>}
            <div style={sectionsContainerStyle}>
              <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                  <h3 style={sectionTitleStyle}>New Users</h3>
                </div>
                <div style={activityListStyle}>
                  {recentActivities
                    .filter((activity) => activity.type === "user")
                    .map((activity) => (
                      <div key={activity._id} style={activityCardStyle}>
                        <div style={iconStyle}>
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div style={detailsStyle}>
                          <p style={activityTitleStyle}>{activity.username}</p>
                          <p style={activityDescriptionStyle}>
                            Joined on{" "}
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                  <h3 style={sectionTitleStyle}>New Listings</h3>
                </div>
                <div style={activityListStyle}>
                  {recentActivities
                    .filter(
                      (activity) =>
                        activity.type === "rent" || activity.type === "sell"
                    )
                    .map((activity) => (
                      <div key={activity._id} style={activityCardStyle}>
                        <div style={iconStyle}>
                          <FontAwesomeIcon icon={faHouseUser} />
                        </div>
                        <div style={detailsStyle}>
                          <p style={activityTitleStyle}>{activity.name}</p>
                          <p style={activityDescriptionStyle}>
                            Listed on{" "}
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <PriceComparisonChart />
            <br />
            <br />
            <br />
            <div className="flex flex-row">
              <div className="w-1/2 p-2">
                <ListingsByFurnishedStatusChart />
              </div>
              <div className="w-1/2 p-2">
                <ListingsByParkingStatusChart />
              </div>
            </div>
          </div>
        )}

        {activeSection === "getAllUsers" && (
          <div>
            <h2 className="mb-10 text-4xl font-semibold mt-5 text-center">
              User Control Panel
            </h2>
            <table className="items-center" style={userTableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Username</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td style={tdStyle}>{user.username}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>
                      <button
                        className="hover:opacity-75"
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p style={errorMessageStyle}>{error}</p>}
          </div>
        )}
        {activeSection === "getAllListings" && (
          <div>
            <h2 className="mb-10 text-4xl font-semibold mt-5 text-center">
              Listings Control Panel
            </h2>
            <table className="items-center" style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing._id}>
                    <td style={tdStyle}>{listing.name}</td>
                    <td style={tdStyle}>{listing.address}</td>
                    <td style={tdStyle}>{listing.price}</td>
                    <td style={tdStyle}>
                      <button
                        className="hover:opacity-75"
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteListing(listing._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p style={errorMessageStyle}>{error}</p>}
          </div>
        )}
        {activeSection === "manageAdmins" && (
          <div>
            <h2 className="mb-10 text-4xl font-semibold mt-5 text-center">
              Manage Admins
            </h2>
            <table className="items-center" style={userTableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Username</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Admin Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td style={tdStyle}>{admin.username}</td>
                    <td style={tdStyle}>{admin.email}</td>
                    <td style={tdStyle}>{admin.isAdmin ? "Admin" : "User"}</td>
                    <td style={tdStyle}>
                      <button
                        className="hover:opacity-75"
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteAdmin(admin._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && <p style={errorMessageStyle}>{error}</p>}
          </div>
        )}
        {activeSection === "todoList" && (
          <div>
            <ToDoList />
          </div>
        )}
        {activeSection === "recentLogins" && (
          <div>
            <h2 className="mb-10 text-4xl font-semibold mt-5 text-center">
              Recent Logins
            </h2>
            <table
              style={{
                width: "90%",
                borderCollapse: "collapse",
                backgroundColor: "#e0f7fa",
                color: "#333",
                border: "1px solid #81d4fa",
                margin: "0 auto",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#4fc3f7",
                      color: "#fff",
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #29b6f6",
                    }}
                  >
                    User ID
                  </th>
                  <th
                    style={{
                      backgroundColor: "#4fc3f7",
                      color: "#fff",
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #29b6f6",
                    }}
                  >
                    Timestamp
                  </th>
                  <th
                    style={{
                      backgroundColor: "#4fc3f7",
                      color: "#fff",
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "2px solid #29b6f6",
                    }}
                  >
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLogins.map((login) => (
                  <tr key={login._id}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #81d4fa",
                        backgroundColor: "#b3e5fc",
                      }}
                    >
                      {login.userId}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #81d4fa",
                        backgroundColor: "#b3e5fc",
                      }}
                    >
                      {new Date(login.timestamp).toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #81d4fa",
                        backgroundColor: "#b3e5fc",
                      }}
                    >
                      {login.ipAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error && (
              <p style={{ color: "#cc0000", marginTop: "20px" }}>{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
