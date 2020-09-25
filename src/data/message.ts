export type ChatRoom = {
  label: string
  name: string
}

export type ChatMessages = { [key: string]: Message[] }
export type ChatMessageIds = Set<string>

export type BasicMessage = {
  username: string
  message: string
  clientTimestamp: string
  uuid: string
}

export interface ToApiMessage extends BasicMessage {
  chatRoom: ChatRoom
}

export interface Message extends BasicMessage {
  serverTimestamp: string
}
