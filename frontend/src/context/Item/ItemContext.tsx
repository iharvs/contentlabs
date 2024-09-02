import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

interface Item {
  _id: string;
  name: string;
  description: string;
}

interface ItemContextType {
  items: Item[];
  addItem: (name: string, description: string) => Promise<void>;
  editItem: (id: string, name: string, description: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`, {
          headers: { 'x-auth-token': token },
        });
        setItems(response.data);
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully fetched!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
          timerProgressBar: true, // Optional: shows a progress bar during the timer
        });
      } catch (error) {
        // Extracting the error message from the axios error object
        let errorMessage = 'An unexpected error occurred';
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
          timerProgressBar: true, // Optional: shows a progress bar during the timer
        });
        console.error('Login error', error);
      }
    };
    fetchItems();
  }, [token]);

  const addItem = async (name: string, description: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/items`,
        { name, description },
        { headers: { 'x-auth-token': token } }
      );
      setItems((prevItems) => [...prevItems, response.data]);
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully added!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
    } catch (error) {
      // Extracting the error message from the axios error object
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      console.error('Login error', error);
    }
  };

  const editItem = async (id: string, name: string, description: string) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/items/${id}`,
        { name, description },
        { headers: { 'x-auth-token': token } }
      );
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? response.data : item))
      );
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully modified!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
    } catch (error) {
      // Extracting the error message from the axios error object
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      console.error('Login error', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/items/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully deleted!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
    } catch (error) {
      // Extracting the error message from the axios error object
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Optional: shows a progress bar during the timer
      });
      console.error('Login error', error);
    }
  };

  return (
    <ItemContext.Provider value={{ items, addItem, editItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};