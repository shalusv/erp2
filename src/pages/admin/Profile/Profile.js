import React, { useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import profileImage from "../../../assets/images/admin/uploads/profile-images/profile-deafult-female.jpg";
import "./Profile.css";
import PageTitle from "../../../components/admin/common/PageTitle/PageTitle";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPhotoEditModalOpen, setPhotoEditModalOpen] = useState(false);
  const [photo, setPhoto] = useState(profileImage);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handlePhotoEditClick = () => {
    setPhotoEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setPhotoEditModalOpen(false);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="profile-container">
      <PageTitle title="Profile" />
      <div className="profile-info">
        <div className="profile-img-container">
          <img src={photo} alt="User Profile" className="profile-img" />
          <FaCamera
            className="photo-edit-icon"
            onClick={handlePhotoEditClick}
          />
        </div>
        <div className="profile-details">
          <p className="profile-name">Shalu S Vayakakdy</p>
          <p className="profile-role">Developer</p>
          <button onClick={handleEditClick} className="edit-profile-btn">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue="Shalu S Vayakakdy" />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" defaultValue="Developer" />
              </div>
              <button type="submit" className="save-btn">
                Save
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {isPhotoEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content photo-edit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Change Profile Photo</h2>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            <button type="button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
