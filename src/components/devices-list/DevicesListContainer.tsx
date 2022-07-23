import React from 'react';

import { Center, Flex } from '@chakra-ui/react';
import moment from 'jalali-moment';
import type { NextPage } from 'next';

import { DeviceList } from './DeviceList';

const month = moment().locale('fa').format('MMMM');
const day = moment().locale('fa').format('D');
const year = moment().locale('fa').format('YYYY');
const StringDay = moment().locale('fa').format('ddd');
// import { DeviceType, useStores } from '../../stores/';
interface HomeListHeaderProps {
  isHomeSelected: boolean;
}
// export const DevicesList: NextPage<HomeListHeaderProps> = (props) => {
export const DevicesListContainer: NextPage = () => {
  return (
    <Flex
      pr={'6vw'}
      style={{
        flexDirection: 'row-reverse',
        width: '100%',
      }}
      dir={'ltr'}
    >
      <Center

      // id="container"
      // pointerEvents={'fill'}
      // maxW={'64.58vw'}
      >
        <DeviceList />
      </Center>
    </Flex>
  );
};
