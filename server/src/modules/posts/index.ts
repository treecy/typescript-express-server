import { gql } from 'apollo-server-express';
import { find } from 'mongo/post';

export const typeDefs = gql`
    input PostInput {
        title: String!
    }

    type Post {
        id: String
        title: String
        createdAt: String
        author: User
    }

    extend type Query {
        posts: [Post]
        postById(id: String!): Post
    }

    extend type Mutation {
        addPost(post: PostInput): Boolean
    }
`;

export const resolvers = {
  Query: {
    posts: () => find({}, ['author']),
  },

  Mutation: {
    addPost(root, data) {
      console.log(data.users.email);
      return true;
    },
  },
};
