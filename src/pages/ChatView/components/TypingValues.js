import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

export function TypingValues({ typersList }) {
  const [typingList, setTypingList] = useState('');

  useEffect(() => {
    let list = [];
    Object.values(typersList).forEach((isTyping, i) => {
      if (isTyping) list.push(`${Object.keys(typersList)[i]} is typing...`);
    });
    const value =
      list.length > 1 ? `${list.length} people are typing...` : list[0];
    setTypingList(value);
  }, [typersList]);

  return <Text className="is-typing">{typingList}</Text>;
}
