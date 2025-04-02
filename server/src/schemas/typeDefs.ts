const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    survivalTips: [SurvivalTip]!
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
    me: User
    checklist: [ChecklistItem]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSurvivalTip(input: SurvivalTipInput!): SurvivalTip
    addComment(survivalTipId: ID!, commentText: String!): SurvivalTip
    removeSurvivalTip(survivalTipId: ID!): SurvivalTip
    removeComment(survivalTipId: ID!, commentId: ID!): SurvivalTip
    addChecklistItem(text: String!): ChecklistItem
    toggleChecklistItem(id: ID!, completed: Boolean!): ChecklistItem
  }
`;

export default typeDefs;