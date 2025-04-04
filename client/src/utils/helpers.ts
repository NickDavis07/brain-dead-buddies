import type { ChecklistItem } from '../interfaces/ChecklistItemInterface';

export const sortChecklistItems = (items: ChecklistItem[]) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return items.slice().sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed); // Uncompleted items first
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority]; // Sort by priority
  });
};