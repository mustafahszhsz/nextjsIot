import React, { useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import MenuButton from '../menu-button/MenuButton';

interface ScrollMenuProps {
  // onChangeSelection?: (selected: SelectedNavMenu) => void;
}

export const MapScrollMenu: React.FC<ScrollMenuProps> = (props) => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/`;
    navigate(path);
  };

  return (
    <Flex flexDirection={'column'} bgGradient="linear(to-t, #5EBDFD, #567CF8)">
      <Flex>
        <Image
          src="/images/Elehome.svg"
          h={'6.38vh'}
          w={'58.35vw'}
          fit={'contain'}
          mt={'12.46vh'}
        />
      </Flex>
      <Flex
        scrollBehavior={'initial'}
        style={{
          paddingRight: '1.3vw',
          paddingLeft: '1.3vw',
          marginTop: '5.9vh',
          flexDirection: 'column',
        }}
      >
        <MenuButton
          title="نقشه خانه"
          imageSrc="/images/Map-NavMenu.svg.svg"
          onClick={routeChange}
          editable={false}
        />
      </Flex>
    </Flex>
  );
};
