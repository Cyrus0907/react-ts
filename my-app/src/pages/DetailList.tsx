import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);
  //thêm vào giỏ hàng
  // const handleAddToCart = ()=>{
  //   setMessage("Đã thêm vào giỏ hàng thành công!");
  //   setTimeout(()=>{setMessage(""),3000});
  // };

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>
      <div className="card shadow-sm p-3">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.src = "https://anphat.com.vn/media/lib/02-06-2021/gaming.jpg";
              }}
            />
          </div>
          <div className="col-md-6">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.description}</p>
            <p className="fw-bold text-danger fs-4">
              {product.price.toLocaleString("vi-VN")} ₫
            </p>
            <button className="btn btn-success">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
