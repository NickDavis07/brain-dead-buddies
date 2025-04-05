import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      content
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;