import React from "react";
import { Query } from "react-apollo";
import {queryUsers} from 'graphql/User';

interface IProps {}

const UserList:React.FC = (props: IProps) => (
  <Query query={queryUsers}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.users.map(({ email, firstName, lastName }) => (
        <p>Email: {email}, Name: {firstName} {lastName}</p>
      ));
    }}
  </Query>
)

export default UserList
