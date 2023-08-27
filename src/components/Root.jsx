import React from "react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-100" style={{maxWidth: '300px'}}>
      <Outlet />
    </div>
  );
}
