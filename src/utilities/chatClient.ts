import {
  ChatRoom,
  OutgoingMessage,
  IncomingMessage,
  IncomingPresenceInfo,
  OutgoingUserInfo
} from '../data/types'
import io from 'socket.io-client'
import { events } from '../data/eventNames'
import { scrollToBottom } from './scrollToBottom'

export class ChatClient {
  public client: SocketIOClient.Socket
  public newMessageEventName: string
  public receivedMessageCount: number
  private chatMessageIds: Set<string>
  public clientName: string
  private setChatMessages: Function
  private setPresenceInfo: Function

  constructor({
    chatServiceEndpoint,
    newMessageEventName = events.NEW_MESSAGE,
    connectOptions = {},
    clientName,
    chatRooms,
    setChatMessages,
    setPresenceInfo
  }: {
    chatServiceEndpoint: string
    newMessageEventName?: string
    connectOptions?: object
    clientName: string
    chatRooms: ChatRoom[]
    setChatMessages: Function
    setPresenceInfo: Function
  }) {
    this.newMessageEventName = newMessageEventName
    this.clientName = clientName
    this.receivedMessageCount = 0
    this.chatMessageIds = new Set()
    this.setChatMessages = setChatMessages
    this.setPresenceInfo = setPresenceInfo
    this.client = io.connect(chatServiceEndpoint, connectOptions)
    this.setupListeners()
    this.setupChatRoomListeners(chatRooms)
    this.setupPresenceInfoListener()
  }

  private setupListeners = () => {
    this.client
      .on('connect_error', (err: any) => {
        console.log(err)
      })
      .on('error', (err: any) => {
        console.log(err)
      })
      .on('reconnect', (attemptNumber: any) => {
        console.log(attemptNumber)
      })
      .on('reconnect_error', (err: any) => {
        console.log(err)
      })
      .on('reconnect_error', (err: any) => {
        console.log(err)
      })
      .on('connect_timeout', (timeout: any) => {
        console.log(timeout)
      })
      .on('connect', () => {
        console.log(`${this.clientName} connected`)
      })
      .on('disconnect', () => {
        console.log(`${this.clientName} disconnected`)
      })
      .on(events.ERROR, (response: IncomingMessage | IncomingPresenceInfo) => {
        // TODO handle error
        console.log(response)
      })
  }

  public sendMessageToServer = (
    message: OutgoingMessage | OutgoingUserInfo,
    eventName?: string
  ): void => {
    console.log(`Sending message for ${this.clientName}`)
    this.client.emit(eventName || this.newMessageEventName, message)
  }

  private setupChatRoomListeners = (chatRooms: ChatRoom[]): void => {
    chatRooms.forEach((room: ChatRoom) => {
      this.client.on(room.name, (response: IncomingMessage) => {
        console.log(`Received mesasge for ${room.name}: ${JSON.stringify(response)}`)
        const { data } = response
        if (data && !this.chatMessageIds.has(data.uuid)) {
          this.setChatMessages((prevState: any) => {
            console.log(prevState)
            return {
              ...prevState,
              [room.name]: [...prevState[room.name], data]
            }
          })
          this.chatMessageIds.add(data.uuid)
          scrollToBottom()
        }
      })
    })
  }

  private setupPresenceInfoListener = (): void => {
    this.client.on(events.PRESENCE_INFORMATION, (response: IncomingPresenceInfo) => {
      const { data } = response
      if (data) {
        this.setPresenceInfo(data.usersPerRoom)
      }
    })
  }

  public disconnectAndWait = (): Promise<void> => {
    return new Promise(resolve => {
      this.client.once('disconnect', (reason: any) => {
        console.log(`${this.clientName} disconnected`)
        resolve()
      })
      this.client.disconnect()
    })
  }
}
