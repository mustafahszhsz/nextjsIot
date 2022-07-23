import { useCallback, useEffect, useState } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useReduxDispatch, useReduxSelector } from '@/config/redux/root-store';
import {
  useGetDeviceTelemetriesQuery,
  useGetDeviceTokenQuery,
  useSendRpcCommandMutation,
} from '@/service/api/device/device-api';
import {
  setDeviceId,
  setDeviceName,
  setDeviceZone,
} from '@/stores/device-store';
import { setSideMenuContent } from '@/stores/side-menu-store';

import { TwoPole1x } from './TwoPole1x';
import { TwoPole2x } from './TwoPole2x';

export interface IButtonIconProps {
  assetId: string;
  deviceId: string;
  charge?: boolean;
  beep?: boolean;
  setting?: boolean;
  buttonOne?: boolean;
  buttonTwo?: boolean;
  buttonThree?: boolean;
  deviceName: string;
  scale: '1x' | '2x';
  zone: string;
  onClickCharge?: () => void;
  onClickBeep?: () => void;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
  onClickButtonThree?: () => void;
  onClickDevice?: () => void;
}
enum TelemetryKey {
  key_1_value = 'key_one_status',
  key_2_value = 'key_two_status',
  key_3_value = 'key_three_status',
  beep_status = 'beep_status',
  temperature = 'temperature',
}
enum rpcMethod {
  key_1_set_value = 'key_one_set_value',
  key_2_set_value = 'key_two_set_value',
  key_3_set_value = 'key_three_set_value',
  set_beep_status = 'set_beep_status',
}

export const TwoPole: React.FC<IButtonIconProps> = (props) => {
  const [sendRpcCommand] = useSendRpcCommandMutation();
  const getDeviceToken = useGetDeviceTokenQuery(
    {
      assetId: props.assetId,
      deviceId: props.deviceId,
    },
    {}
  );
  const getDeviceTelemetries = useGetDeviceTelemetriesQuery(
    {
      entityType: 'DEVICE',
      entityId: props.deviceId,
      keys: '',
      useStrictDataTypes: false,
    },
    {}
  );
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      convertMap(map, JSON.parse(lastMessage.data).data);
      map.get('key_one_status') === '1'
        ? setKeyOneStatus(false)
        : setKeyOneStatus(true);
      map.get('key_two_status') === '1'
        ? setKeyTwoStatus(false)
        : setKeyTwoStatus(true);
      map.get('key_three_status') === '1'
        ? setKeyThreeStatus(false)
        : setKeyThreeStatus(true);
      map.get('beep_status') === '1'
        ? setBeepStatus(true)
        : setBeepStatus(false);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      var object = {
        tsSubCmds: [
          {
            entityType: 'DEVICE',
            entityId: props.deviceId,
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

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  const assetId = useReduxSelector((store) => store.asset.assetId);
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

  const handlerRpc = async (
    deviceId: string,
    value: boolean,
    method: rpcMethod
  ) => {
    return await sendRpcCommand({
      assetId: assetId,
      deviceId: deviceId,
      method: method,
      value: !value,
      params: !value,
      persistent: false,
      timeout: 500,
      useStrictDataTypes: false,
    }).unwrap();
  };
  const [keyOneStatus, setKeyOneStatus] = useState<boolean>();
  const [keyTwoStatus, setKeyTwoStatus] = useState<boolean>();
  const [keyThreeStatus, setKeyThreeStatus] = useState<boolean>();
  const [beepStatus, setBeepStatus] = useState<boolean>();
  const dispatch = useReduxDispatch();

  return (
    <div>
      {props.scale === '1x' ? (
        <TwoPole1x
          {...props}
          onClickDevice={() => {
            dispatch(setDeviceId(props.deviceId));
            dispatch(setDeviceName(props.deviceName));
            dispatch(setSideMenuContent('device'));
            dispatch(
              props.zone
                ? setDeviceZone(props.zone)
                : setDeviceZone('تعیین نشده')
            );
            console.log(props.deviceId);
          }}
          zone={props.zone}
          deviceName={props.deviceName}
          onClickCharge={() => alert('it is not working')}
          onClickBeep={() => {
            setBeepStatus(
              getDeviceTelemetries.data?.beep_status[0].value === '0'
                ? false
                : true
            );
            handlerRpc(props.deviceId, beepStatus, rpcMethod.set_beep_status);
          }}
          beep={beepStatus}
          onClickButtonOne={() => {
            console.log('button one');
            console.log(getDeviceTelemetries.data?.key_one_status[0].value);

            setKeyOneStatus(!keyOneStatus);
            // getDeviceTelemetries.data.key_one_status;
            handlerRpc(
              props.deviceId,
              !keyOneStatus,
              rpcMethod.key_1_set_value
            );
          }}
          buttonOne={keyOneStatus}
          onClickButtonTwo={() => {
            setKeyTwoStatus(!keyTwoStatus);
            handlerRpc(
              props.deviceId,
              !keyTwoStatus,
              rpcMethod.key_2_set_value
            );
          }}
          buttonTwo={keyTwoStatus}
        />
      ) : (
        <TwoPole2x
          {...props}
          onClickDevice={() => {
            dispatch(setDeviceId(props.deviceId));
            dispatch(setDeviceName(props.deviceName));
          }}
          deviceName={props.deviceName}
          onClickCharge={() => alert('it is not working')}
          onClickBeep={() => {
            setBeepStatus(!beepStatus);
            handlerRpc(props.deviceId, !beepStatus, rpcMethod.set_beep_status);
          }}
          beep={beepStatus}
          onClickButtonOne={() => {
            setKeyOneStatus(
              getDeviceTelemetries.data?.key_one_status[0].value === '0'
                ? true
                : false
            );
            handlerRpc(
              props.deviceId,
              !keyOneStatus,
              rpcMethod.key_1_set_value
            );
          }}
          buttonOne={keyOneStatus}
          onClickButtonTwo={() => {
            setKeyTwoStatus(!keyTwoStatus);
            handlerRpc(
              props.deviceId,
              !keyTwoStatus,
              rpcMethod.key_2_set_value
            );
          }}
          buttonTwo={keyTwoStatus}
          onClickButtonThree={() => {
            setKeyThreeStatus(!keyOneStatus);

            handlerRpc(
              props.deviceId,
              keyThreeStatus,
              rpcMethod.key_3_set_value
            );
          }}
          buttonThree={keyThreeStatus}
        />
      )}
    </div>
  );
};
