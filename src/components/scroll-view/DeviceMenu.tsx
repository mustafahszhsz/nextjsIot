import { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';

import { useReduxSelector } from '@/config/redux/root-store';

import {
  useCurrentUserProfileQuery,
  useDeleteCurrentUserMutation,
  useEditUserProfileMutation,
  useEditUserProfilePhoneMutation,
  useVerifyUserProfilePhoneMutation,
} from '../../service/api/user/user-api';
import MenuButton from '../menu-button/MenuButton';

export const DeviceMenu: React.FC = () => {
  const deviceId = useReduxSelector((store) => store.device.DeviceId);

  return (
    <Flex flexDirection={'column'}>
      <Flex
        scrollBehavior={'initial'}
        style={{
          flexDirection: 'column',
        }}
      >
        <MenuButton
          title={deviceId}
          imageSrc="/images/EditProfile.svg"
          editable={true}
          // updateName={() => setName(name)}
          statisticsType={'number'}
          expandedEditable={'none'}
        />
      </Flex>
    </Flex>
  );
};
