export const scrollToBottom = () => {
  const messageWindow = document.getElementById('chat_messages')
  if (messageWindow) {
    messageWindow.scrollTop = messageWindow.scrollHeight
  }
}
