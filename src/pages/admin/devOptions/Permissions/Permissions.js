import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import API_URL from "../../../../config/config";
import PermissionTable from "../../../../components/admin/other/Dev-Options/DevPermissions/PermissionTable/PermissionTable";
import AddPermissionModal from "../../../../components/admin/other/Dev-Options/DevPermissions/AddPermissionModal/AddPermissionModal";
import DeletePermissionModal from "../../../../components/admin/other/Dev-Options/DevPermissions/DeletePermissionModal/DeletePermissionModal";
import EditPermissionModal from "../../../../components/admin/other/Dev-Options/DevPermissions/EditPermissionModal/EditPermissionModal";
import ViewPermissionModal from "../../../../components/admin/other/Dev-Options/DevPermissions/ViewPermissionModal/ViewPermissionModal";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";
import "react-toastify/dist/ReactToastify.css";
import "./Permissions.css"; // Updated CSS import

const Permissions = () => {
  const [searchText, setSearchText] = useState("");
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [showDeletePermission, setShowDeletePermission] = useState(false);
  const [showEditPermission, setShowEditPermission] = useState(false);
  const [showViewPermission, setShowViewPermission] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    setShowEditPermission(false);
    setShowViewPermission(false);
    setShowDeletePermission(false);
  };

  const handleCloseAddPermission = () => {
    setShowAddPermission(false);
  };

  const handleSavePermission = (permission) => {
    setPermissions((prevPermissions) => [permission, ...prevPermissions]);
  };

  const handleEditClick = (permission) => {
    setSelectedPermission(permission);
    setShowEditPermission(true);
    setShowViewPermission(false);
    setShowAddPermission(false);
    setShowDeletePermission(false);
  };

  const handleCloseEditPermission = () => {
    setShowEditPermission(false);
    setSelectedPermission(null);
  };

  const handleSaveEditedPermission = async (updatedPermission) => {
    try {
      await axios.put(
        `${API_URL}/permissions/${updatedPermission.id}`,
        updatedPermission
      );
      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission.id === updatedPermission.id
            ? updatedPermission
            : permission
        )
      );
      showToast("Permission updated successfully", "success");
    } catch (error) {
      console.error("Error updating permission:", error);
      showToast("Failed to update permission", "error");
    } finally {
      handleCloseEditPermission();
    }
  };

  const handleDeleteClick = (permission) => {
    setSelectedPermission(permission);
    setShowDeletePermission(true);
    setShowViewPermission(false);
    setShowAddPermission(false);
    setShowEditPermission(false);
  };

  const handleCloseDeletePermission = () => {
    setShowDeletePermission(false);
    setSelectedPermission(null);
  };

  const handleDeletePermission = async (permissionId) => {
    try {
      await axios.delete(`${API_URL}/permissions/${permissionId}`);
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission.id !== permissionId)
      );
      showToast("Permission deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting permission:", error);
      showToast("Failed to delete permission", "error");
    } finally {
      handleCloseDeletePermission();
    }
  };

  const handleViewClick = (permission) => {
    setSelectedPermission(permission);
    setShowViewPermission(true);
    setShowAddPermission(false);
    setShowEditPermission(false);
    setShowDeletePermission(false);
  };

  const handleCloseViewPermission = () => {
    setShowViewPermission(false);
    setSelectedPermission(null);
  };

  const showToast = (message, type) => {
    toast.dismiss(); // Dismiss any existing toasts

    if (type === "success") {
      toast.success(message, { position: "top-right" });
    } else {
      toast.error(message, { position: "top-right" });
    }
  };

  return (
    <>
      <PageTitle title="Permissions" onAddClick={handleAddPermissionClick} />
      <div className="permissions-container">
        <PermissionTable
          permissions={filteredPermissions}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddPermissionClick}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
      <DeletePermissionModal
        isOpen={showDeletePermission}
        onClose={handleCloseDeletePermission}
        onDelete={() => handleDeletePermission(selectedPermission?.id)}
        permission={selectedPermission}
      />
      <EditPermissionModal
        isOpen={showEditPermission}
        onClose={handleCloseEditPermission}
        onSave={handleSaveEditedPermission}
        permission={selectedPermission}
        showToast={showToast}
      />
      <ViewPermissionModal
        isOpen={showViewPermission}
        onClose={handleCloseViewPermission}
        onEdit={handleEditClick}
        onDelete={handleDeletePermission}
        permission={selectedPermission}
      />
    </>
  );
};

export default Permissions;
