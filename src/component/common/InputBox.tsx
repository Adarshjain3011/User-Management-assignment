
import React from 'react'

interface props {

    type: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,


}

const InputBox = ({type,name,value,onChange,placeholder}:props) => {
    return (
        <div>

            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">{placeholder}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="min-w-48 md:min-w-64 max-w-72 pl-3  py-2 border bg-slate-600 text-white border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
    )
}

export default InputBox;



