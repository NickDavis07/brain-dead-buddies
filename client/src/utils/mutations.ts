import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_ZOMBIEBLOG = gql`
  mutation AddZombieBlog($input: ZombieBlogInput!) {
    addZombieBlog(input: $input) {
      _id
      zombieblogText
      zombieblogAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($zombieblogId: ID!, $commentText: String!) {
    addComment(zombieblogId: $zombieblogId, commentText: $commentText) {
      _id
      zombieblogText
      zombieblogAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($input: PostInput!) {
    addPost(input: $input) {
      _id
      title
      bodyText
      user {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const MODIFY_POST = gql`
  mutation modifyPost($postId: ID!, $title: String, $bodyText: String) {
    modifyPost(postId: $postId, title: $title, bodyText: $bodyText) {
      _id
      title
      bodyText
      user {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      title
      bodyText
      user {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      _id
      name
      posts {
        _id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

export const MODIFY_CATEGORY = gql`
  mutation modifyCategory($categoryId: ID!, $name: String!) {
    modifyCategory(categoryId: $categoryId, name: $name) {
      _id
      name
      posts {
        _id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($categoryId: ID!) {
    removeCategory(categoryId: $categoryId) {
      _id
      name
      posts {
        _id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

export const ASSIGN_CATEGORY_TO_POST = gql`
  mutation assignCategoryToPost($postId: ID!, $categoryId: ID!) {
    assignCategoryToPost(postId: $postId, categoryId: $categoryId) {
      _id
      title
      bodyText
      user {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UNASSIGN_CATEGORY_FROM_POST = gql`
  mutation unassignCategoryFromPost($postId: ID!, $categoryId: ID!) {
    unassignCategoryFromPost(postId: $postId, categoryId: $categoryId) {
      _id
      title
      bodyText
      user {
        _id
        username
      }
      categories {
        _id
        name
      }
      createdAt
      updatedAt
    }
  }
`;