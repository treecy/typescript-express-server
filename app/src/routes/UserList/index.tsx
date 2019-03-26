import React from "react";
import { Query } from "react-apollo";
import {queryUsers} from 'graphql/User';

interface IProps {}

const UserList:React.FC = (props: IProps) => (
  <Query query={queryUsers}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <table>
          <thead>
            <th>Email</th>
            <th>Full Name</th>
          </thead>
          <tbody>
            {data.users.map(({ email, firstName, lastName }) => (
              <tr>
                <td>{email}</td>
                <td>{firstName} {lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }}
  </Query>
)

export default UserList
