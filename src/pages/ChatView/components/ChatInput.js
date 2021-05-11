import React, { useContext, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SocketContext } from '../../../contexts/socket';
import { AttachmentIcon } from '@chakra-ui/icons';
import { getGif, imgurUpload } from './helpers';
export function ChatInput() {
  const [socket] = useContext(SocketContext);
  const [msg, setMsg] = useState('');
  const hiddenFileInput = useRef(null);

  const handleChange = (event) => {
    if (event.target.value.length > 0) socket.emit('typing', true);
    else socket.emit('typing', false);
    setMsg(event.target.value);
  };

  const handleBlur = () => socket.emit('typing', false);
  const handleClick = () => {
    if (msg.trim().startsWith('/giphy')) {
      const searchTerm = msg.substring(6);
      getGif(searchTerm.trim(), (data) =>
        socket.emit('image-message', {
          url: data[Math.floor(Math.random() * data.length)].embed_url,
          alt: 'animated-gif',
        })
      );
    } else socket.emit('text-message', msg);
    setMsg('');
    socket.emit('typing', false);
  };
  const handleAttachmentClick = () => hiddenFileInput.current.click();
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleClick();
  };

  const handleAttachmentChange = (event) => {
    const fileUploaded = event.target.files[0];
    const formData = new FormData();
    formData.append('image', fileUploaded);
    imgurUpload(formData, (link) =>
      socket.emit('image-message', { url: link, alt: 'attachment' })
    );
  };

  return (
    <InputGroup size="md">
      <Input
        placeholder="Message"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={msg}
        pr="7rem"
      />
      <InputRightElement width="7rem">
        <IconButton
          className="attachment-icon"
          aria-label="attachment"
          icon={<AttachmentIcon />}
          onClick={handleAttachmentClick}
        ></IconButton>
        <Button className="send-btn" size="sm" onClick={handleClick}>
          Send
        </Button>
      </InputRightElement>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleAttachmentChange}
        style={{ display: 'none' }}
      />
    </InputGroup>
  );
}
