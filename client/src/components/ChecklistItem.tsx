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
      className={`flex flex-col sm:flex-row items-center justify-between p-2 border rounded-lg ${
        item.completed ? 'bg-green-800 border-green-700' : 'bg-gray-800 border-gray-700'
      }`}
    >
      <span className={`text-lg mb-3 sm:mb-0 ${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
        {item.text}
      </span>
      <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
        {/* Priority Dropdown */}
        <select
          value={item.priority}
          onChange={(e) => onUpdatePriority(item.id, e.target.value)}
          className={`px-4 py-2 text-sm sm:text-base rounded border border-gray-700 text-white ${
            item.priority === 'Low'
              ? 'bg-yellow-600'
              : item.priority === 'Medium'
              ? 'bg-orange-600'
              : 'bg-red-600'
          }`}
        >
          <option value="Low" className="bg-gray-800 text-white">
            Low
          </option>
          <option value="Medium" className="bg-gray-800 text-white">
            Medium
          </option>
          <option value="High" className="bg-gray-800 text-white">
            High
          </option>
        </select>

        {/* Complete/Undo Button */}
        <button
          onClick={() => onToggleComplete(item.id, item.completed)}
          className={`px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded ${
            item.completed ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {item.completed ? 'Undo' : 'Complete'}
        </button>
        {/* Delete Button */}
        <button
          onClick={() => onDelete(item.id)}
          className="px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded bg-purple-800 text-white hover:bg-purple-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ChecklistItem;