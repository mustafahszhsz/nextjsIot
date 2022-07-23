import React, { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { CSSObject } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useRedirectFromUrl } from '@/app/router';
import { SlideIn } from '@/components';
import Header from '@/components/Header/Header';
import { HomeListHeader } from '@/components/HomeListHeader/HomeListHeader';
import { RoomsDeviceList } from '@/components/room-devices-list/RoomsDeviceList';
import RoomsHeader from '@/components/rooms-header/rooms-header';
import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';

import NavMenu, { SelectedNavMenu } from '../../components/nav-menu/nav-menu';
import { HomeScrollMenu } from '../../components/scroll-view/HomeScrollMenu';
import { MapScrollMenu } from '../../components/scroll-view/MapScrollMenu';
import { SettingScrollMenu } from '../../components/scroll-view/SettingScrollMenu';
import { StatisticScrollMenu } from '../../components/scroll-view/StatisticScrollMenu';

let socket;
export const HomeScreen: React.FC = () => {
  const loginStatus = useReduxSelector((store) => store.login.value);
  const navigate = useNavigate();
  const routeChange = (url: string) => {
    navigate(url);
  };
  const redirect = useRedirectFromUrl();
  const { t } = useTranslation();
  const [navMenuSelection, setNavMenuSelection] = useState(0);
  // const { load } = useLoadContext();
  // console.log(load);

  const assetsQuery = useGetAssetsQuery(undefined, {});

  const selectScrollMenu = (select: SelectedNavMenu): JSX.Element => {
    if (select === SelectedNavMenu.Home) return <HomeScrollMenu />;
    if (select === SelectedNavMenu.Map) return <MapScrollMenu />;
    if (select === SelectedNavMenu.Analysis) return <StatisticScrollMenu />;
    if (select === SelectedNavMenu.Settings) return <SettingScrollMenu />;
    if (select === SelectedNavMenu.expand) return <SettingScrollMenu />;
  };
  const expandHandler = (select: SelectedNavMenu) => {
    if (
      select === 4 ||
      select === 3 ||
      select === 2 ||
      select === 1 ||
      select === 0
    )
      return '19vw';
    if (select === 5) return 0;
  };
  const expandHandler2 = (select: 'expand' | 'shrink') => {
    if (select === 'expand') return '19vw';
    if (select === 'shrink') return 0;
  };
  const isOpen = (select: 'expand' | 'shrink') => {
    if (select === 'expand') return true;
    if (select === 'shrink') return false;
  };
  const MobileExpandHandler = (select: SelectedNavMenu) => {
    if (
      select === 4 ||
      select === 3 ||
      select === 2 ||
      select === 1 ||
      select === 0
    )
      return true;
    if (select === 5) return false;
  };
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const roomName = useReduxSelector((store) => store.room.roomName);
  const sideMenuStatus = useReduxSelector(
    (store) => store.sideMenu.sideMenuStatus
  );
  const dispatch = useReduxDispatch();
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    console.log('asset changed  : home screen   ' + assetId);
  }, [assetId]);
  console.log('loginStatus: ', loginStatus);
  if (loginStatus)
    return (
      <SlideIn>
        <Flex flexDirection={'column'} flex={1} bg={'#557BF5'}>
          <Flex>
            <Header isUnreadNotificationExist={false} />
          </Flex>
          <Flex flex={1}>
            <Flex>
              <Flex>
                <NavMenu
                  onChangeSelection={(selected) => {
                    setNavMenuSelection(selected);
                  }}
                />
              </Flex>

              <Flex
                w={expandHandler2(sideMenuStatus)}
                display={['none', 'none', 'flex']}
              >
                {selectScrollMenu(navMenuSelection)}
              </Flex>
              <Flex
                // bgColor={'rgba(0,0,0,0.8)'}

                zIndex={999}
                position={'absolute'}
                top={0}
                right={'14.68vw'}
                h={'100%'}
                w={MobileExpandHandler(navMenuSelection) ? '250vw' : 0}
                display={['flex', 'none', 'none']}
                flex={1}
              >
                {selectScrollMenu(navMenuSelection)}
              </Flex>
              <Flex
                onClick={() => {
                  setNavMenuSelection(5);
                }}
                flex={1}
                backgroundColor={'rgba(0,0,0,0.8)'}
                zIndex={1000}
                position={'absolute'}
                top={0}
                left={0}
                w={MobileExpandHandler(navMenuSelection) ? '27vw' : 0}
                h={'100%'}
                display={['flex', 'none', 'none']}
              ></Flex>
            </Flex>
            <Flex
              flexDirection={'column'}
              w={'100%'}
              color={'white'}
              backgroundImage={'/background.svg'}
              backgroundRepeat={'no-repeat'}
              backgroundSize={'cover'}
              flex={1}
              overflow={'hidden'}
            >
              <Flex flexDirection={'column'}>
                <HomeListHeader
                  isHomeSelected={false}
                  selectedAssetId={(a) => {
                    console.log(a + '888888888888888888888888888');
                  }}
                />

                <RoomsHeader
                  // assetId={assetId}
                  selectedRoom={(a) => {
                    console.log(a + 'rooms header');
                  }}
                />
              </Flex>
              <Flex
                flex={1}
                style={{
                  maxHeight: '80vh',
                  overflowY: 'scroll',
                }}
                padding={5}
                pr={[1, 2.5, 5]}
              >
                {/* <ThreePole deviceName={'xx'} scale={'1x'} zone={'aaa'} assetId={''} deviceId={''} />  */}
                {/* <LightDeviceScreen /> */}
                {/* <DevicesListContainer /> */}
                {/* <DeviceList /> */}
                <RoomsDeviceList selectedZone={roomName} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </SlideIn>
    );
  else return <>{routeChange('../login')}</>;
};

const CONTAINER: CSSObject = {
  flex: 1,
  color: 'white',
  backgroundImage: '/login-screen-background.jpg',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const FLEX: CSSObject = {
  flex: 1,
  paddingTop: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
