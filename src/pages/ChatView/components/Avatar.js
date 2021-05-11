import { Box } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from 'react';
import { AvatarContext } from '../../../contexts/avatar';
import { getAvatar } from './helpers';

export function Avatar({ username }) {
  const [avatarImg, setAvatarImg] = useState(null);
  const [avatarObj, setAvatarObj] = useContext(AvatarContext);
  useEffect(() => {
    if(avatarObj[username]) {setAvatarImg(avatarObj[username]);}
    else
    getAvatar(username, (image) => {
      setAvatarImg(image);
      setAvatarObj({...avatarObj, [username]:image});
    });
  },[username]);

  return (
    <Box>
      <div className="avatar">
        {avatarImg ? <img alt="avatar" src={avatarImg} /> : <Spinner/>}
      </div>
    </Box>
  );
}
