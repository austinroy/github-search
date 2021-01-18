import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import UserList from "./UserList";
import { useLazyQuery, gql } from "@apollo/client";

const SEARCH_USER = gql`
  query searchUser($username: String!) {
    search(type: USER, query: $username, first: 5) {
      edges {
        node {
          ... on User {
            name
            avatarUrl
            url
            bio
            repositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const SearchUser = () => {
  const { Search } = Input;
  const [username, setUserName] = useState("");

  const [fetchUser, { loading, error, data }] = useLazyQuery(SEARCH_USER, {
    variables: {
      username,
    },
  });

  const users = data?.search?.edges || []

  useEffect(() => {
    console.log(users);
  }, [users]);

  const onSearch = (value) => { 
    setUserName(value);
    fetchUser(username)
  };

  return (
    <div>
      Search Github users
      <Search onSearch={onSearch} enterButton size="large" />
      <br />
      {users && <UserList users={users}/>}
      {loading && <Spin size='large'/>}
      {error && <div>Error Loading Data</div>}
    </div>
  );
};

export default SearchUser;
