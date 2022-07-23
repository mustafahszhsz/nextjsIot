import React, { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Center, Flex } from '@chakra-ui/react';

import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import {
  setNavMenuContent,
  setSideMenuContent,
  setSideMenuStatus,
} from '@/stores/side-menu-store';

export interface NavMenuProps {
  selected?: SelectedNavMenu;
  onChangeSelection?: (selected: SelectedNavMenu) => void;
}

export enum SelectedNavMenu {
  Home = 0,
  Map = 1,
  Analysis = 2,
  Settings = 3,
  expand = 4,
  shrink = 5,
}

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const [selected, setSelected] = useState<SelectedNavMenu>(
    SelectedNavMenu.shrink
  );

  useEffect(() => {
    if (props.selected !== undefined) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  useEffect(() => {
    props.onChangeSelection?.(selected);
  }, [selected]);
  const dispatch = useReduxDispatch();

  const sideMenuStatus = useReduxSelector(
    (store) => store.sideMenu.sideMenuStatus
  );
  const navMenuStatus = useReduxSelector(
    (store) => store.sideMenu.navMenuContent
  );
  const roomName = useReduxSelector((store) => store.room.roomName);

  useEffect(() => {
    if (sideMenuStatus === 'shrink') setSelected(SelectedNavMenu.shrink);
    if (sideMenuStatus === 'expand') {
      if (roomName !== 'assetsallroomsdevices')
        setSelected(SelectedNavMenu.Home);
    }
  }, [sideMenuStatus]);
  useEffect(() => {
    console.log('sssssssssssssssssssssssssssssssssssssss');

    if (sideMenuStatus === 'shrink') setSelected(SelectedNavMenu.shrink);
    if (sideMenuStatus === 'expand') {
      if (navMenuStatus === 'Home') setSelected(SelectedNavMenu.Home);
    }
  }, [navMenuStatus]);

  return (
    <div style={{ flexDirection: 'row' }}>
      <Flex
        flexDirection={'column'}
        bg={'#355291'}
        w={['14.68vw', '4.68vw', '4.68vw']}
        h={'100%'}
      >
        <Center
          mr={'43%'}
          onClick={() => {
            if (sideMenuStatus === 'expand') {
              console.log('expand');
              dispatch(setSideMenuStatus('shrink'));

              // setSelected(SelectedNavMenu.shrink);
            }
            if (sideMenuStatus === 'shrink') {
              console.log('shrink');
              setSelected(SelectedNavMenu.Home);
              dispatch(setSideMenuStatus('expand'));
              // dispatch(setSideMenuContent('room'));
              // setSelected(SelectedNavMenu.Home);
            }
          }}
        >
          <Image
            cursor={'pointer'}
            src="/images/Expand-NavMenu.png"
            objectFit={'contain'}
          />
        </Center>
        <Flex mt={'12.7vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              //onClick={() => setSelected(SelectedNavMenu.Home)}
              onClick={() => {
                if (selected !== SelectedNavMenu.Home) {
                  // dispatch(setNavMenuContent('Home'));
                  dispatch(setSideMenuContent('asset'));
                  dispatch(setSideMenuStatus('expand'));
                  setSelected(SelectedNavMenu.Home);
                }
                if (selected === SelectedNavMenu.Home) {
                  setSelected(SelectedNavMenu.shrink);
                  dispatch(setSideMenuStatus('shrink'));
                }
              }}
              src="/images/Home-NavMenu.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Home ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Home ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>

        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              //onClick={() => setSelected(SelectedNavMenu.Map)}
              onClick={() => {
                if (selected !== SelectedNavMenu.Map) {
                  // dispatch(setSideMenuContent('statistics'));
                  // dispatch(setNavMenuContent('Map'));
                  dispatch(setSideMenuStatus('expand'));
                  setSelected(SelectedNavMenu.Map);
                  dispatch(setSideMenuContent('map'));
                }
                if (selected === SelectedNavMenu.Map) {
                  setSelected(SelectedNavMenu.shrink);
                  dispatch(setSideMenuStatus('shrink'));
                }
              }}
              src="/images/Map-NavMenu.svg"
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Map ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Map ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              //onClick={() => setSelected(SelectedNavMenu.Analysis)}
              onClick={(event) => {
                if (selected !== SelectedNavMenu.Analysis) {
                  // dispatch(setSideMenuContent('statistics'));
                  // dispatch(setNavMenuContent('Map'));
                  dispatch(setSideMenuStatus('expand'));
                  setSelected(SelectedNavMenu.Analysis);
                  dispatch(setSideMenuStatus('expand'));
                }
                if (selected === SelectedNavMenu.Analysis) {
                  setSelected(SelectedNavMenu.shrink);
                  dispatch(setSideMenuStatus('shrink'));
                }
              }}
              src="/images/Analytics.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Analysis ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Analysis ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Flex mt={'12vh'}>
          <Center w={'100%'}>
            <Image
              cursor={'pointer'}
              //onClick={() => setSelected(SelectedNavMenu.Settings)}
              onClick={() => {
                if (selected !== SelectedNavMenu.Settings) {
                  // dispatch(setSideMenuContent('statistics'));
                  // dispatch(setNavMenuContent('Map'));
                  dispatch(setSideMenuStatus('expand'));
                  setSelected(SelectedNavMenu.Settings);
                  dispatch(setSideMenuStatus('expand'));
                }
                if (selected === SelectedNavMenu.Settings) {
                  setSelected(SelectedNavMenu.shrink);
                  dispatch(setSideMenuStatus('shrink'));
                }
              }}
              src="/images/Settings.svg"
              alignSelf={'center'}
              h={37}
              w={37}
              opacity={selected === SelectedNavMenu.Settings ? '100%' : '50%'}
            />
          </Center>
          <Image
            src="/images/Selected.svg"
            h={selected === SelectedNavMenu.Settings ? 37 : 0}
            alignSelf={'center'}
          />
        </Flex>
        <Image
          objectFit={'contain'}
          cursor={'pointer'}
          onClick={() =>
            window.open('http://www.elevia.ir/Home/Index', '_blank')
          }
          src="/images/Elevia-NavMenu.png"
          mt={'2.6vh'}
          alignSelf={'center'}
          h={'12.3vh'}
        />
      </Flex>
    </div>
  );
};

export default NavMenu;
