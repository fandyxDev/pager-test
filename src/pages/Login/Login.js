import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Input, Text } from "@chakra-ui/react"
import socketio from "socket.io-client";
import { SOCKET_URL } from '../../config';
import { SocketContext } from '../../contexts/socket';
import { useHistory } from "react-router-dom";

export function Login() {

  const [socket, setSocket] = useContext(SocketContext);
  const [value, setValue] = useState("")
  const handleChange = (event) => setValue(event.target.value)
  const history = useHistory();
  const valueRef = useRef();
  valueRef.current=value;
  
  useEffect(()=>{
    if(socket){
    socket.on('user-connected', (username) => {
      if (socket.connected)  
        history.push({
          pathname: '/chat',
          username: valueRef.current
        });
    });}
  }, [socket, history])
  const connectSocket = () => 
    setSocket(socketio.connect(SOCKET_URL + value))
  

  return (
    <Container maxW="container.sm">
      <div className="login-container center-v">
        <Box maxW="600" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <div className="login-container__box">
            <h1>Join Chat</h1>
            <Text className="input-title">Please enter your username</Text>
            <Input className="login-container__box--input" value={value}
              onChange={handleChange} />
            <div className="right-container">
              <Button onClick={connectSocket} bg="#FF8104" color="white" width="100px">Next</Button>
            </div>
          </div>
        </Box>
      </div>
    </Container>)
}

