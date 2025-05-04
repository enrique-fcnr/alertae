import React from 'react'
import { Skeleton } from "@chakra-ui/react"


function LoadingSkeleton() {
  return (
    <div className="container py-5 mt-2 d-flex flex-column gap-4">
      <div className="d-grid gap-4">
        <Skeleton className="w-100 rounded" style={{ height: "200px" }} />
        <div className="row g-4">
          <div className="col-md-6">
            <Skeleton className="w-100 rounded" style={{ height: "400px" }} />
          </div>
          <div className="col-md-6">
            <Skeleton className="w-100 rounded" style={{ height: "400px" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton