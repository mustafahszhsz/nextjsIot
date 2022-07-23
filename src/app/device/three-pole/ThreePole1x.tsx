import { Center, Icon, Image, Text } from '@chakra-ui/react';

import { useReduxSelector } from '@/config/redux/root-store';
import {
  deviceApi,
  useSendRpcCommandMutation,
} from '@/service/api/device/device-api';

import { Device } from '../../../components/Device';
import { IButtonIconProps } from './ThreePole';

enum TelemetryKey {
  key_1_value = 'key_one_status',
  key_2_value = 'key_two_status',
  key_3_value = 'key_three_status',
  temperature = 'temperature',
}

enum rpcMethod {
  key_1_set_value = 'key_one_set_value',
  key_2_set_value = 'key_two_set_value',
  key_3_set_value = 'key_three_set_value',
}

export const ThreePole1x: React.FC<IButtonIconProps> = (props) => {
  const [sendRpcCommand] = useSendRpcCommandMutation();
  const assetId = useReduxSelector((store) => store.asset.assetId);

  // const handlerRpc = async (deviceId: string) => {
  //   await sendRpcCommand({
  //     assetId: assetId,
  //     deviceId: deviceId,
  //     value: true,
  //     method: rpcMethod.key_1_set_value,
  //     params: true,
  //     persistent: false,
  //     timeout: 500,
  //   }).unwrap();
  // };
  const devicesQuery = useGetAllDevicesQuery({ assetId: assetId }, {});

  return (
    <Device
      {...props}
      onClickDevice={props.onClickDevice}
      containerStyle={{ ml: '15px' }}
      flexStyle={{
        bg: '#567CF8',
        borderRadius: 38,
      }}
      topStyle={{ w: '341px' }}
      deviceNameStyle={{
        fontSize: 30,
      }}
      deviceName={
        props.deviceName
        // + devicesQuery.data[0].label
      }
      infoStyle={{}}
      zoneStyle={{}}
      zone={{
        icon: (
          <Center>
            <Icon width="15.084" height="19.701" viewBox="0 0 15.084 19.701">
              <path
                d="M22.06,0H8.023a.559.559,0,0,0-.1.009A.324.324,0,0,0,7.86.028a.251.251,0,0,0-.1.049C7.74.086,7.728.092,7.728.1a.356.356,0,0,0-.077.062.45.45,0,0,0-.123.212A.415.415,0,0,0,7.5.523V19.172a.416.416,0,0,0,.022.148.434.434,0,0,0,.1.194.3.3,0,0,0,.068.068h0a.483.483,0,0,0,.234.108.312.312,0,0,0,.1.012H22.06a.523.523,0,0,0,.523-.523V.523A.523.523,0,0,0,22.06,0Zm-.526,18.651H10.975l7.12-1.995a.29.29,0,0,0,.212-.28V3.1a.289.289,0,0,0-.219-.28L11.228,1.05H21.534Zm-5.895-8.136V8.961a.292.292,0,1,1,.585,0v1.555a.292.292,0,1,1-.585,0Z"
                transform="translate(-7.5)"
                fill="#fff"
              />
            </Icon>
          </Center>
        ),
        text: (
          <Text cursor={'pointer'} onClick={() => {}}>
            {props.zone !== null ? props.zone : 'تعیین نشده'}
          </Text>
        ),
      }}
      imageStyle={{}}
      image={{
        image: (
          <Image
            src="/images/threePoleWeb.png"
            w={[120, 130, 137.15]}
            h={[123, 135, 140.83]}
            alt="سه پل"
          />
        ),
      }}
      shadowImageStyle={{ flex: 0 }}
      bottomStyle={{
        w: '100%',
        bg: '#00000041',
        borderRadius: 38,
      }}
      iconLocationStyle={{}}
      controlButton={[
        {
          icon: (
            <Icon
              width="46.948"
              height="48.528"
              viewBox="0 0 46.948 48.528"
              // onClick={() => props.onClickButtonOne()}
              onClick={() => props.onClickButtonOne()}
            >
              <g transform="translate(0 0)">
                <path
                  d="M23.474,0C36.438,0,46.948,10.863,46.948,24.264S36.438,48.528,23.474,48.528,0,37.665,0,24.264,10.51,0,23.474,0Z"
                  transform="translate(0 0)"
                  fill={props.buttonOne ? '#264165' : 'white'}
                />
                <g transform="translate(12.408 11.336)">
                  <path
                    d="M46.809,72.046s-1.333-.618-1.333.825a3.285,3.285,0,0,0,1.337,2.408,8.841,8.841,0,0,1,3.871,7.358,8.664,8.664,0,0,1-8.308,8.778,8.664,8.664,0,0,1-8.308-8.778,8.841,8.841,0,0,1,3.871-7.358,3.285,3.285,0,0,0,1.337-2.408c0-1.443-1.333-.825-1.333-.825A11.644,11.644,0,0,0,31.31,82.637,11.464,11.464,0,0,0,42.376,94.256,11.464,11.464,0,0,0,53.442,82.637,11.644,11.644,0,0,0,46.809,72.046Z"
                    transform="translate(-31.31 -68.401)"
                    fill={props.buttonOne ? 'white' : '#264165'}
                  />
                  <path
                    d="M233.593,0a1.493,1.493,0,0,0-1.627,1.3V12.747a1.493,1.493,0,0,0,1.627,1.3,1.325,1.325,0,0,0,1.472-1.3V1.3A1.325,1.325,0,0,0,233.593,0Z"
                    transform="translate(-222.45)"
                    fill={props.buttonOne ? 'white' : '#264165'}
                  />
                </g>
              </g>
            </Icon>
          ),
          tooltip: props.buttonOne === false ? 'روشن' : 'خاموش',
        },
        {
          icon: (
            <Icon
              width="46.948"
              height="48.528"
              viewBox="0 0 46.948 48.528"
              onClick={() => props.onClickButtonTwo()}
            >
              <g transform="translate(0 0)">
                <path
                  d="M23.474,0C36.438,0,46.948,10.863,46.948,24.264S36.438,48.528,23.474,48.528,0,37.665,0,24.264,10.51,0,23.474,0Z"
                  transform="translate(0 0)"
                  fill={props.buttonTwo ? '#264165' : 'white'}
                />
                <g transform="translate(12.408 11.336)">
                  <path
                    d="M46.809,72.046s-1.333-.618-1.333.825a3.285,3.285,0,0,0,1.337,2.408,8.841,8.841,0,0,1,3.871,7.358,8.664,8.664,0,0,1-8.308,8.778,8.664,8.664,0,0,1-8.308-8.778,8.841,8.841,0,0,1,3.871-7.358,3.285,3.285,0,0,0,1.337-2.408c0-1.443-1.333-.825-1.333-.825A11.644,11.644,0,0,0,31.31,82.637,11.464,11.464,0,0,0,42.376,94.256,11.464,11.464,0,0,0,53.442,82.637,11.644,11.644,0,0,0,46.809,72.046Z"
                    transform="translate(-31.31 -68.401)"
                    fill={props.buttonTwo ? 'white' : '#264165'}
                  />
                  <path
                    d="M233.593,0a1.493,1.493,0,0,0-1.627,1.3V12.747a1.493,1.493,0,0,0,1.627,1.3,1.325,1.325,0,0,0,1.472-1.3V1.3A1.325,1.325,0,0,0,233.593,0Z"
                    transform="translate(-222.45)"
                    fill={props.buttonTwo ? 'white' : '#264165'}
                  />
                </g>
              </g>
            </Icon>
          ),
          tooltip: props.buttonTwo === false ? 'روشن' : 'خاموش',
        },
        {
          icon: (
            <Icon
              width="46.948"
              height="48.528"
              viewBox="0 0 46.948 48.528"
              onClick={() => props.onClickButtonThree()}
            >
              <g transform="translate(0 0)">
                <path
                  d="M23.474,0C36.438,0,46.948,10.863,46.948,24.264S36.438,48.528,23.474,48.528,0,37.665,0,24.264,10.51,0,23.474,0Z"
                  transform="translate(0 0)"
                  fill={props.buttonThree ? '#264165' : 'white'}
                />
                <g transform="translate(12.408 11.336)">
                  <path
                    d="M46.809,72.046s-1.333-.618-1.333.825a3.285,3.285,0,0,0,1.337,2.408,8.841,8.841,0,0,1,3.871,7.358,8.664,8.664,0,0,1-8.308,8.778,8.664,8.664,0,0,1-8.308-8.778,8.841,8.841,0,0,1,3.871-7.358,3.285,3.285,0,0,0,1.337-2.408c0-1.443-1.333-.825-1.333-.825A11.644,11.644,0,0,0,31.31,82.637,11.464,11.464,0,0,0,42.376,94.256,11.464,11.464,0,0,0,53.442,82.637,11.644,11.644,0,0,0,46.809,72.046Z"
                    transform="translate(-31.31 -68.401)"
                    fill={props.buttonThree ? 'white' : '#264165'}
                  />
                  <path
                    d="M233.593,0a1.493,1.493,0,0,0-1.627,1.3V12.747a1.493,1.493,0,0,0,1.627,1.3,1.325,1.325,0,0,0,1.472-1.3V1.3A1.325,1.325,0,0,0,233.593,0Z"
                    transform="translate(-222.45)"
                    fill={props.buttonThree ? 'white' : '#264165'}
                  />
                </g>
              </g>
            </Icon>
          ),
          tooltip: props.buttonThree === false ? 'روشن' : 'خاموش',
        },
      ]}
    />
  );
};
export const { useGetAllDevicesQuery } = deviceApi;
