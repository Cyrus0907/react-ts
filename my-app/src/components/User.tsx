import { useEffect, useState } from "react";
import axios from "axios";
interface User{
        id:number;
        name:string;
        username:string;
        email:string;
        address: {
            street:string;
            city:string;
        }
        company: {
            name:string;
        }
    }
function Users(){
    // Call API trong useEffect lay danh sach users về https://jsonplaceholder.typicode.com/users,
// Click user thì nó show user detail nó ra
//b1; phân tích đề:-lấy danh sách users-click 1 user->hiển thị chi tiết user đó
// biến lưu danh sách ng dùng, biến lưu ng dùng đc chọn
    
    const[users, setUsers] = useState<User[]>([]);
    const[selectedUser, setSelectedUser] = useState<User | null>(null);  //--User | null bđ k ai đc chọn
    useEffect(()=>{
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Lỗi tải danh sách:",err));

            
        },[]);
    
    
    const handleUserClick = (id:number)=>{
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => setSelectedUser(res.data))
            .catch((err)=>console.error("Lỗi tải chi tiết :",err));
            
    };

    return(
        <div>
            <h2>Danh sách người dùng</h2>
            <ul className="list-users mt3">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="list-users-item"
                        onClick={()=> handleUserClick(user.id)}
                        style={{cursor:"pointer"}}
                    >
                        {user.name}
                    </li>
                ))}
            </ul>
            {/* Hiển thị chi tiết users */}
            {selectedUser && (
                <div className="card mt-4 p-3 shadow-sm">
                    <h2>Chi tiết người dùng</h2>
                    <p><strong>Tên:</strong>{selectedUser.name}</p>
                    <p><strong>Username:</strong>{selectedUser.username}</p>
                    <p><strong>Email:</strong>{selectedUser.email}</p>
                    <p><strong>Địa chỉ:</strong>{selectedUser.address.street}, {selectedUser.address.city}</p>
                    <p><strong>Công ty:</strong>{selectedUser.company.name}</p>
                </div>
            )}
        </div>
    );
}
export default Users;