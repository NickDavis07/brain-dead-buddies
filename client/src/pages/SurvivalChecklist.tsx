import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_CHECKLIST, ADD_CHECKLIST_ITEM, TOGGLE_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_PRIORITY } from '../utils/queries';
import AddChecklistItemForm from '../components/AddChecklistItemForm';
import ChecklistItem from '../components/ChecklistItem';
import { sortChecklistItems } from '../utils/helpers';
import type { ChecklistItem as ChecklistItemType } from '../interfaces/ChecklistItemInterface';

const SurvivalChecklist = () => {
  const { loading, data, refetch } = useQuery<{ checklist: ChecklistItemType[] }>(QUERY_CHECKLIST);
  const [addChecklistItem] = useMutation(ADD_CHECKLIST_ITEM);
  const [toggleChecklistItem] = useMutation(TOGGLE_CHECKLIST_ITEM);
  const [deleteChecklistItem] = useMutation(DELETE_CHECKLIST_ITEM);
  const [updateChecklistPriority] = useMutation(UPDATE_CHECKLIST_PRIORITY);

  const checklist = data?.checklist || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const handleAddItem = useCallback(
    async (text: string, priority: string) => {
      try {
        await addChecklistItem({ variables: { text, priority } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    },
    [addChecklistItem, refetch]
  );

  const handleToggleComplete = useCallback(
    async (id: string, completed: boolean) => {
      try {
        await toggleChecklistItem({ variables: { id, completed: !completed } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    },
    [toggleChecklistItem, refetch]
  );

  const handleDeleteItem = useCallback(
    async (id: string) => {
      try {
        await deleteChecklistItem({ variables: { id } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    },
    [deleteChecklistItem, refetch]
  );

  const handleUpdatePriority = useCallback(
    async (id: string, priority: string) => {
      try {
        await updateChecklistPriority({ variables: { id, priority } });
        refetch();
      } catch (err) {
        console.error(err);
      }
    },
    [updateChecklistPriority, refetch]
  );

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: '800px' }}>
  <div style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '15px',
      border: '2px solid #3d9a40'
    }}>
    <div className=" text-light p-3 bg-gray-900" style={{ 
      borderTopLeftRadius: '13px', 
      borderTopRightRadius: '13px',
     
    }}>
      <h1 className="text-2xl font-bold text-center text-red-600" 
          style={{ textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}>
        Zombie Survival Checklist
      </h1>
    </div>
    
    <div className="p-4" style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderBottomLeftRadius: '13px', 
      borderBottomRightRadius: '13px'
    }}>
      <AddChecklistItemForm onAddItem={handleAddItem} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {sortChecklistItems(checklist).map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteItem}
              onUpdatePriority={handleUpdatePriority}
            />
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
  );
};

export default SurvivalChecklist;