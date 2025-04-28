import React from 'react'
import { Skeleton } from "@chakra-ui/react"


function LoadingSkeletonPrevisoes() {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-grid gap-4">
        <Skeleton className="w-100 rounded" style={{ height: "200px" }} />
        <div className="row g-4">
          <Skeleton className="w-100 rounded" style={{ height: "400px" }} />
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeletonPrevisoes