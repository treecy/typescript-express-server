import gql from 'graphql-tag';

export const queryUsers = gql`
query {
  users {
    email
    firstName
    lastName
  }
}
`;
