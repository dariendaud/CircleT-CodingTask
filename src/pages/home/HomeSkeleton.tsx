import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeSkeleton() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
        <div className="col-md-4">
          <Skeleton className="home-skeleton" />
        </div>
      </div>
    </React.Fragment>
  );
}