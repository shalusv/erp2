import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import API_URL from "../../../config/config";

import TabNavigation from "../../../components/admin/other/Dev-Options/TabNavigation/TabNavigation";
import PermissionTable from "../../../components/admin/other/Dev-Options/PermissionTable/PermissionTable";
import AddPermissionModal from "../../../components/admin/other/Dev-Options/AddPermissionModal/AddPermissionModal";
import PageTitle from "../../../components/admin/common/PageTitle/PageTitle";

import "react-toastify/dist/ReactToastify.css";
import "./DevOptions.css";

const DevOptions = () => {
  const [activeTab, setActiveTab] = useState("permissions");
  const [searchText, setSearchText] = useState("");
  const [showAddPermission, setShowAddPermission] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/permissions`);
      setPermissions(response.data.permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      setErrorMessage("Error fetching permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    setFilteredPermissions(
      permissions.filter((permission) =>
        permission.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, permissions]);

  const handleAddPermissionClick = () => {
    setShowAddPermission(true);
  };

  const handleCloseAddPermission = () => {
    setShowAddPermission(false);
  };

  const handleSavePermission = (permission) => {
    setPermissions((prevPermissions) => [permission, ...prevPermissions]);
  };

  const showToast = (message, type) => {
    toast.dismiss(); // Dismiss any existing toasts

    // Display toast based on type
    if (type === "success") {
      toast.success(message, { position: "top-right" }); // Direct position string
    } else {
      toast.error(message, { position: "top-right" }); // Direct position string
    }
  };

  return (
    <>
      <PageTitle
        title="Developer Options"
        onAddClick={handleAddPermissionClick}
      />
      <div className="dev-options-container">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === "permissions" && (
          <PermissionTable
            permissions={filteredPermissions}
            onEdit={() => {}}
            onDelete={() => {}}
            onAdd={handleAddPermissionClick}
          />
        )}
      </div>
      <ToastContainer
        position="top-right" // Use string for position
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AddPermissionModal
        isOpen={showAddPermission}
        onClose={handleCloseAddPermission}
        onSave={handleSavePermission}
        showToast={showToast}
      />
    </>
  );
};

export default DevOptions;
