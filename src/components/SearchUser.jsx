import React, { useEffect, useMemo, useState } from "react";
import { Input, Spin, Button } from "antd";
import UserList from "./UserList";
import { useLazyQuery, gql } from "@apollo/client";

const SEARCH_USER = gql`
  query searchUser($username: String!, $startCursor: String, $endCursor: String) {
    search(type: USER, query: $username, first: 5, after: $startCursor, before: $endCursor ) {
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
        pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const SearchUser = () => {
  const { Search } = Input;
  const [username, setUserName] = useState("");
  const [cursors, setCursors ] = useState({
    startCursor: null,
    endCursor: null
  })

  const [fetchUsers, { loading, error, data }] = useLazyQuery(SEARCH_USER, {
    variables: {
      username,
      startCursor: cursors.startCursor || null,
      endCursor: cursors.endCursor || null
    },
  });

  const users = useMemo(() => data?.search?.edges || [], [data])

  const pageInfo = useMemo(() => ({
    startCursor : data?.search?.pageInfo.startCursor,
    endCursor : data?.search?.pageInfo?.endCursor,
    hasNextPage : data?.search?.pageInfo?.hasNextPage,
    hasPreviousPage : data?.search?.pageInfo?.hasPreviousPage
   })|| {} , [data])

  useEffect(() =>{
    console.log({cursors})
  },[cursors])

  const onSearch = (value) => { 
    setUserName(value);
    fetchUsers(username, cursors)
  };

  return (
    <div>
      <h1>Search Github Users</h1>
      <Search onSearch={onSearch} enterButton size="large" />
      {data && <div>{data.search.userCount} Results</div>}
      <br />
      {data && <UserList users={users} fetchUsers={fetchUsers}/>}
      {loading && <Spin size='large' className="loading"/>}
      {error && <div className="error">Error Loading Data</div>}
      {pageInfo?.hasPreviousPage && (<Button onClick={() => {setCursors({ startCursor: null, endCursor: pageInfo.startCursor })}}>Prev</Button> )}
      {' '}
      {pageInfo?.hasNextPage && (
      <Button onClick={() => {
        setCursors({ startCursor: pageInfo.endCursor, endCursor: null })

        }}>
          Next
      </Button> )}</div>);
};

export default SearchUser;
