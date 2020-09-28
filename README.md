![walkthrough](https://p23.f4.n0.cdn.getcloudapp.com/items/Z4uyeLPO/Screen%20Recording%202020-09-27%20at%2009.58.39%20PM.gif?source=viewer&v=20fc19b13b6e397d8624ea35e5f985f8)

## Quick Start

```bash
git clone https://github.com/serpient/realtime-chat.git
cd realtime-chat
yarn install
yarn start
```

## Deployment

Application is deployed and can be played with here: [https://clever-aryabhata-d8e12c.netlify.app/](https://clever-aryabhata-d8e12c.netlify.app/).

The project uses github actions to handle running tests with each commit. Netlify handles the automatic deployment to the deployed site.

## Technical Stack

The project utilizes:

- [Create React App](https://github.com/facebook/create-react-app)
- Socket.io Client
- SCSS for styling
- TypeScript

## Features

Commune is a group chat application where users can jump in and out of conversations surrounding a topic.

- A user can join the chat room only after a display name is set
- A user can enter one of the existing chat rooms and start chatting. Messages are on a per-room basis.
- Chats between connected users will only persist while they are on the page. No persistence has been implemented yet.
- If another user is also connected, their current room presence will be shown in the chat-room navigation panel
- Errors returned from the websocket API will be rendered in an error banner
- Mobile responsiveness

#### Mobile Responsiveness 
![mobile responsiveness walkthrough](https://p23.f4.n0.cdn.getcloudapp.com/items/rRuoq9E7/Screen%20Recording%202020-09-27%20at%2010.01.44%20PM.gif?source=viewer&v=042357b8190170925a207728261a741b)
#### Presence Feature 
![presence feature](https://p23.f4.n0.cdn.getcloudapp.com/items/E0urWpy7/Screen%20Recording%202020-09-28%20at%2010.44.05%20AM.gif?source=viewer&v=cea9db1bfb7381b520ffc78ee201c913)

## Future refactor

- There are a lot of duplication of types and the client-socket class between the frontend and backend. I would use a library like `nx` that allow me to organize the 2 projects in one repo, and extract the common types and socket clients into a separate module that can be easily used by both.
- E2E tests for application flows using a tool like Cypress. I ultimately ran out of time but was reluctantly ok with this tradeoff given that the application feature set is mostly dependent on socket behavior, which has backend e2e tests.
