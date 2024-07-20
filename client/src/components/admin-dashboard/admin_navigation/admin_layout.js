import React, { useState } from "react";
import MiniDrawer from "./admin_navigation";
const AdminLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div
      className={`admin-layout ${drawerOpen ? "drawer-open" : "drawer-closed"}`}
    >
      <MiniDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <main className="content-container-graph">{children}</main>
    </div>
  );
};

export default AdminLayout;
