import { useForm } from "react-hook-form";
import { useEffect } from "react";

export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  image?: string;
}

interface Props {
  onSubmit: (data: Product) => void;
  defaultValues?: Product;
}

export default function ProductForm({ onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded w-75 mx-auto mt-3 shadow">
      <div className="mb-3">
        <label className="form-label">Tên sản phẩm</label>
        <input
          {...register("title", { required: "Tên sản phẩm không được bỏ trống" })}
          className="form-control"
          placeholder="Nhập tên..."
        />
        {errors.title && <span className="text-danger">{errors.title.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Mô tả</label>
        <textarea
          {...register("description")}
          className="form-control"
          placeholder="Nhập mô tả..."
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Giá</label>
        <input
          type="number"
          {...register("price", { required: "Giá không được bỏ trống", min: { value: 1, message: "Giá phải lớn hơn 0" } })}
          className="form-control"
        />
        {errors.price && <span className="text-danger">{errors.price.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ảnh (URL)</label>
        <input {...register("image")} className="form-control" placeholder="https://..." />
      </div>

      <button type="submit" className="btn btn-primary">Lưu</button>
    </form>
  );
}
