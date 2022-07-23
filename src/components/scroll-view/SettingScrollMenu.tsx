import React, { useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useReduxDispatch } from '@/config/redux/root-store';
import { setDeviceId } from '@/stores/device-store';

import MenuButton from '../menu-button/MenuButton';

interface ScrollMenuProps {
  // onChangeSelection?: (selected: SelectedNavMenu) => void;
}

export const SettingScrollMenu: React.FC<ScrollMenuProps> = (props) => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/`;
    navigate(path);
  };
  const dispatch = useReduxDispatch();

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
          title="تنظیمات اولی"
          imageSrc="/images/Settings.svg"
          editable={false}
          statisticsType={'string'}
          expandedEditable={'none'}
          onClick={() => {
            dispatch(setDeviceId(''));
          }}
        />
        <MenuButton
          title="تنظیمات ثانوی"
          imageSrc="/images/Settings.svg"
          editable={false}
          statisticsType={'string'}
          expandedEditable={'none'}
        />
        <MenuButton
          title="تنظیمات آنوی"
          imageSrc="/images/Settings.svg"
          editable={false}
          statisticsType={'string'}
          expandedEditable={'none'}
        />
      </Flex>
    </Flex>
  );
};
