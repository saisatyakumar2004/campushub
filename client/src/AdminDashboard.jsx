import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

const AdminPortal = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [approvedLostItems, setApprovedLostItems] = useState([]);
  const [approvedFoundItems, setApprovedFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/lostfound/pending")
      .then((response) => setPendingItems(response.data))
      .catch((error) => console.error("Error fetching pending items:", error));

    axios
      .get("http://127.0.0.1:3001/lostfound/lost")
      .then((response) => setApprovedLostItems(response.data))
      .catch((error) => console.error("Error fetching approved lost items:", error));

    axios
      .get("http://127.0.0.1:3001/lostfound/found")
      .then((response) => setApprovedFoundItems(response.data))
      .catch((error) => console.error("Error fetching approved found items:", error));
  }, []);

  const handleApprove = (itemId, itemType) => {
    axios
      .patch(`http://127.0.0.1:3001/lostfound/update/${itemId}`, { status: "approved" })
      .then((response) => {
        setPendingItems(pendingItems.filter((item) => item._id !== itemId));
        itemType === "lost"
          ? setApprovedLostItems([...approvedLostItems, response.data])
          : setApprovedFoundItems([...approvedFoundItems, response.data]);
      })
      .catch((error) => console.error("Error approving item:", error));
  };

  const handleReject = (itemId) => {
    axios
      .patch(`http://127.0.0.1:3001/lostfound/update/${itemId}`, { status: "rejected" })
      .then(() => setPendingItems(pendingItems.filter((item) => item._id !== itemId)))
      .catch((error) => console.error("Error rejecting item:", error));
  };

  return (
    <div className="admin-container">
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <button onClick={() => navigate("/")} className="back-btn">
  ← Back to Home
</button>
        <div className="tabs">
          {["pending", "lost", "found"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? "active-tab" : ""} ${
                tab === "pending" ? "pending" : tab === "lost" ? "approved-lost" : "approved-found"
              }`}
            >
              {tab === "pending" ? "Pending Items" : tab === "lost" ? "Approved Lost Items" : "Approved Found Items"}
            </button>
          ))}
        </div>

        <div className="table-container">
          {activeTab === "pending" && (
            <div>
              <h3>Pending Lost and Found Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.location}</td>
                      <td>
                        <button onClick={() => handleApprove(item._id, item.itemType)} className="approve-btn">
                          Approve
                        </button>
                        <button onClick={() => handleReject(item._id)} className="reject-btn">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {["lost", "found"].includes(activeTab) && (
            <div>
              <h3>{activeTab === "lost" ? "Approved Lost Items" : "Approved Found Items"}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "lost" ? approvedLostItems : approvedFoundItems).map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.location}</td>
                      <td className="status">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
