import { CSSObject, Center, Flex, Icon, Image, Text } from '@chakra-ui/react';

import { Device } from '../../../components/Device';
import { IButtonIconProps } from './TwoPole';

export const TwoPole2x: React.FC<IButtonIconProps> = (props) => {
  return (
    <Flex sx={CONTAINER}>
      <Flex sx={FLEX}>
        <Device
          {...props}
          onClickDevice={props.onClickDevice}
          flexStyle={{
            h: '314px',
            w: '694px',
            bg: '#567CF8',
            borderRadius: 38,
          }}
          topStyle={{ w: '694px' }}
          deviceNameStyle={{
            fontSize: 50,
          }}
          infoStyle={{}}
          zoneStyle={{}}
          zone={{
            icon: (
              <Center>
                <Icon width="19.49" height="26.46" viewBox="0 0 15.084 19.701">
                  <path
                    d="M22.06,0H8.023a.559.559,0,0,0-.1.009A.324.324,0,0,0,7.86.028a.251.251,0,0,0-.1.049C7.74.086,7.728.092,7.728.1a.356.356,0,0,0-.077.062.45.45,0,0,0-.123.212A.415.415,0,0,0,7.5.523V19.172a.416.416,0,0,0,.022.148.434.434,0,0,0,.1.194.3.3,0,0,0,.068.068h0a.483.483,0,0,0,.234.108.312.312,0,0,0,.1.012H22.06a.523.523,0,0,0,.523-.523V.523A.523.523,0,0,0,22.06,0Zm-.526,18.651H10.975l7.12-1.995a.29.29,0,0,0,.212-.28V3.1a.289.289,0,0,0-.219-.28L11.228,1.05H21.534Zm-5.895-8.136V8.961a.292.292,0,1,1,.585,0v1.555a.292.292,0,1,1-.585,0Z"
                    transform="translate(-7.5)"
                    fill="#fff"
                  />
                </Icon>
              </Center>
            ),
            text: (
              <Text cursor={'pointer'} onClick={() => {}} fontSize={20}>
                اتاق نشیمن
              </Text>
            ),
          }}
          imageStyle={{}}
          image={{
            image: (
              <Image
                src="/images/twoPoleWeb.png"
                width="179.75"
                height="184.56"
                alt="چراغ مطالعه"
              />
            ),
          }}
          shadowImageStyle={{ flex: 1 }}
          shadowImage={{
            image: (
              <Image
                src="/shadowPlug.svg"
                alt="چراغ مطالعه"
                width="165"
                height="272"
                zIndex={-1}
              />
            ),
          }}
          bottomStyle={{
            w: '694px',
            bg: '#3954A6',
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
          ]}
        />
      </Flex>
    </Flex>
  );
};

const CONTAINER: CSSObject = {
  flex: 1,
  color: 'white',
};

const FLEX: CSSObject = {
  flex: 1,
  paddingTop: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
