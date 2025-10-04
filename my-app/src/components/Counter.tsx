import { useState } from "react";

function Counter (){

    const [count, setCount] = useState<number>(0);
    return(
        <div style={{textAlign: "center"}}>
            <h2>Đếm số: {count}</h2>
            <button onClick={()=> setCount(count + 1)}> Tăng</button>
            <button onClick={()=> setCount(count - 1)}> Giảm</button>
        </div>
    )
}
export default Counter;