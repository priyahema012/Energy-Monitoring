import React from "react";

interface DashboardCardProps {
  title: string;
  content: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, content }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;