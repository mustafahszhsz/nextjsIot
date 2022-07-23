import { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import { setAsset } from '@/stores/asset-store';
import { setRoom } from '@/stores/room-store';
import {
  setNavMenuContent,
  setSideMenuContent,
  setSideMenuStatus,
} from '@/stores/side-menu-store';

const renderPerson = (person, idx) => {
  return (
    <Flex key={idx} flexDirection={'row'}>
      <Box
        bg={'white'}
        w={'10vw'}
        mt={'2.6vh'}
        borderTopRadius={'20'}
        ml={'20px'}
        py={'10px'}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#355291',
          }}
          fontSize={25}
          justifySelf={'center'}
          flex={1}
        >
          {person.firstName}
        </Text>
      </Box>
    </Flex>
  );
};
interface HomeListProps {
  selectedAssetId?: string;
  onSelectAsset: (a: string) => void;
}
export const HomeList: NextPage<HomeListProps> = (props) => {
  const assetsQuery = useGetAssetsQuery(undefined, {});
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const sideMenuStatus = useReduxSelector(
    (store) => store.sideMenu.sideMenuStatus
  );
  const sideMenuContent = useReduxSelector(
    (store) => store.sideMenu.sideMenuContent
  );
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (assetsQuery.data != undefined) setSelectedId(assetsQuery.data[0].id);
  }, [assetsQuery.data]);

  const [selectedId, setSelectedId] = useState<string>(assetId);

  if (assetsQuery.isLoading) {
    return <ScrollContainer>is Loading...</ScrollContainer>;
  }
  // console.log(assetValue.queries);

  return (
    <Flex w={['80vw', '448px', '100%']} flex={1}>
      <ScrollContainer style={{ flexDirection: 'row-reverse' }}>
        <Flex>
          {assetsQuery.data?.map((home) => {
            return (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch(setRoom('assetsallroomsdevices'));
                  dispatch(setAsset(home.id));
                  if (sideMenuStatus === 'shrink') {
                    dispatch(setSideMenuStatus('expand'));
                    dispatch(setSideMenuContent('asset'));
                    dispatch(setNavMenuContent('Home'));
                  }
                  if (
                    sideMenuStatus === 'expand' &&
                    sideMenuContent === 'asset' &&
                    assetId === home.id
                  ) {
                    dispatch(setSideMenuStatus('shrink'));
                    dispatch(setNavMenuContent('nothing'));
                  }
                  setSelectedId(home.id);
                  props.onSelectAsset(home.id);
                }}
                bg={assetId === home.id ? 'white' : '#355291'}
                minW={['25vw', '15vw', '10vw']}
                mt={'2.6vh'}
                borderTopRadius={'20'}
                ml={'20px'}
                py={['0.75vh', '1vh', '1.25vh']}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: assetId === home.id ? '#355291' : 'white',
                  }}
                  fontSize={25}
                  justifySelf={'center'}
                  flex={1}
                  noOfLines={1}
                >
                  {home.label}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
};
