// function Add() {
//   return (
//     <div>
//       <h1>Thêm mới</h1>
//       <form>
//         <div className="mb-3">
//           <label htmlFor="text" className="form-label">
//             Text
//           </label>
//           <input type="text" className="form-control" id="text" />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="radio" className="form-label">
//             Radio
//           </label>
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="flexCheck1"
//             />
//             <label className="form-check-label" htmlFor="flexCheck1">
//               checkbox 1
//             </label>
//           </div>
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="flexCheck2"
//             />
//             <label className="form-check-label" htmlFor="flexCheck2">
//               checkbox 2
//             </label>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="radio" className="form-label">
//             Checkbox
//           </label>
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="flexRadioDefault"
//               id="flexRadio1"
//             />
//             <label className="form-check-label" htmlFor="flexRadio1">
//               Checkbox 1
//             </label>
//           </div>
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="flexRadioDefault"
//               id="flexRadio2"
//             />
//             <label className="form-check-label" htmlFor="flexRadio2">
//               Checkbox 2
//             </label>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="selectOption" className="form-label">
//             Select - option
//           </label>
//           <select className="form-select">
//             <option value={1}>One</option>
//             <option value={2}>Two</option>
//             <option value={3}>Three</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Add;
import axios from "axios";
import ProductForm from "../pages/ProductForm";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface Product {
  id?: number;
  title: string;
  description?: string;
  image?: string;
}
export default function Add() {
  const navigate = useNavigate();
  const onSubmit = (data: Product) => {
        console.log(data);
        try {
          axios.post("http://localhost:3001/products", data);
          toast.success("Thêm sản phẩm thành công");
          navigate("/admin/list");
          
        } catch (error) {
          // alert("Thêm sản phẩm thất bại");
          toast.error("Thêm sản phẩm thất bại");
          console.error(error);
          
        }
  };
  return (
    <div>
      <h1 className="text-center mt-3">Thêm sản phẩm</h1>
      
      <ProductForm onSubmit={onSubmit} />
      
      
    </div>
  );
}