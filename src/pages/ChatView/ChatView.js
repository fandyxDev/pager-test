import React, { useContext, useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { SocketContext } from '../../contexts/socket';
import { useHistory } from 'react-router';
import { ChatList } from './components/ChatList';
import { TypingValues } from './components/TypingValues';
import { ChatInput } from './components/ChatInput';

export function ChatView({location}) {
  
  const [socket] = useContext(SocketContext);
  
  const history = useHistory();
  const [typersList, setTypersList] = useState([]);

  useEffect(() => {
    if (!socket) history.push('/');
    else socket.on('is-typing', (typers) => setTypersList(typers));
  }, [socket, history]);
  
  return (
    <Container maxW="container.sm">
      <div className="chat-container center-v">
        <Box maxW="600" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <div className="chat-container__box">
            <ChatList></ChatList>
            <ChatInput></ChatInput>
            <TypingValues typersList={typersList} username={location.username}></TypingValues>
          </div>
        </Box>
      </div>
    </Container>
  );
}
