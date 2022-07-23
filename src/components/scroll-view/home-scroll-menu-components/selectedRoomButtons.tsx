import { useState } from 'react';

import router from 'next/router';

import MenuButton from '@/components/menu-button/MenuButton';
import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import {
  useEditDeviceMutation,
  useGetAllDevicesQuery,
  useGetDeviceQuery,
} from '@/service/api/device/device-api';
import { setRoom } from '@/stores/room-store';
import { setSideMenuContent } from '@/stores/side-menu-store';

import { SelectedMenu } from '../HomeScrollMenu';

export const SelectedRomeButtons = ({
  setSelected,
}: {
  setSelected: (selectedMenu: SelectedMenu) => void;
}) => {
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
  interface Asset {
    id: string;
    name: string;
    type: string;
    label: string;
    managerId: string;
    ownerId: string;
  }
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const roomName = useReduxSelector((store) => store.room.roomName);
  let devicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});
  const assetsQuery = useGetAssetsQuery(undefined, {});
  const [editDevice] = useEditDeviceMutation();
  const [expand, setExpand] = useState<boolean>(true);

  // const editZone = async (LName: string) => {
  //   await editDevice({
  //     assetId: assetId;
  //     deviceId: string;
  //     deviceIdentifier: string;
  //     label: string;
  //     type: string;
  //     zone: string;
  //     deviceProfileId: string;
  //   }
  //   );
  // };
  const getAssetsZonesNumber = (list: Device[] = []) => {
    // const result = new Map<string, Device[]>();
    let zoneNumber = [];
    list.forEach((device) => {
      if (zoneNumber.includes(device.zone)) {
      } else zoneNumber.push(device.zone);
    });
    return zoneNumber.length;
  };
  const getAssetDeviceNumber = (list: Device[] = []) => {
    // const result = new Map<string, Device[]>();
    let deviceNumber = 0;
    list.forEach((device) => {
      deviceNumber++;
    });
    return deviceNumber;
  };
  const getZonesDevicesNumber = (list: Device[] = []) => {
    // const result = new Map<string, Device[]>();
    let deviceNumber = 0;
    list.forEach((device) => {
      var itemZone = device.zone;
      if (itemZone === roomName) {
        deviceNumber++;
      }
    });
    return deviceNumber;
  };
  const getZonesAssetName = (list: Asset[] = []) => {
    let assetLabel = '123';
    list.forEach((asset) => {
      if (asset.id === assetId) {
        assetLabel = asset.label;
      }
    });
    return assetLabel;
  };
  const deviceId = useReduxSelector((store) => store.device.DeviceId);
  let deviceInfo = useGetDeviceQuery({ assetId: assetId, id: deviceId }, {});
  const [RNameState, setRomeNameState] = useState(roomName);
  const dispatch = useReduxDispatch();

  const editRoomNameSubmit = async (RName: string) => {
    await editDevice({
      assetId: deviceInfo.data.assetId,
      deviceId: deviceInfo.data.id,
      deviceIdentifier: deviceInfo.data.name,
      label: deviceInfo.data.label,
      type: deviceInfo.data.type,
      zone: RName,
      deviceProfileId: deviceInfo.data.deviceProfileId,
    });
    router.reload();
    dispatch(setSideMenuContent('asset'));
    dispatch(setRoom('assetsallroomsdevices'));
  };

  return (
    <>
      <MenuButton
        title={roomName != null ? roomName : 'تعیین نشده'}
        imageSrc="/images/EditProfile.svg"
        editable={true}
        statisticsNumber={0}
        statisticsType={'none'}
        expandedEditable={'none'}
        // updateName={() => setNameState(nameState)}
        submitEdit={(input) => {
          // setLastNameState(input);
          editRoomNameSubmit(input);
        }}
      />

      <MenuButton
        editable={false}
        title={'تعداد دستگاه'}
        imageSrc="/images/Notification.svg"
        onClick={() => {
          // setSelected(SelectedMenu.Room);
        }}
        statisticsNumber={getZonesDevicesNumber(devicesQuery.data)}
        statisticsType={'number'}
        expandedEditable={'none'}
      />
      <MenuButton
        editable={false}
        title="خانه"
        imageSrc="/images/Notification.svg"
        onClick={() => {
          // setSelected(SelectedMenu.Home);
          setExpand(!expand);
        }}
        statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'string'}
        expandedEditable={expand ? 'none' : 'flex'}
        Array={assetsQuery.data}
      />
    </>
  );
};
