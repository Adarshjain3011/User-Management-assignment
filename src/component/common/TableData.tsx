
import React from 'react';

interface props {

    text:string | number;
    font?:string
}

const TableData : React.FC<props> = ({text,font})=>{
  return (
    <td className={`py-4 px-4 text-gray-700 ${font ? font:"font-semibold"}`}>{text}</td>
  )
}

export default TableData
