import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import InputBox from './InputBox';

interface UserProps {
  id?: number | string;
  name?: string; 
  email?: string; 
  phone?: string; 
  text: string; 
  formType: string;
  userHandler: (id: any, name: string, email: string, phone: string) => void;
}

const UserForm: React.FC<UserProps> = ({ name = "", email = "", phone = "", text, id, formType, userHandler }) => {
  const [userData, setUserData] = useState({ name, email, phone });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (formType === "create") {
        // Call userHandler for creating a new user
        userHandler(id || "", userData.name, userData.email, userData.phone);
      } else if (formType === "update") {
        // Call userHandler for updating an existing user
        userHandler(id, userData.name, userData.email, userData.phone);

      }

      setIsOpen(false); // Close the form modal
      setUserData({ name: '', email: '', phone: '' }); // Reset form data
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container flex flex-col p-6 max-w-md">
      {/* Button to trigger the form */}
      <div className="relative w-full flex justify-start items-start">
        <Button color="bg-blue-500" onClickHandler={() => setIsOpen(!isOpen)}>
          {text}
        </Button>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 mx-auto flex items-center justify-center bg-gray-500 bg-opacity-75 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="border flex flex-col justify-center items-center rounded-2xl bg-gray-400 p-8">

            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">{text}</h2>
            </div>
            <div className="mb-4">
              <InputBox
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={changeHandler}
                placeholder="Enter Your Name"
              />
            </div>

            <div className="mb-4">
              <InputBox
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={changeHandler}
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <InputBox
                type="tel"
                name="phone"
                value={userData.phone || ""}
                onChange={changeHandler}
                placeholder="Phone"
              />
            </div>

            <button type="submit" className="text-sm bg-blue-500 border text-white p-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserForm;
