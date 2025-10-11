import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function ClientLayout() {
  return (
    <div style={{ width: "1000px", minHeight: "100vh", overflowX: "hidden" }}>
      <Header />
      <div className="mt-4" style={{ width: "100%", margin: 0, padding: 0 }}>
        <Outlet />
      </div>
    </div>
  );
}
