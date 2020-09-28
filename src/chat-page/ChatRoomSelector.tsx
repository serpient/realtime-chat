import React from 'react'
import { ChatRoom, UsersPerRoom, UserInfo } from '../data/types'
import './ChatRoomSelector.scss'

export const ChatRoomSelector = ({
  username,
  avatar,
  chatRooms,
  currentChatRoom,
  setCurrentChatRoom,
  presenceInfo,
  style
}: {
  username: string
  avatar: string
  chatRooms: ChatRoom[]
  currentChatRoom: ChatRoom | undefined
  setCurrentChatRoom: Function
  presenceInfo: UsersPerRoom
  style: object
}): JSX.Element => {
  return (
    <aside style={style} className="chat-room-selector--container">
      <React.Fragment>
        <span>
          <img src={avatar} alt={`${username}'s avatar`} />
          <h1>Hi {username}!</h1>
        </span>
        {chatRooms.map((room: ChatRoom) => (
          <nav
            tabIndex={0}
            className={`chat-room ${
              currentChatRoom && currentChatRoom.name === room.name ? 'chat-room--active' : ''
            } `}
            onClick={() => setCurrentChatRoom(room)}
            key={room.name}
          >
            {room.label}
            <ActiveUsersList
              presenceInfoForRoom={presenceInfo[room.name]}
              curentUsername={username}
            />
          </nav>
        ))}
      </React.Fragment>
    </aside>
  )
}

export const ActiveUsersList = ({
  presenceInfoForRoom,
  curentUsername
}: {
  presenceInfoForRoom: UserInfo[]
  curentUsername: string
}): JSX.Element => {
  return (
    <ul className="active-users">
      {presenceInfoForRoom &&
        presenceInfoForRoom.map((activeUser: UserInfo): any => {
          if (activeUser.username !== curentUsername) {
            return (
              <li key={`active_user_${activeUser.username}`} className="active-user">
                <img src={activeUser.avatar} alt={activeUser.username} />
                <h5>{activeUser.username}</h5>
              </li>
            )
          }
          return null
        })}
    </ul>
  )
}
