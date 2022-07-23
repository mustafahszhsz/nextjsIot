import React, { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useReduxSelector } from '@/config/redux/root-store';
import { useSendRpcCommandMutation } from '@/service/api/device/device-api';

import { ListOfEditButtons } from './home-scroll-menu-components/EditButtons';
import { SelectedDeviceButtons } from './home-scroll-menu-components/SelectedDeviceButtons';
import { SelectedHomeButtons } from './home-scroll-menu-components/SelectedHomeButtons';
import { SelectedRomeButtons } from './home-scroll-menu-components/selectedRoomButtons';

interface ScrollMenuProps {
  selected?: SelectedMenu;
  onChangeSelection?: (selected: SelectedMenu) => void;
}

export enum SelectedMenu {
  List = 0,
  Edit = 1,
  Room = 2,
  Home = 3,
  RoomEdit = 4,
  AssetSettings = 5,
  DeviceSettings = 6,
}

export const HomeScrollMenu: React.FC<ScrollMenuProps> = (props) => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/`;
    navigate(path);
  };

  const [selected, setSelected] = useState<SelectedMenu>(SelectedMenu.List);

  useEffect(() => {
    if (props.selected !== undefined) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  useEffect(() => {
    props.onChangeSelection?.(selected);
  }, [selected]);
  const deviceId = useReduxSelector((store) => store.device.DeviceId);
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const roomName = useReduxSelector((store) => store.room.roomName);
  const sideMenuContent = useReduxSelector(
    (store) => store.sideMenu.sideMenuContent
  );

  const [sendRpcCommand] = useSendRpcCommandMutation();

  const editDeviceName = async () => {
    console.log('edit device name');

    return await sendRpcCommand({
      assetId: assetId,
      deviceId: deviceId,
      method: 'set_beep_status',
      value: true,
      params: true,
      persistent: false,
      timeout: 500,
      useStrictDataTypes: false,
    }).unwrap();
  };
  useEffect(() => {
    setSelected(SelectedMenu.List);
  }, [roomName]);
  useEffect(() => {
    setSelected(SelectedMenu.DeviceSettings);
  }, [deviceId]);
  useEffect(() => {
    setSelected(SelectedMenu.List);
  }, [assetId]);
  useEffect(() => {
    setSelected(SelectedMenu.List);
  }, [sideMenuContent]);
  const sideMenuHandler = () => {
    if (sideMenuContent === 'asset') {
      console.log('home selectedddd');
      return <SelectedHomeButtons setSelected={setSelected} />;
    }
    if (sideMenuContent === 'room') {
      console.log('rome selectedddd');
      if (roomName !== 'assetsallroomsdevices')
        return <SelectedRomeButtons setSelected={setSelected} />;
      else return <SelectedHomeButtons setSelected={setSelected} />;
    }
    if (sideMenuContent === 'device') {
      console.log('device selectedddd');
      return <SelectedDeviceButtons setSelected={setSelected} />;
    }
    if (sideMenuContent === 'editProfile') {
      return <ListOfEditButtons setSelected={() => {}} />;
    }
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
        {sideMenuHandler()}

        {/* {selected === SelectedMenu.List ? (
          <SelectedHomeButtons setSelected={setSelected} />
        ) : null}

        {selected === SelectedMenu.Edit ? (
          <ListOfEditButtons setSelected={setSelected} />
        ) : null}

        {selected === SelectedMenu.Room ? (
          <ListOfRoomButtons setSelected={setSelected} />
        ) : null}

        {selected === SelectedMenu.Home ? (
          <ListOfHomeButtons setSelected={setSelected} />
        ) : null}
        {selected === SelectedMenu.RoomEdit ? (
          <ListOfRomeEditButtons setSelected={setSelected} />
        ) : null}
        {selected === SelectedMenu.AssetSettings ? (
          <ListOfAssetSettingsButtons setSelected={setSelected} />
        ) : null}
        {selected === SelectedMenu.DeviceSettings ? (
          <ListOfDeviceSettingsButtons setSelected={setSelected} />
        ) : null} */}
      </Flex>
    </Flex>
  );
};
