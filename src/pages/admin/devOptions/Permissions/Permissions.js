import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUserShield,
  faPlus,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";
import axios from "axios";
import API_URL from "../../../../config/config.js"; // Adjust the import path as necessary
import { permissions } from "../../../../data/data-permissions";
import "./Permissions.css";

const Permissions = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [permissionModal, setPermissionModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
  });
  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch permissions when component mounts
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/permissions`);
        setAllPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setErrorMessage("Error fetching permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const togglePermissionModal = () => {
    setPermissionModal(!permissionModal);
  };

  const toggleUserModal = () => {
    setUserModal(!userModal);
  };

  const handlePermissionChange = (e) => {
    setNewPermission({ ...newPermission, [e.target.name]: e.target.value });
  };

  const handleSubmitPermission = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${API_URL}/permissions`,
        newPermission
      );
      setAllPermissions([...allPermissions, response.data.permission]);
      setPermissionModal(false);
      setNewPermission({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding permission:", error);
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while adding the permission.");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredPermissions = allPermissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            className="action-button view-button"
            onClick={() => handleView(params.row)}
            title="View"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="action-button edit-button"
            onClick={() => handleEdit(params.row)}
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => handleDelete(params.row)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
    { field: "sno", headerName: "S.No", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "created_at", headerName: "Created Date", width: 180 },
    { field: "updated_at", headerName: "Updated Date", width: 180 },
  ];

  const rows = filteredPermissions.map((permission, index) => ({
    id: permission.id,
    sno: index + 1,
    name: permission.name,
    description: permission.description,
    created_at: new Date(permission.created_at).toLocaleDateString(),
    updated_at: new Date(permission.updated_at).toLocaleDateString(),
  }));

  const handleView = (permission) => {
    // Handle view action
    console.log("View permission:", permission);
  };

  const handleEdit = (permission) => {
    // Handle edit action
    console.log("Edit permission:", permission);
  };

  const handleDelete = (permission) => {
    // Handle delete action
    console.log("Delete permission:", permission);
  };

  return (
    <>
      <PageTitle title="Permissions" />
      <div className="permissions-container">
        <div className="permissions-nav">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => toggleTab("1")}
              >
                <FontAwesomeIcon icon={faUserShield} className="tab-icon" />
                Role-Based
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => toggleTab("2")}
              >
                <FontAwesomeIcon icon={faKey} className="tab-icon" />
                User Permissions
              </NavLink>
            </NavItem>
          </Nav>
          <Button
            color="primary"
            onClick={
              activeTab === "1" ? togglePermissionModal : toggleUserModal
            }
            className="add-button"
          >
            <FontAwesomeIcon icon={faPlus} /> Add{" "}
            {activeTab === "1" ? "Permission" : "User"}
          </Button>
        </div>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="search-container">
              <Input
                type="text"
                placeholder="Search Permissions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div style={{ height: 400, width: "100%" }}>
              {loading ? (
                <div className="spinner-container">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              )}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <p>Manage users here.</p>
            {/* Add user management content here */}
          </TabPane>
        </TabContent>

        {/* Permission Modal */}
        <Modal isOpen={permissionModal} toggle={togglePermissionModal}>
          <ModalHeader toggle={togglePermissionModal}>
            Add Permission
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              name="name"
              placeholder="Permission Name"
              value={newPermission.name}
              onChange={handlePermissionChange}
            />
            <Input
              type="textarea"
              name="description"
              placeholder="Description"
              value={newPermission.description}
              onChange={handlePermissionChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleSubmitPermission}
              disabled={loading}
            >
              {loading ? <span>Saving...</span> : <span>Save</span>}
            </Button>
            <Button color="secondary" onClick={togglePermissionModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* User Modal */}
        <Modal isOpen={userModal} toggle={toggleUserModal}>
          <ModalHeader toggle={toggleUserModal}>Add User</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="User Name" />
            <Input type="email" placeholder="Email" />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleUserModal}>
              Save
            </Button>
            <Button color="secondary" onClick={toggleUserModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Permissions;
