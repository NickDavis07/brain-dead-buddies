import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_CHECKLIST, ADD_CHECKLIST_ITEM, TOGGLE_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM } from '../utils/queries';

// Define the structure of a checklist item
interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const SurvivalChecklist = () => {
  // State to manage the text of a new checklist item
  const [newItemText, setNewItemText] = useState('');

  // Fetch the checklist data and provide a refetch function
  const { loading, data, refetch } = useQuery(QUERY_CHECKLIST);

  // Mutation to add a new checklist item
  const [addChecklistItem] = useMutation(ADD_CHECKLIST_ITEM);

  // Mutation to toggle the completion status of a checklist item
  const [toggleChecklistItem] = useMutation(TOGGLE_CHECKLIST_ITEM);

  // Mutation to delete a checklist item
  const [deleteChecklistItem] = useMutation(DELETE_CHECKLIST_ITEM);

  // Extract the checklist data or default to an empty array
  const checklist = data?.checklist || [];

  // Redirect to login page if the user is not authenticated
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Handle adding a new checklist item
  const handleAddItem = async () => {
    if (!newItemText.trim()) return; // Prevent adding empty items

    try {
      await addChecklistItem({
        variables: { text: newItemText }, // Pass the new item text as a variable
      });
      setNewItemText(''); // Clear the input field
      refetch(); // Refresh the checklist data
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  // Handle toggling the completion status of a checklist item
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleChecklistItem({
        variables: { id, completed: !completed }, // Toggle the completed status
      });
      refetch(); // Refresh the checklist data
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  // Handle deleting a checklist item
  const handleDeleteItem = async (id: string) => {
    try {
      await deleteChecklistItem({
        variables: { id }, // Pass the item ID as a variable
      });
      refetch(); // Refresh the checklist data
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-center mb-6">Survival Checklist</h1>

      {/* Input field and button to add a new checklist item */}
      <div className="mb-4">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)} // Update state on input change
          placeholder="Add a new item"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddItem} // Trigger add item handler
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Display loading state or the checklist items */}
      {loading ? (
        <div>Loading...</div> // Show loading indicator
      ) : (
        <ul className="space-y-4">
          {checklist.map((item: ChecklistItem) => (
            <li
              key={item.id} // Unique key for each item
              className={`flex items-center justify-between p-4 border rounded-lg ${
                item.completed ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'
              }`}
            >
              {/* Display item text with conditional styling */}
              <span
                className={`text-lg ${
                  item.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {item.text}
              </span>
              <div className="flex space-x-2">
                {/* Button to toggle completion status */}
                <button
                  onClick={() => handleToggleComplete(item.id, item.completed)} // Trigger toggle handler
                  className={`px-4 py-2 rounded ${
                    item.completed
                      ? 'bg-red-500 text-white hover:bg-red-600' // Styling for completed items
                      : 'bg-blue-500 text-white hover:bg-blue-600' // Styling for incomplete items
                  }`}
                >
                  {item.completed ? 'Undo' : 'Complete'} {/* Button label */}
                </button>
                {/* Button to delete the item */}
                <button
                  onClick={() => handleDeleteItem(item.id)} // Trigger delete handler
                  className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurvivalChecklist; // Export the component