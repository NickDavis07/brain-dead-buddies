// filepath: client/src/interfaces/ChecklistItem.tsx
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}