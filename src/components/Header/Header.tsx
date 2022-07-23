import React, { useState } from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import {
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Link, useNavigate } from 'react-router-dom';

import { useCurrentUserProfileQuery } from '@/service/api/user/user-api';

import { PageLogout } from '../../app/auth-archive/PageLogout';
import {
  useReduxDispatch,
  useReduxSelector,
} from '../../config/redux/root-store';
import { useLogoutMutation } from '../../service/api/auth/auth-api';
import { setLogout } from '../../stores/logged-store';

interface HeaderProps {
  isUnreadNotificationExist: boolean;
}
const Header: NextPage<HeaderProps> = (props) => {
  const loginStatus = useReduxSelector((store) => store.login.value);
  const dispatch = useReduxDispatch();
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    console.log('inam ejra shode............');
    await logout().unwrap();
  };
  const userQuery = useCurrentUserProfileQuery();
  const firstName = userQuery.data?.firstName;
  const lastName = userQuery.data?.lastName;
  const [isUnreadNotificationExist, setIsUnreadNotificationExist] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const routeChange = (url: string) => {
    navigate(url);
  };
  return (
    <div
      style={{
        backgroundColor: '#355291',
        paddingTop: '0.3%',
        paddingBottom: '0.3%',
        flexDirection: 'row',
        width: '100%',
      }}
      dir={'ltr'}
    >
      <Flex>
        <Menu autoSelect={false}>
          <MenuButton
            flexDirection={'row-reverse'}
            alignContent={'center'}
            h="48px"
            ml={'3.5%'}
          >
            <Flex flexDirection={'row'}>
              <Image
                src={
                  userQuery.data?.mainGalleryImageUrl != null
                    ? 'http://95.80.182.57:5005' +
                      userQuery.data?.mainGalleryImageUrl
                    : '/images/personal_icon.png'
                }
                borderRadius={150}
                alignSelf={'center'}
                w="48px"
                h="48px"
              />
              <ChevronDownIcon
                w={8}
                h={8}
                color="#A4AFB7"
                alignSelf={'center'}
              />
              <Text
                alignSelf={'center'}
                color={'white'}
                fontFamily={'IRANSans'}
              >
                {firstName} {lastName}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList zIndex={990}>
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
              onClick={() => {
                routeChange(``);
              }}
            >
              ویرایش پروفایل
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontWeight="bold"
              flexDirection={'row-reverse'}
              color={'black'}
              onClick={() => {
                logoutHandler;
                dispatch(setLogout(false));
                routeChange(`../login`);
                console.log('AAAAAAAAAAAAAAAAAAAAA: رسیدم اینجا', loginStatus);
              }}
            >
              خروج
            </MenuItem>
          </MenuList>
        </Menu>
        <Center height="50px" alignContent={'center'} justifyContent={'center'}>
          <Divider
            orientation="vertical"
            borderWidth={1}
            color={'white'}
            opacity={1}
            margin={5}
            height={'50%'}
          />
        </Center>
        <Image
          onClick={() =>
            setIsUnreadNotificationExist(props.isUnreadNotificationExist)
          }
          src={
            isUnreadNotificationExist
              ? '/images/Notification.png'
              : '/images/No-Notification.png'
          }
          w="32px"
          h="35px"
          alignSelf={'center'}
          objectFit={'contain'}
          fit={'contain'}
        />
      </Flex>
    </div>
  );
};

export default Header;
