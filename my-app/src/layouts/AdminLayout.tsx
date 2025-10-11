import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    <div
      className="admin-layout d-flex"
      style={{
        minHeight: "100vh",
        width: "1500px",
        overflowX: "hidden", // Ngăn phần tràn ngang
      }}
    >
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <div className="p-4 flex-grow-1 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
