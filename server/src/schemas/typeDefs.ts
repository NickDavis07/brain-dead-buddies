const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    survivalTips: [SurvivalTip]
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
  
  type TipOfTheDay {
    _id: ID
    text: String
    author: String
    category: String
    date: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type ChecklistItem {
    id: ID
    text: String
    completed: Boolean
    userId: String
    priority: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    _id: ID!
    title: String!
    bodyText: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    categories: [Category]
  }

  type Category {
    _id: ID!
    name: String!
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  input SurvivalTipInput {
    tipText: String!
    tipAuthor: String!
    category: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input PostInput {
    title: String!
    bodyText: String!
    userId: ID!
  }

  input CategoryInput {
    name: String!
  }

  type Query {
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    categories: [Category]!
    category(categoryId: ID!): Category
    posts: [Post]!
    post(postId: ID!): Post
    users: [User]
    user(username: String!): User
    survivalTips: [SurvivalTip]!
    survivalTip(survivalTipId: ID!): SurvivalTip
    survivalTipsByCategory(category: String!): [SurvivalTip]
    me: User
    checklist: [ChecklistItem]
    tipOfTheDay: TipOfTheDay
    getAllPosts: [Post]
    fetchAllPosts: [Post]
    fetchPost(postId: ID!): Post
    fetchUserPosts(userId: ID!): [Post]
    fetchAllCategories: [Category]
    fetchCategory(categoryId: ID!): Category
    fetchPostsByCategory(categoryId: ID!): [Post]
  }

  type Mutation {
  addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addCategory(input: CategoryInput!): Category
    addPost(input: PostInput!): Post
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSurvivalTip(input: SurvivalTipInput!): SurvivalTip
    removeSurvivalTip(survivalTipId: ID!): SurvivalTip
    addChecklistItem(text: String!, priority: String!): ChecklistItem
    updateChecklistPriority(id: ID!, priority: String!): ChecklistItem
    toggleChecklistItem(id: ID!, completed: Boolean!): ChecklistItem
    deleteChecklistItem(id: ID!): ChecklistItem
    modifyPost(postId: ID!, title: String, bodyText: String): Post
    removePost(postId: ID!): Post
    removeCategory(categoryId: ID!): Category
    removeUser(userId: ID!): User
    modifyCategory(categoryId: ID!, name: String!): Category
    assignCategoryToPost(postId: ID!, categoryId: ID!): Post
    unassignCategoryFromPost(postId: ID!, categoryId: ID!): Post
  }
`;

export default typeDefs;