import React from 'react'
import { List, Avatar } from 'antd';


const UserList = ({users}) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.node.avatarUrl} />}
                title={<a href={item.node.htmlUrl}>{item.node.name}</a>}
                />
            </List.Item>
            )}
        />
    )
}

export default UserList