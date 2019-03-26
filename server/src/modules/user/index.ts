import { gql } from 'apollo-server-express';
import { find } from 'mongo/user';

export const typeDefs = gql`
  input UserInput {
      email: String!
      firstName: String!
      lastName: String!
  }

  type User {
      id: String
      email: String
      firstName: String
      lastName: String
  }

  extend type Query {
      users: [User]
  }
  
  extend type Mutation {
      addUsers(users: [UserInput]): Boolean
  }
`;

export const resolvers = {
  Query: {
    users: () => find(),
  },

  Mutation: {
    addUsers(root, data) {
      console.log(data.users[0].email);
      return true;
    },
  },
};
