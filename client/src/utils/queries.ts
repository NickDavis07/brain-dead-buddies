import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

// Query to fetch the user's checklist
export const QUERY_CHECKLIST = gql`
  query GetChecklist {
    checklist {
      id
      text
      completed
    }
  }
`;

// Mutation to add a new checklist item 
export const ADD_CHECKLIST_ITEM = gql`
  mutation AddChecklistItem($text: String!) {
    addChecklistItem(text: $text) {
      id
      text
      completed
    }
  }
`;

// Mutation to toggle the completion status of a checklist item
export const TOGGLE_CHECKLIST_ITEM = gql`
  mutation ToggleChecklistItem($id: ID!, $completed: Boolean!) {
    toggleChecklistItem(id: $id, completed: $completed) {
      id
      text
      completed
    }
  }
`;
