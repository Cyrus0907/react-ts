import toast from "react-hot-toast";
import ProductForm from "../pages/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
 interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  image?: string;
}

export default function Add() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get<Product>(`http://localhost:3001/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Lỗi khi tải sản phẩm:", err);
                toast.error("Lỗi khi tải sản phẩm");
                navigate("/admin/list");
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id, navigate]);
    const onSubmit = async (data: Product) => {

        try {
            await axios.put(`http://localhost:3001/products/${id}`, data);
            toast.success("Cập nhật sản phẩm thành công");
            navigate("/admin/list");
        } catch (error) {
            toast.error("Cập nhật sản phẩm thất bại");
            console.error(error);
        }
    };
  return (
    <div>
      <h1 className="text-center mt-3">Chỉnh sửa sản phẩm</h1>
      <ProductForm onSubmit={onSubmit} defaultValues={product || undefined} />

      
    </div>
  );
}