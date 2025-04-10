import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      dateJoined
      role
       survivalTips {
        _id
      }
    }
  }
`;

export const QUERY_ZOMBIEBLOGS = gql`
  query getZombieBlogs {
    zombieblogs {
      _id
      zombieblogText
      zombieblogAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_ZOMBIEBLOG = gql`
  query getSingleZombieBlog($zombieblogId: ID!) {
    zombieblog(zombieblogId: $zombieblogId) {
      _id
      zombieblogText
      zombieblogAuthor
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
      dateJoined
      role
       survivalTips {
        _id
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
      priority
    }
  }
`;

// Mutation to add a new checklist item 
export const ADD_CHECKLIST_ITEM = gql`
  mutation AddChecklistItem($text: String!, $priority: String!) {
    addChecklistItem(text: $text, priority: $priority) {
      id
      text
      completed
      priority
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

// Mutation to delete a checklist item
export const DELETE_CHECKLIST_ITEM = gql`
  mutation DeleteChecklistItem($id: ID!) {
    deleteChecklistItem(id: $id) {
      id
      text
      completed
    }
  }
`;

export const UPDATE_CHECKLIST_PRIORITY = gql`
  mutation UpdateChecklistPriority($id: ID!, $priority: String!) {
    updateChecklistPriority(id: $id, priority: $priority) {
      id
      text
      completed
      priority
    }
  }
`;

export const TIP_OF_THE_DAY = gql`
  query GetTipOfTheDay {
    tipOfTheDay {
      _id
      text
      author
      category
      date
    }
  }
`;

export const Query = gql`
  query Query {
  fetchAllPosts {
    title
    bodyText
  }
}
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      bodyText
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($title: String!, $bodyText: String!) {
    addPost(title: $title, bodyText: $bodyText) {
      title
      bodyText
    }
  }
`;
