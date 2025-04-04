const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    survivalTips: [SurvivalTip]!
    blogPosts: [BlogPost]!
    dateJoined: String
    role: String
  }

  type SurvivalTip {
    _id: ID
    tipText: String
    tipAuthor: String
    category: String
    createdAt: String
    comments: [Comment]!
  }

  type BlogPost {
    _id: ID!
    title: String!
    content: String!
    categories: [Category]
    user: User!
    createdAt: String!
    updatedAt: String
    comments: [Comment]!
  }

  type Category {
    _id: ID!
    name: String!
  }

  type TipOfTheDay {
    _id: ID
    text: String
    author: String
    category: String
    date: String
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    author: User
  }

  type ChecklistItem {
    id: ID
    text: String
    completed: Boolean
    userId: String
    priority: String
  }

  input SurvivalTipInput {
    tipText: String!
    tipAuthor: String!
    category: String!
  }

  input BlogPostInput {
    title: String!
    content: String!
    categoryIds: [ID]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    survivalTips: [SurvivalTip]!
    survivalTip(survivalTipId: ID!): SurvivalTip
    survivalTipsByCategory(category: String!): [SurvivalTip]
    blogPosts: [BlogPost]!
    blogPost(blogPostId: ID!): BlogPost
    getAllPosts: [BlogPost]!
    me: User
    checklist: [ChecklistItem]
    tipOfTheDay: TipOfTheDay
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSurvivalTip(input: SurvivalTipInput!): SurvivalTip
    addComment(survivalTipId: ID!, commentText: String!): SurvivalTip
    createBlogPost(input: BlogPostInput!): BlogPost
    createPost(title: String!, content: String!): BlogPost
    addBlogComment(blogPostId: ID!, commentText: String!): BlogPost
    removeSurvivalTip(survivalTipId: ID!): SurvivalTip
    removeComment(survivalTipId: ID!, commentId: ID!): SurvivalTip
    removeBlogPost(blogPostId: ID!): BlogPost
    removeBlogComment(blogPostId: ID!, commentId: ID!): BlogPost
    addChecklistItem(text: String!, priority: String!): ChecklistItem
    updateChecklistPriority(id: ID!, priority: String!): ChecklistItem
    toggleChecklistItem(id: ID!, completed: Boolean!): ChecklistItem
    deleteChecklistItem(id: ID!): ChecklistItem
  }
`;

export default typeDefs;