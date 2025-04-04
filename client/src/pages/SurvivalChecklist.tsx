import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_CHECKLIST, ADD_CHECKLIST_ITEM, TOGGLE_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_PRIORITY } from '../utils/queries';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
}

const SurvivalChecklist = () => {
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('Low');
  const { loading, data, refetch } = useQuery(QUERY_CHECKLIST);
  const [addChecklistItem] = useMutation(ADD_CHECKLIST_ITEM);
  const [toggleChecklistItem] = useMutation(TOGGLE_CHECKLIST_ITEM);
  const [deleteChecklistItem] = useMutation(DELETE_CHECKLIST_ITEM);
  const [updateChecklistPriority] = useMutation(UPDATE_CHECKLIST_PRIORITY);

  const checklist = data?.checklist || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const handleAddItem = async () => {
    if (!newItemText.trim()) return;

    try {
      await addChecklistItem({
        variables: { text: newItemText, priority: newItemPriority },
      });
      setNewItemText('');
      setNewItemPriority('Low');
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleChecklistItem({
        variables: { id, completed: !completed },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteChecklistItem({
        variables: { id },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePriority = async (id: string, priority: string) => {
    try {
      await updateChecklistPriority({
        variables: { id, priority },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      {/* Page title with shadow styling */}
      <h1
        className="text-3xl font-bold text-center mb-6 text-red-600"
        style={{
          textShadow:
            '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black',
        }}
      >
        Zombie Survival Checklist
      </h1>

      {/* Input section for adding new checklist items */}
      <div className="mb-4">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new item"
          className="bg-gray-800 text-white border border-gray-700 p-2 mr-2 rounded"
        />
        <select
          value={newItemPriority}
          onChange={(e) => setNewItemPriority(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 p-2 mr-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={handleAddItem}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Add
        </button>
      </div>

      {/* Checklist items display */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {checklist.map((item: ChecklistItem) => (
            <li
              key={item.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                item.completed
                  ? 'bg-red-800 border-red-700'
                  : 'bg-green-800 border-green-700'
              }`}
            >
              {/* Checklist item text with conditional styling */}
              <span
                className={`text-lg ${
                  item.completed ? 'line-through text-gray-400' : 'text-white'
                }`}
              >
                {item.text}
              </span>
              <div className="flex space-x-2">
                {/* Toggle completion button */}
                <button
                  onClick={() => handleToggleComplete(item.id, item.completed)}
                  className={`px-4 py-2 rounded ${
                    item.completed
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {item.completed ? 'Undo' : 'Complete'}
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="px-4 py-2 rounded bg-purple-800 text-white hover:bg-purple-700"
                >
                  Delete
                </button>
                {/* Priority dropdown */}
                <select
                  value={item.priority}
                  onChange={(e) => handleUpdatePriority(item.id, e.target.value)}
                  className={`px-4 py-2 rounded border border-gray-700 text-white ${
                    item.priority === 'Low'
                      ? 'bg-yellow-600'
                      : item.priority === 'Medium'
                      ? 'bg-orange-600'
                      : 'bg-red-600'
                  }`}
                >
                  <option value="Low" className="bg-gray-800 text-white">Low</option>
                  <option value="Medium" className="bg-gray-800 text-white">Medium</option>
                  <option value="High" className="bg-gray-800 text-white">High</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurvivalChecklist;