import React from 'react'
import { Skeleton } from "@chakra-ui/react"


function LoadingSkeletonPrevisoes() {
  return (
    <div className="container py-4 py-md-0 d-flex flex-column gap-4 mt-5">
      <div className="d-grid gap-4">
        <Skeleton className="w-100 rounded" style={{ height: "200px" }} />
        <Skeleton className="w-100 rounded" style={{ height: "400px" }} />
      </div>
    </div>
  )
}

export default LoadingSkeletonPrevisoes