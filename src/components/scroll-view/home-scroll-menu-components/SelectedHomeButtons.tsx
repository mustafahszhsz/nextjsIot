import { useState } from 'react';

import MenuButton from '@/components/menu-button/MenuButton';
import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import {
  useEditDeviceMutation,
  useGetAllDevicesQuery,
} from '@/service/api/device/device-api';
import {
  setSideMenuContent,
  setSideMenuStatus,
} from '@/stores/side-menu-store';

import { SelectedMenu } from '../HomeScrollMenu';

export const SelectedHomeButtons = ({
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
  const dispatch = useReduxDispatch();

  return (
    <>
      <MenuButton
        editable={true}
        title={getZonesAssetName(assetsQuery.data)}
        imageSrc="/images/Notification.svg"
        onClick={() => {
          // setSelected(SelectedMenu.Home);
          // setExpand(!expand);
        }}
        statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'none'}
        expandedEditable={'none'}
      />
      <MenuButton
        editable={false}
        title={'تعداد اتاق ها'}
        imageSrc="/images/Notification.svg"
        onClick={() => {
          // setSelected(SelectedMenu.Room);
        }}
        statisticsNumber={getAssetsZonesNumber(devicesQuery.data)}
        statisticsType={'number'}
        expandedEditable={'none'}
      />

      <MenuButton
        editable={false}
        title={'تعداد دستگاه ها'}
        imageSrc="/images/Notification.svg"
        onClick={() => {
          // setSelected(SelectedMenu.Home);
          // setExpand(!expand);
        }}
        statisticsNumber={getAssetDeviceNumber(devicesQuery.data)}
        statisticsType={'number'}
        expandedEditable={'none'}
      />

      <MenuButton
        editable={false}
        title="مدیریت اشتراک ها"
        imageSrc="/images/Notification.svg"
        onClick={() => {
          setSelected(SelectedMenu.Home);
        }}
        statisticsNumber={0}
        statisticsType={'none'}
        expandedEditable={'none'}
      />
      <MenuButton
        editable={false}
        title="سایر تنظیمات"
        imageSrc="/images/Notification.svg"
        onClick={() => {
          setSelected(SelectedMenu.AssetSettings);
        }}
        statisticsNumber={0}
        statisticsType={'none'}
        expandedEditable={'flex'}
      />
      <MenuButton
        editable={false}
        title="ویرایش پروفایل"
        imageSrc="/images/EditProfile.svg"
        onClick={() => {
          setSelected(SelectedMenu.Edit);
          dispatch(setSideMenuContent('editProfile'));
        }}
        statisticsNumber={0}
        statisticsType={'none'}
        expandedEditable={'none'}
      />
    </>
  );
};
