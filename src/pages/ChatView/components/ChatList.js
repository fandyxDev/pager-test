import { Box, Flex, List, ListItem, Text } from '@chakra-ui/layout';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../../contexts/socket';
import { Avatar } from './Avatar';
import { parseDate } from './helpers';

export function ChatList() {
  const [messageList, setMessageList] = useState([]);
  const [socket] = useContext(SocketContext);
  const listEnd = useRef(null);
  const messageListRef = useRef();
  messageListRef.current = messageList;

  useEffect(() => {
    const localMessages = JSON.parse(localStorage.getItem('messagesList'));
    if (localMessages && localMessages.length > 0 && messageList.length === 0)
      setMessageList(localMessages);
    listEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        const newList = [...messageListRef.current, message];
        localStorage.setItem('messagesList', JSON.stringify(newList));
        setMessageList(newList);
        listEnd.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [socket]);

  const getImageComponent = (url, alt) =>
    url.indexOf('giphy') === -1 ? (
      <img src={url} alt={alt} />
    ) : (
      <iframe
        title={`giphy-${url}`}
        src={url}
        width="160"
        height="auto"
        frameBorder="0"
      ></iframe>
    );

  return (
    <List className="msg-list">
      {messageList.map((message, i) => {
        return (
          <ListItem key={`message-${i}`}>
            <Flex>
              <Avatar username={message.username} />
              <Box className="msg-box">
                <h2>
                  {message.username}
                  <span className="timestamp">{parseDate(message.time)}</span>
                </h2>
                {message.type === 'text' ? (
                  <Text>{message.text}</Text>
                ) : (
                  getImageComponent(message.url, message.alt)
                )}
              </Box>
            </Flex>
          </ListItem>
        );
      })}
      <div ref={listEnd} />
    </List>
  );
}
