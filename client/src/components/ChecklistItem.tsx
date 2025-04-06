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
          className={`px-4 py-2 text-sm sm:text-base rounded border border-gray-700 text-white`}
          style={{
            backgroundColor: item.priority === 'Low' 
              ? '#fdc500' 
              : item.priority === 'Medium'
              ? '#fd8c00'
              : '#dc0000'
          }}
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
        {/* Spacer for better alignment on small screens */}
        <div className="h-1 sm:h-0"></div>
        {/* Complete/Undo Button */}
        <button
  onClick={() => onToggleComplete(item.id, item.completed)}
  className={`px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded flex items-center justify-center ${
    item.completed ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-green-600 text-white hover:bg-green-700'
  }`}
  title={item.completed ? "Undo" : "Complete"}
>
  {item.completed ? (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="mr-1"
      >
        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Undo
    </>
  ) : (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="mr-1"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Complete
    </>
  )}
</button>
        {/* Spacer for consistent spacing */}
        <div className="h-1 sm:h-0"></div>
        {/* Delete Button with Trash Icon */}
        <button
  onClick={() => onDelete(item.id)}
  className="px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded bg-purple-800 text-white hover:bg-purple-700"
  aria-label="Delete"
  title="Delete"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
</button>
      </div>
    </li>
  );
};

export default ChecklistItem;