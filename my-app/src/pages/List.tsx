import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
}

export default function List() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // --- FETCH DANH SÁCH SẢN PHẨM ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:3001/products?_page=${page}&_limit=${limit}${
          keyword ? `&title_like=${keyword}` : ""
        }`;
        const res = await axios.get<Product[]>(url);

        // X-total-count (fallback nếu header không có)
        const totalCount = Number(res.headers["x-total-count"] ?? 0);
        setTotalPages(Math.max(1, Math.ceil(totalCount / limit)));

        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, keyword]);

  // --- XỬ LÝ TÌM KIẾM ---
  const handleSearchClick = () => {
    setKeyword(search.trim());
    setPage(1);
  };

  // --- XỬ LÝ XÓA ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      alert("Đã xóa sản phẩm thành công!");
      // Refresh danh sách
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Xóa sản phẩm thất bại!");
      console.error(error);
    }
  };

  // --- CHUYỂN TRANG ---
  const handleChangePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh sách sản phẩm</h2>

      {/* Thanh tìm kiếm */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="form-control w-25"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearchClick}>
          Tìm kiếm
        </button>
        <Link to="/admin/add" className="btn btn-success">
          Thêm sản phẩm
        </Link>
      </div>

      {/* Bảng sản phẩm */}
      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Giá (₫)</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img
                      src={
                        p.image ??
                        "https://anphat.com.vn/media/lib/02-06-2021/gaming.jpg"
                      }
                      alt={p.title}
                      style={{ width: 100, height: 80, objectFit: "cover" }}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://anphat.com.vn/media/lib/02-06-2021/gaming.jpg")
                      }
                    />
                  </td>
                  <td className="fw-bold">{p.title}</td>
                  <td className="text-muted small" style={{ maxWidth: 300 }}>
                    {p.description}
                  </td>
                  <td className="text-danger fw-semibold">
                    {p.price.toLocaleString("vi-VN")}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/${p.id}`}
                        className="btn btn-outline-info btn-sm"
                      >
                        Xem
                      </Link>
                      <Link
                        to={`/admin/edit/${p.id}`}
                        className="btn btn-outline-warning btn-sm"
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleChangePage(page - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handleChangePage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleChangePage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
