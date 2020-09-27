export type ChatRoom = {
  label: string
  name: string
}

export type ChatMessages = { [chatRoomName: string]: Message[] }

export type BasicMessage = {
  username: string
  message: string
  uuid: string
}

export interface OutgoingMessage extends BasicMessage {
  chatRoom: ChatRoom
}

export interface Message extends BasicMessage {
  serverTimestamp: string
}

export type ApiErrorData = {
  message: string
  status?: number
  errors?: string[]
}

export type IncomingMessage = {
  data: Message | null
  error: ApiErrorData | null
}

export type OutgoingUserInfo = {
  username: string
  avatar: string
  currentRoom: ChatRoom
}

export type UserInfo = {
  username: string
  avatar: string
}

export type UsersPerRoom = {
  [chatRoomName: string]: UserInfo[]
}

export type PresenceData = {
  usersPerRoom: UsersPerRoom
  serverTimestamp: string
}

export type IncomingPresenceInfo = {
  data: PresenceData | null
  error: ApiErrorData | null
}
