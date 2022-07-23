import { useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { OnePole } from '@/app/device/one-pole/OnePole';
import { ThreePole } from '@/app/device/three-pole/ThreePole';
import { TwoPole } from '@/app/device/two-pole/TwoPole';
import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import { useGetAssetsQuery } from '@/service/api/asset/asset-api';
import { useGetAllDevicesQuery } from '@/service/api/device/device-api';

export const DeviceList = () => {
  const assetsQuery = useGetAssetsQuery(undefined, {});
  const assetId = useReduxSelector((store) => store.asset.assetId);
  const deviceName = useReduxSelector((store) => store.device.DeviceName);
  const dispatch = useReduxDispatch();
  // console.log('assetId: ', assetId);

  let allDevicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});
  useEffect(() => {
    console.log('device name changed');
    allDevicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});
  }, [deviceName]);

  const deviceHandler = (
    deviceType: string,
    deviceName: string,
    deviceId: string,
    deviceAssetId: string,
    deviceZone: string
  ) => {
    if (deviceType === 'triple_pole_switch') {
      return (
        <ThreePole
          scale={'1x'}
          deviceName={deviceName}
          deviceId={deviceId}
          zone={deviceZone}
          assetId={deviceAssetId}
        />
      );
    }
    if (deviceType === 'double_pole_switch')
      return (
        <TwoPole
          scale={'1x'}
          deviceName={deviceName}
          zone={deviceZone}
          deviceId={deviceId}
          assetId={deviceAssetId}
        />
      );
    if (deviceType === 'single_pole_switch')
      return (
        <OnePole
          scale={'1x'}
          deviceName={deviceName}
          zone={deviceZone}
          deviceId={deviceId}
          assetId={deviceAssetId}
        />
      );
    else return <Box w={'50px'} h={'50px'} bgColor={'red'}></Box>;
  };

  useEffect(() => {
    if (assetsQuery.data != undefined) {
      setSelectedId(assetId);
    }
    console.log('changed');
  }, []);

  const [selectedId, setSelectedId] = useState<string>('');

  if (assetsQuery.isLoading) {
    return <ScrollContainer>is Loading...</ScrollContainer>;
  }

  return (
    <Flex>
      <ScrollContainer
        horizontal={false}
        vertical
        style={{
          flexDirection: 'column',
        }}
      >
        <Flex flexDirection={['column', 'column', 'row-reverse']}>
          {allDevicesQuery.data?.map((device) => {
            return (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => setSelectedId(device.id)}
                mt={'2.6vh'}
                ml={'20px'}
                py={'1.25vh'}
              >
                {deviceHandler(
                  device.type,
                  device.label,
                  device.id,
                  device.assetId,
                  device.zone
                )}
              </Box>
            );
          })}
        </Flex>
      </ScrollContainer>
    </Flex>
  );
};
