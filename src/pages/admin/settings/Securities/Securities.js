import React from "react";
import "./Securities.css";
import PageTitle from "../../../../components/admin/common/PageTitle/PageTitle";

const Securities = () => {
  return (
    <>
      <PageTitle title="Securities" />
      <div className="securities-container">
        <p>Manage user Securities here.</p>
        {/* Add Profiles content here */}
      </div>
    </>
  );
};

export default Securities;
