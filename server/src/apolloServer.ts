import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql';

export default new ApolloServer({ typeDefs, resolvers });
