export type Config = {
  websocketEndpoint: string
  serverEndpoint: string
}

export const defaultAppConfig = {
  websocketEndpoint: 'ws://localhost:34000',
  serverEndpoint: 'http://localhost:34000'
}

export const createAppConfig = (): Config => {
  if (process.env.NODE_ENV === 'production') {
    return {
      websocketEndpoint: `wss://realtime-chat-service.herokuapp.com`,
      serverEndpoint: `https://realtime-chat-service.herokuapp.com`
    }
  } else {
    return defaultAppConfig
  }
}
