import React, { useState } from 'react';

import { Text } from '@chakra-ui/react';
import { animated, useSpring } from 'react-spring';

const TextScroller = ({ text }) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: 'translate(-60%,0)' },
    to: { transform: 'translate(60%,0)' },
    config: { duration: 4000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <Text
      fontWeight={'bold'}
      isTruncated
      noOfLines={1}
      key={key}
      style={{ width: '150px' }}
    >
      <animated.div style={scrolling}>{text}</animated.div>);
    </Text>
  );
};

export default TextScroller;
