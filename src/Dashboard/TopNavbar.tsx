import React from "react";

const TopNavbar: React.FC = () => {
  return (
    <div className="navbar d-flex justify-content-between align-items-center p-3" style={{backgroundColor: "#FFEB3B"}}>
      <div>
        <h5 className="m-0">Dashboard</h5>
      </div>
      <div className="d-flex">
        <input type="text" className="form-control mx-2" placeholder="MAE136" />
        <input type="text" className="form-control mx-2" placeholder="Elmeasure" />
        <button className="btn btn-light mx-2">Download</button>
        <div className="profile-icon d-flex align-items-center">
          <img src="https://via.placeholder.com/30" className="rounded-circle" alt="User" />
          <span className="ms-2">Mae User</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
