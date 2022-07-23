import { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import MenuButton from '@/components/menu-button/MenuButton';
import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import {
  useDeleteDeviceMutation,
  useEditDeviceMutation,
  useGetAllDevicesQuery,
  useGetDeviceQuery,
  useGetDeviceTelemetriesQuery,
  useGetDeviceTokenQuery,
  useSendRpcCommandMutation,
} from '@/service/api/device/device-api';
import { setDeviceName } from '@/stores/device-store';
import { setSideMenuContent } from '@/stores/side-menu-store';

import { SelectedMenu } from '../HomeScrollMenu';

export const SelectedDeviceButtons = ({
  setSelected,
}: {
  setSelected: (selectedMenu: SelectedMenu) => void;
}) => {
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const deviceId = useReduxSelector((store) => store.device.DeviceId);
  const deviceName = useReduxSelector((store) => store.device.DeviceName);
  const deviceZone = useReduxSelector((store) => store.device.DeviceZone);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const deviceZone = useReduxSelector((store) => store.device.);
  const [editDevice] = useEditDeviceMutation();
  const [deleteDevice] = useDeleteDeviceMutation();
  const [sendRpcCommand] = useSendRpcCommandMutation();

  let deviceInfo = useGetDeviceQuery({ assetId: assetId, id: deviceId }, {});
  let devicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});
  const [expand, setExpand] = useState<boolean>(true);

  const dispatch = useReduxDispatch();
  const router = useRouter();

  const editDeviceName = async (name: string) => {
    // console.log('edit device name');
    await editDevice({
      assetId: deviceInfo.data.assetId,
      deviceId: deviceInfo.data.id,
      deviceIdentifier: deviceInfo.data.name,
      label: name,
      type: deviceInfo.data.type,
      zone: deviceInfo.data.zone,
      deviceProfileId: deviceInfo.data.deviceProfileId,
    });
    router.reload();
  };
  const editDeviceRoomName = async (roomName: string) => {
    // console.log('edit device name');

    await editDevice({
      assetId: deviceInfo.data.assetId,
      deviceId: deviceInfo.data.id,
      deviceIdentifier: deviceInfo.data.name,
      label: deviceInfo.data.label,
      type: deviceInfo.data.type,
      zone: roomName,
      deviceProfileId: deviceInfo.data.deviceProfileId,
    });
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
  const getAssetsZones = (list: Device[] = []) => {
    let zoneNumber = [];
    list.forEach((device) => {
      if (zoneNumber.includes(device.zone)) {
      } else zoneNumber.push(device.zone);
    });
    return zoneNumber;
  };
  const deleteCurrentDevice = async () => {
    await deleteDevice({
      deviceId: deviceInfo.data.id,
    });
    router.reload();
    dispatch(setSideMenuContent('asset'));
  };

  //ws setup
  const getDeviceToken = useGetDeviceTokenQuery(
    {
      assetId: assetId,
      deviceId: deviceId,
    },
    {}
  );
  const getDeviceTelemetries = useGetDeviceTelemetriesQuery(
    {
      entityType: 'DEVICE',
      entityId: deviceId,
      keys: '',
      useStrictDataTypes: false,
    },
    {}
  );
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [signalStrength, setSignalStrength] = useState<string>();

  useEffect(() => {
    if (lastMessage !== null) {
      convertMap(map, JSON.parse(lastMessage.data).data);
      setSignalStrength(map.get('signal_strength_WiFi'));
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      var object = {
        tsSubCmds: [
          {
            entityType: 'DEVICE',
            entityId: deviceId,
            scope: 'LATEST_TELEMETRY',
            cmdId: 10,
          },
        ],
        historyCmds: [],
        attrSubCmds: [],
      };
      var data = JSON.stringify(object);
      sendMessage(data);
    }
  }, [readyState]);

  const handleClickChangeSocketUrl = useCallback(async () => {
    var token = await getDeviceToken.data?.token;
    var url = 'ws://95.80.182.57:8080/api/ws/plugins/telemetry?token=' + token;
    setSocketUrl(url);
  }, []);

  useEffect(() => {
    handleClickChangeSocketUrl();
  }, []);

  const [map, setMap] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const convertMap = (
    map: Map<string, string>,
    obj: { [key: string]: string }
  ) => {
    if (obj != null) {
      for (const [key, value] of Object.entries(obj)) {
        const mainValue = Array.from(value as string)[0][1];
        map.set(key, mainValue);
      }
      setMap(map);
    }
  };

  return (
    <>
      <MenuButton
        editable={true}
        title={deviceName}
        imageSrc="/images/Notification.svg"
        // statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'none'}
        expandedEditable={'none'}
        submitEdit={(input) => {
          editDeviceName(input);
          dispatch(setDeviceName(input));
        }}
      />

      <MenuButton
        editable={true}
        title={deviceZone}
        imageSrc="/images/Notification.svg"
        // statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'none'}
        expandedEditable={'none'}
        submitEdit={(input) => {
          editDeviceRoomName(input);
          // router.reload();
        }}
      />

      <MenuButton
        editable={false}
        title={'حذف دستگاه'}
        imageSrc="/images/Notification.svg"
        // statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'none'}
        expandedEditable={'none'}
        onClick={() => {
          // deleteCurrentDevice();
          // router.reload();
          onOpen();
        }}
      />
      <MenuButton
        editable={false}
        title={'قدرت سیگنال'}
        imageSrc="/images/Notification.svg"
        // statisticsString={getZonesAssetName(assetsQuery.data)}
        statisticsType={'string'}
        expandedEditable={'none'}
        statisticsString={signalStrength}
      />
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent zIndex={999999}>
          <DrawerHeader
            fontFamily={'IRANSans'}
            textAlign={'center'}
            borderBottomWidth="1px"
          >
            حذف دستگاه
          </DrawerHeader>
          <DrawerBody textAlign={'center'} style={{ alignItems: 'center' }}>
            <Text fontFamily={'IRANSans'}>
              آیا از حذف دستگاه {deviceName} اطمینان دارید؟
            </Text>
            <Flex justifyContent={'center'} flex={1}>
              <Button
                marginX={50}
                onClick={() => {
                  deleteCurrentDevice();
                }}
              >
                تایید
              </Button>

              <Button
                onClick={() => {
                  onClose();
                }}
                marginX={50}
              >
                لغو
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
