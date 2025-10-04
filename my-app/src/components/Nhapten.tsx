// import { useState } from "react";

// function Name(){

//     const [name,setName] = useState("");
//     return(
//         <div>
//             <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
//             <h2>Xin chào, {name}</h2>
//         </div>
        
//     )
// }
// export default Name;
import { useEffect, useState } from "react";

function Name(){

    const [name,setName] = useState("");
    useEffect(()=>{
        console.log("Tên vừa thay đổi");
        document.title = name ? `Xin chào, ${name}`: "Nhập tên của bạn";

    },[name]);
    return(
        <div>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <h2>Xin chào,{name}</h2>
        </div>
        
    )
}
export default Name;