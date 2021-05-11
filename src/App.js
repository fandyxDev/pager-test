import React, { useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react"

import Routes from './routes';
import { SocketContext } from './contexts/socket';
import { AvatarContext } from './contexts/avatar';

export default function App() {
  const [socket, setSocket] = useState();
  const [avatarObj, setAvatarObj] = useState({});

  return (
    <SocketContext.Provider value={[socket, setSocket]}>
      <AvatarContext.Provider value={[avatarObj, setAvatarObj]}>
        <ChakraProvider>
          <Routes />
        </ChakraProvider>
      </AvatarContext.Provider>
    </SocketContext.Provider>
  )
}
