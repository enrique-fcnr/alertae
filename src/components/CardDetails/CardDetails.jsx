import React from 'react';
import './CardDetails.css';

const CardDetails = ({ data }) => {
  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="card-details-wrapper shadow-sm rounded-3 p-3 d-flex align-items-center gap-3 h-100">
        <div className="card-details-icon">
          {data.icon}
        </div>
        <div className="card-details-info">
          <p className="card-details-title mb-1 fw-semibold">{data.title}</p>
          <p className="card-details-desc mb-0 text-muted">{data.value}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
