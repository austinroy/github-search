import React from 'react'
import { List, Avatar } from 'antd';
import { StarTwoTone, EnvironmentTwoTone } from '@ant-design/icons';
  


const UserList = ({users}) => {
    return (
        <List
            itemLayout="horizontal"
            className="user-list"
            dataSource={users}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.node.avatarUrl} size='large'/>}
                title={<a href={item.node.url}>{item.node.name}</a>}
                description={item.node.bio}
                className='meta'
                />
                <br/>           
                <StarTwoTone /> { item.node.starredRepositories.totalCount}
                <br />
                Followers: { item.node.followers.totalCount}
                <br />
                Following: { item.node.following.totalCount}
                <br />
                <EnvironmentTwoTone /> { item.node.location}
            </List.Item>
            )}
        />
    )
}

export default UserList