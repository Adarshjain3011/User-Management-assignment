import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './component/common/Navbar';
import { AlertDialogDemo } from './component/common/DialogBox';
import UserForm from './component/common/Form';
import toast from 'react-hot-toast';
import TableColumn from './component/common/TableColumn';

import { tableColumnData } from './utils/data';

import TableData from './component/common/TableData';

import Loader from './component/common/Loader';

interface User {

    id: number;
    name: string;
    email: string;
    phone: string;
}

const HomePage: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [loading,setLoading] = useState(false);

    // Delete user handler function 

    async function deleteUserHandler(id: number) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); // call for deleting the user 

            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id)); // after deleting update the users data 

            toast.success("User deleted successfully")

        } catch (error: any) {

            toast.error("Error deleting user", error.message);
        }
    }

    // Update user data
    async function updateUserData({ id, name, email, phone }: User) {
        try {


            const updatedUser = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
                name,
                email,
                phone,

            }); 

            console.log("update user ",updatedUser)
            
            // call for update the user 

            const updatedData = updatedUser?.data || (updatedUser?.data)?.data;

            console.log("update data ",updatedData)

            // now we have the update the updated user data in our users state 

            setUsers((prevUsers) =>
                prevUsers.map(user =>
                    user.id === id ? { ...user, ...updatedData  } : user
                )
            );

            console.log("update user handler ",users);

            toast.success("User updated successfully")

        } catch (error: any) {

            console.error("Error updating user:", error);
            toast.error("Error updating user", error.message);

        }
    }

    // Create a new user

    async function createUserHandler({ name, email, phone }: Partial<User>) {

        try {

            const newUser = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name,
                email,
                phone,
            });
            setUsers((prevUsers) => [...prevUsers, newUser.data]);
            console.log("New user created:", newUser.data);
            toast.success("User created successfully")

        } catch (error: any) {

            console.error("Error creating user:", error);

            toast.error("Error creating user", error.message);

        }
    }

    useEffect(() => {

        // Fetching users data  on page load

        const fetchUsers = async () => {

            setLoading(true);
            
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);

                setLoading(false);
            

            } catch (err: any) {

                toast.error("Error fetching users", err.message);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div className="mx-auto max-w-screen-2xl p-6">
            <Navbar />
            <div className="flex justify-between items-center mb-4 mt-14">
                {/* Create User Form */}
                <UserForm
                    text="Create New User"
                    formType="create"
                    userHandler={(id, name, email, phone) => {
                        createUserHandler({ name, email, phone });
                    }}
                />
            </div>

            <div className="overflow-x-auto">

                {
                    loading && (
                        <div className="flex justify-center items-center h-screen">
                            <Loader />
                        </div>
                    )
                }
                <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-blue-500">
                        <tr>

                            {

                                tableColumnData.map((columnData, index) => (

                                    <TableColumn text={columnData} key={index}></TableColumn>

                                ))
                            }

                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}
                            >

                                <TableData text={user.id} font='font-medium'></TableData>

                                <TableData text={user.name} font='font-medium'></TableData>

                                <TableData text={user.email}></TableData>
                                <TableData text={user.phone}></TableData>

                                <td className="py-4 px-4">
                                    <div className="flex justify-start gap-4 items-baseline">
                                        <AlertDialogDemo userName={user.name} processhandler={() => {
                                            deleteUserHandler(user.id);
                                        }} />
                                        <UserForm
                                            formType="update"
                                            userHandler={(id, name, email, phone) => {

                                                console.log("pika",user.id,user.name,user.email)

                                                updateUserData({ id, name, email, phone });
                                            }}
                                            id={user.id}
                                            name={user.name}
                                            email={user.email}
                                            phone={user.phone}
                                            text={`Edit User `}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default HomePage;
