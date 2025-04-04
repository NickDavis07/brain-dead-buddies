// Define or import the ChecklistItem type
type ChecklistItem = {
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
};

export const sortChecklistItems = (items: ChecklistItem[]) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return items.slice().sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }
      return priorityOrder[a.priority as 'High' | 'Medium' | 'Low'] - priorityOrder[b.priority as 'High' | 'Medium' | 'Low'];
    });
  };