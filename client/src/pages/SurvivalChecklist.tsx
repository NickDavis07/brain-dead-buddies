import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const SurvivalChecklist = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: 'Understand GraphQL basics', completed: false },
    { id: 2, text: 'Learn React Router', completed: false },
    { id: 3, text: 'Master Apollo Client', completed: false },
    { id: 4, text: 'Implement JWT Authentication', completed: false },
  ]);

  useEffect(() => {
    // Check if the user is logged in
    if (Auth.loggedIn()) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  const toggleComplete = (id: number) => {
    const updatedChecklist = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Survival Checklist</h1>
      <ul className="space-y-4">
        {checklist.map((item) => (
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
              onClick={() => toggleComplete(item.id)}
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
    </div>
  );
};

export default SurvivalChecklist;