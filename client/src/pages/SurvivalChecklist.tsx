import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_CHECKLIST, ADD_CHECKLIST_ITEM, TOGGLE_CHECKLIST_ITEM } from '../utils/queries';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const SurvivalChecklist = () => {
  const [newItemText, setNewItemText] = useState('');
  const { loading, data, refetch } = useQuery(QUERY_CHECKLIST);
  const [addChecklistItem] = useMutation(ADD_CHECKLIST_ITEM);
  const [toggleChecklistItem] = useMutation(TOGGLE_CHECKLIST_ITEM);

  const checklist = data?.checklist || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const handleAddItem = async () => {
    if (!newItemText.trim()) return;

    try {
      await addChecklistItem({
        variables: { text: newItemText },
      });
      setNewItemText('');
      refetch(); // Refresh the checklist after adding a new item
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleChecklistItem({
        variables: { id, completed: !completed },
      });
      refetch(); // Refresh the checklist after toggling completion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Survival Checklist</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new item"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {checklist.map((item: ChecklistItem) => (
            <li
              key={item.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                item.completed ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'
              }`}
            >
              <span
                className={`text-lg ${
                  item.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {item.text}
              </span>
              <button
                onClick={() => handleToggleComplete(item.id, item.completed)}
                className={`px-4 py-2 rounded ${
                  item.completed
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {item.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurvivalChecklist;