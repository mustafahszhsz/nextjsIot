import React, { useEffect, useState } from 'react';

import { Flex, Skeleton } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAllDevicesQuery } from '@/service/api/device/device-api';
import { setRoom } from '@/stores/room-store';
import {
  setSideMenuContent,
  setSideMenuStatus,
} from '@/stores/side-menu-store';

import RoomsHeaderCard from './components/rooms-header-card';

const getZonesDevices = (list: Device[] = []): Map<string, Device[]> => {
  const result = new Map<string, Device[]>();

  list.forEach((device) => {
    var itemZone = device.zone;
    if (itemZone === '' || itemZone === undefined || itemZone === null) {
      itemZone = null;
    }
    var exist = result.get(itemZone);
    if (exist === undefined) {
      result.set(itemZone, [device]);
    } else {
      exist.push(device);
    }
  });
  return result;
};

interface Device {
  id: string;
  name: string;
  label: string;
  type: string;
  managerId: string;
  assetId: string;
  assetLabel: string;
  zone: string;
  deviceData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
    };
  };
  deviceProfileId: string;
}

export interface RoomsHeaderProps {
  assetId?: string;
  selectedRoom: (a: string) => void;
}

export const RoomsHeader: React.FC<RoomsHeaderProps> = (props) => {
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const dispatch = useReduxDispatch();
  let devicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});
  const [deviceQueryState, setDeviceQueryState] = useState(devicesQuery);
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selected, setSelected] = useState<boolean>(false);
  const roomName = useReduxSelector((store) => store.room.roomName);
  const sideMenuStatus = useReduxSelector(
    (store) => store.sideMenu.sideMenuStatus
  );
  const sideMenuContent = useReduxSelector(
    (store) => store.sideMenu.sideMenuContent
  );
  return (
    <Flex
      pr={'6vw'}
      style={{
        backgroundColor: 'white',
        display: 'flex',
        paddingTop: '0.5%',
        paddingBottom: '0.5%',
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <ScrollContainer vertical={false} style={{ flexDirection: 'row' }}>
        <Flex>
          {Array.from(getZonesDevices(devicesQuery.data)).map((zone) => {
            console.log('zone: ', zone);

            return (
              (
                <Flex>
                  <RoomsHeaderCard
                    onClick={() => {
                      dispatch(setSideMenuContent('room'));

                      if (sideMenuStatus === 'shrink') {
                        dispatch(setSideMenuStatus('expand'));
                        dispatch(setSideMenuContent('room'));
                      }
                      if (
                        sideMenuStatus === 'expand' &&
                        sideMenuContent === 'room'
                      )
                        dispatch(setSideMenuStatus('shrink'));
                      setSelectedZone(zone[0]);
                      dispatch(
                        setRoom(
                          roomName === zone[0]
                            ? 'assetsallroomsdevices'
                            : zone[0]
                        )
                      );
                      setSelected(true);
                      console.log(
                        '/////////////////////// zone[0] ' +
                          zone[0] +
                          ' roomName ' +
                          roomName
                      );
                    }}
                    bg={zone[0] === roomName ? '#355291' : '#99A8C8'}
                    name={
                      zone[0] === null || zone[0] === ''
                        ? 'تعیین نشده'
                        : zone[0]
                    }
                    selected={selected}
                    count={
                      getZonesDevices(devicesQuery.data).get(zone[0])?.length
                    }
                    temperature={22}
                  />
                </Flex>
              ) || (
                <Skeleton>
                  <div>contents wrapped</div>
                  <div>won't be visible</div>
                </Skeleton>
              )
            );
          })}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
};

export default RoomsHeader;
