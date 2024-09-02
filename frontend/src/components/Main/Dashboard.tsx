import React, { useState } from 'react';
import { useItems } from '../../context/Item/ItemContext';

const Dashboard: React.FC = () => {
  const { items, addItem, editItem, deleteItem } = useItems();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAddOrEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      // Edit item
      await editItem(editId, editName, editDescription);
      setEditId(null);
      setEditName('');
      setEditDescription('');
    } else {
      // Add new item
      await addItem(name, description);
      setName('');
      setDescription('');
    }
  };

  const startEditing = (id: string, currentName: string, currentDescription: string) => {
    setEditId(id);
    setEditName(currentName);
    setEditDescription(currentDescription);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditName('');
    setEditDescription('');
  };

  return (
    <div className="px-12 pt-12 mt-12">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <form onSubmit={handleAddOrEditItem} className="max-w-sm mb-2">
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
            <input
              type="text"
              value={editId ? editName : name}
              onChange={(e) => (editId ? setEditName(e.target.value) : setName(e.target.value))}
              name="name"
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
        </div>
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
            <input
              type="text"
              value={editId ? editDescription : description}
              onChange={(e) =>
                editId ? setEditDescription(e.target.value) : setDescription(e.target.value)
              }
              name="description"
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {editId ? 'Update Item' : 'Add Item'}
        </button>
        {editId && (
          <button onClick={cancelEditing} className="bg-red-500 text-white p-2 rounded ml-2">
            Cancel
          </button>
        )}
      </form>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                  Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                  Item Description
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
            </tr>
          </thead>
          <tbody className="items-list">
            {items.map((item) => (
            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
              <td className="px-6 py-4">
                {item.description}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => startEditing(item._id, item.name, item.description)}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="delete-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;