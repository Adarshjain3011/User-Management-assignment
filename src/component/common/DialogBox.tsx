import { useState } from 'react';
import Button from './Button';

interface DialogButton {
    processhandler: () => void;
    userName: string;
}

export function AlertDialogDemo({ processhandler, userName }: DialogButton) {

    const [isOpen, setIsOpen] = useState(false); // perform toggling 

    const openDialog = () => setIsOpen(true); // set to true
    const closeDialog = () => setIsOpen(false); // set to false


    // processhandler is responsible for delete the specified user entry in the  users data 

    const handleClick = () => {

        processhandler(); 
        closeDialog(); // after deleting the user we close the dialog
        
    };

    return (
        <>
            {/* Trigger Button */}

            {/* so when we click on the delete button a dialog will open because it sets isOpen true  */}

            <Button color="bg-red-500 hover:bg-red-600 transition-colors duration-300" onClickHandler={openDialog}>
                Delete
            </Button>

            {/* Dialog */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 text-center">
                            <p className="text-lg font-semibold text-gray-900">
                                Are you sure you want to delete
                            </p>
                            <p className="mt-2 text-red-500 font-bold">
                                {userName}?
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
                            <Button 
                                onClickHandler={closeDialog} 
                                color="bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors duration-300 px-4 py-2 rounded-md">
                                Cancel
                            </Button>
                            
                            <Button 
                                onClickHandler={handleClick} 
                                color="bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 px-4 py-2 rounded-md">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
