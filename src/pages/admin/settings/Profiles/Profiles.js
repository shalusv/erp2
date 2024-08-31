import React from "react";
import "./Profiles.css";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";

const Profiles = () => {
  return (
    <>
      <PageTitle title="Profiles" />
      <div className="profiles-container">
        <p>Manage user profiles here.</p>
        {/* Add Profiles content here */}
      </div>
    </>
  );
};

export default Profiles;
