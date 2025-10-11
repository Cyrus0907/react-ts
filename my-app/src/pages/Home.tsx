// export default function Home() {
//     return <div>Home</div>
// }
export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",           // chiếm toàn bộ chiều cao màn hình
        display: "flex",           // căn giữa nội dung
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(to right, #dbeafe, #e9d5ff)", // nền nhẹ
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b" }}>
        Chào mừng bạn đến với trang chủ!
      </h1>
      
    </div>
  );
}
