import React from 'react';

import { Image } from '@chakra-ui/image';
import { Center, Flex, Text, Tooltip } from '@chakra-ui/react';
import type { NextPage } from 'next';

interface RoomsHeaderCardsProps {
  name: string;
  count: number;
  temperature: number;
  onClick(): void;
  bg: string;
  selected: boolean;
}

const RoomsHeaderCards: NextPage<RoomsHeaderCardsProps> = (props) => {
  return (
    <Center
      sx={{ cursor: 'pointer' }}
      height={['50px', '58px', '66px']}
      w={['28vw', '9vw', '10vw']}
      alignContent={'center'}
      justifyContent={'space-between'}
      bg={props.selected ? props.bg : '#355291'}
      borderRadius={10}
      py={'10px'}
      pr={'0.75vw'}
      mx={'5px'}
      onClick={props.onClick}
    >
      <Flex flex={1}>
        <Image
          src={'/images/room-icon.svg'}
          objectFit={'contain'}
          // h={'67'}
          w={'80%'}
        />
      </Flex>
      <Flex flexDirection={'column'} flex={3}>
        <Tooltip hasArrow label={props.name}>
          <Text color={'white'} fontSize={[13, 18, 20]} noOfLines={1} flex={1}>
            {props.name}
          </Text>
        </Tooltip>
        <Text color={'white'} fontSize={9}>
          {props.count} دستگاه
        </Text>
      </Flex>
      <Flex flexDirection={'column'} flex={1}>
        <Text
          color={'white'}
          fontSize={16}
          pr={'0.75vw'}
          display={['none', 'flex', 'flex']}
        >
          {props.temperature}
          {'C'}
        </Text>
      </Flex>
    </Center>
  );
};

export default RoomsHeaderCards;
