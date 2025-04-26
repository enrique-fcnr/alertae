import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardDetails = ({ data }) => {
  return (
    <div key={data.title} className="col-sm-6 mb-3 ">
      <div className="d-flex align-items-center border rounded p-3 h-100">

        {data.icon}  <FontAwesomeIcon icon={data.icone} size="2x" style={{ color: data.color, marginRight: '10px' }} />
        <div className="w-100">
          <p className="mb-1 fw-medium">{data.title}</p>
          <p className="mb-0 text-muted small">{data.value}</p>
        </div>
      </div>
    </div>
  )
}

export default CardDetails