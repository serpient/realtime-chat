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

export interface ApiErrorData {
  message: string
  status: number
  errors?: string[]
}

export interface IncomingMessage {
  data: Message | null
  error: ApiErrorData | null
}

export interface OutgoingUserInfo {
  username: string
  avatar: string
  currentRoom: ChatRoom
}

export interface UserInfo {
  username: string
  avatar: string
}

export interface UsersPerRoom {
  [chatRoomName: string]: UserInfo[]
}

export interface PresenceData {
  usersPerRoom: UsersPerRoom
  serverTimestamp: string
}

export interface IncomingPresenceInfo {
  data: PresenceData | null
  error: ApiErrorData | null
}
