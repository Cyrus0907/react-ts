import React,{ useState} from "react";
interface ButtonProps {
    text:string;
    onClick?: () => void;
    type?:"button" |"submit" | "reset";
    color?:string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text,onClick,  type = "button", color, className }) => {
const colors = ["#ffff", "#e12","#00fffb","#3be35a","#f79b2a"]

//useState lưu màu hiện tại
const [backgroundColor, setBackgroundColor] = useState<string>(
  color || colors[Math.floor(Math.random() * colors.length)]
);

const handleClick = ()=>{
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  setBackgroundColor(newColor);
  if (onClick) onClick(); // gọi thêm onClick từ App.tsx
    
};
return(
  <button
  type={type}
  onClick={handleClick}
  style={{backgroundColor}}
  className={`px-4 py-2 rounded-lg text-white hover:opacity-80 transition ${className}`}
  >
  {text}

  </button>
)

};
export default Button;
