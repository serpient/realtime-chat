import { ChatRoom, ToApiMessage } from '../data/message'

export const setupSockets = (socket: SocketIOClient.Socket): void => {
  socket.on('connect', function () {
    console.log('WebSocket Client Connected')
    socket.send('Hi this is web client.')
  })

  socket.on('event', function (data: any) {
    console.log('Received: ' + data)
  })

  socket.on('disconnect', function () {
    console.log('WebSocket Client Disconnected')
  })
}

export const setupChatRooms = (
  socket: SocketIOClient.Socket,
  chatRooms: ChatRoom[],
  incomingMessageHandler: Function
): void => {
  chatRooms.forEach(room => {
    socket.on(room.name, (data: any) => incomingMessageHandler(data, room.name))
  })
}

export const sendMessageThroughSocket = (socket: SocketIOClient.Socket, message: ToApiMessage) => {
  socket.emit('new_message', message)
}
