import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

export function TypingValues({ typersList, username }) {
  const [typingList, setTypingList] = useState('');

  useEffect(() => {
    let list = [];
    Object.values(typersList).forEach((isTyping, i) => {
      const typer = Object.keys(typersList)[i];
      if (isTyping && typer !== username) list.push(`${typer} is typing...`);
    });
    const value =
      list.length > 1 ? `${list.length} people are typing...` : list[0];
    setTypingList(value);
  }, [typersList, username]);

  return <Text className="is-typing">{typingList}</Text>;
}
