import { useState } from 'react';

interface AddChecklistItemFormProps {
  onAddItem: (text: string, priority: string) => void;
}

const AddChecklistItemForm: React.FC<AddChecklistItemFormProps> = ({ onAddItem }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddItem(text, priority);
    setText('');
    setPriority('Low');
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new item"
        className="bg-gray-800 text-white border border-gray-700 p-2 mr-2 rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 p-2 mr-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600">
        Add
      </button>
    </div>
  );
};

export default AddChecklistItemForm;