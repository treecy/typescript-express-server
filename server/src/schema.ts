import { merge } from 'lodash';
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { typeDefs as User, resolvers as userResolvers } from 'modules/user';
import { typeDefs as Post, resolvers as postResolvers } from 'modules/posts';

const rootSchema = gql`
  type Query {
      # type fields can't be empty
      _empty: String
  }
  
  type Mutation {
      _empty: String
  }
`;

const typeDefs = [
  rootSchema,
  User,
  Post,
];

const resolvers = merge(
  userResolvers,
  postResolvers,
);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
