import React, { useEffect, useMemo, useState } from "react";
import { Input, Spin } from "antd";
import UserList from "./UserList";
import { useLazyQuery, gql } from "@apollo/client";

const SEARCH_USER = gql`
  query searchUser($username: String!) {
    search(type: USER, query: $username, first: 5 ) {
      edges {
        cursor
        node {
          ... on User {
            name
            avatarUrl
            url
            bio
            location
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
      userCount
    }
  }
`;

const SearchUser = () => {
  const { Search } = Input;
  const [username, setUserName] = useState("");

  const [fetchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USER, {
    variables: {
      username,
    },
  });

  const users = useMemo(() => data?.search?.edges || [], [data])

  useEffect(() => {
    console.log(users);
  }, [users]);

  const onSearch = (value) => { 
    setUserName(value);
    fetchUsers(username)
  };

  return (
    <div>
      Search Github users
      <Search onSearch={onSearch} enterButton size="large" />
      {data && <div>{data.search.userCount} Results</div>}
      <br />
      {data && <UserList users={users} fetchUsers={fetchUsers}/>}
      {loading && <Spin size='large' className="loading"/>}
      {error && <div classname="error">Error Loading Data</div>}
    </div>
  );
};

export default SearchUser;
