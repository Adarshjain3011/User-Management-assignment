import React from 'react';

// Define the type for the props
interface ButtonProps {
  onClickHandler?: () => void; // onClickHandler is a function with no arguments 
  children: React.ReactNode;  // children 
  color:any
}

// Functional component using TypeScript
const Button: React.FC<ButtonProps> = ({ onClickHandler, children,color }) => {


  return (
    <button
      onClick={onClickHandler}
      className={`w-fit h-11 text-xs font-bold text-nowrap md:text-md px-9 ${color} text-white rounded-lg hover:${color}-600 transition duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;


