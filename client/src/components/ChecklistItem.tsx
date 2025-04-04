import type { ChecklistItem } from '../interfaces/ChecklistItemInterface.tsx';

interface ChecklistItemProps {
  item: ChecklistItem;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggleComplete, onDelete, onUpdatePriority }) => {
  return (
    <li
      className={`flex items-center justify-between p-4 border rounded-lg ${
        item.completed ? 'bg-red-800 border-red-700' : 'bg-green-800 border-green-700'
      }`}
    >
      <span className={`text-lg ${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>{item.text}</span>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggleComplete(item.id, item.completed)}
          className={`px-4 py-2 rounded ${item.completed ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          {item.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(item.id)} className="px-4 py-2 rounded bg-purple-800 text-white hover:bg-purple-700">
          Delete
        </button>
        <select
          value={item.priority}
          onChange={(e) => onUpdatePriority(item.id, e.target.value)}
          className={`px-4 py-2 rounded border border-gray-700 text-white ${
            item.priority === 'Low' ? 'bg-yellow-600' : item.priority === 'Medium' ? 'bg-orange-600' : 'bg-red-600'
          }`}
        >
          <option value="Low" className="bg-gray-800 text-white">Low</option>
          <option value="Medium" className="bg-gray-800 text-white">Medium</option>
          <option value="High" className="bg-gray-800 text-white">High</option>
        </select>
      </div>
    </li>
  );
};

export default ChecklistItem;