import React, { useEffect, useState } from 'react';

import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Button,
  Editable,
  Flex,
  HStack,
  Input,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { GetAllDevicesResult } from '@/service/types/GetAllDevices';
import { GetAssetsResult } from '@/service/types/GetAssetsResult';

interface MenuButtonProps {
  // onChangeSelection?: (selected: SelectedNavMenu) => void;
  title: string;
  onClick?: () => void;
  imageSrc?: string;
  editable: boolean;
  element?: React.ReactElement;
  submitEdit?: (i: string) => void;
  updateName?: () => void;
  statisticsNumber?: number;
  statisticsString?: string;
  statisticsType?: 'number' | 'string' | 'none';
  expandedEditable?: 'flex' | 'none';
  Array?: [] | GetAllDevicesResult[] | GetAssetsResult[];
}

let register = false;

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const [editText, setEditText] = useState('ویرایش');
  const [name, setName] = useState(props.title);
  const closeInput = () => {
    setEditText('لغو');
    if (editText === 'لغو') {
      setEditText('ویرایش');
    }
  };
  const cardLeftSideHandler = (
    editable: boolean,
    statisticsType: 'number' | 'string' | 'none'
  ) => {
    if (editable === false && statisticsType === 'none')
      return (
        <div style={{ alignSelf: 'center' }}>
          <ChevronLeftIcon color={'white'} h={'5vh'} w={'2vw'} />
        </div>
      );
    else if (editable === true && statisticsType === 'none')
      return (
        <Link
          color={'#FFFFFF'}
          fontWeight={'bold'}
          onClick={() => {
            setEditText('لغو');
            if (editText === 'لغو') {
              setEditText('ویرایش');
            }
          }}
        >
          {editText}
        </Link>
      );
    else if (editable === false && statisticsType === 'number')
      return (
        <div style={{ alignSelf: 'center' }}>
          <Text color={'white'}>{props.statisticsNumber}</Text>
        </div>
      );
    else if (editable === false && statisticsType === 'string')
      return (
        <div style={{ alignSelf: 'center' }}>
          <Text
            display={props.expandedEditable === 'flex' ? 'none' : 'flex'}
            color={'white'}
          >
            {props.statisticsString}
          </Text>
        </div>
      );
  };
  return (
    <Box
      dir="ltr"
      onClick={props.onClick}
      maxH={'32vh'}
      mb={'1vh'}
      px={'0.5vw'}
      style={{
        background: '#00000040',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        alignContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <HStack
        alignContent={'space-between'}
        flexDirection={'row-reverse'}
        paddingY={'1vh'}
        h={['48px', '55px', '67.5px']}
      >
        <HStack>
          <Text
            dir="rtl"
            color={'white'}
            noOfLines={1}
            fontSize={['sm', 'md', 'lg', 'xl']}
          >
            {props.title}
          </Text>
          <Image src={props.imageSrc} w={['5vw', '7vw', '2vw']} h={'3.5vh'} />
        </HStack>
        <Spacer />
        {cardLeftSideHandler(props.editable, props.statisticsType)}
      </HStack>
      <Flex>
        {editText === 'لغو' ? (
          <EditBox
            closeInput={() => {
              setEditText('لغو');
              if (editText === 'لغو') {
                setEditText('ویرایش');
              }
            }}
            {...props}
          />
        ) : (
          (register = false)
        )}
      </Flex>
      <Flex
        display={props.expandedEditable}
        // h={'90px'}
        flex={1}
        flexDirection={'column'}
        alignItems={'center'}
      >
        {props.Array?.map((home) => {
          return (
            <Text fontSize={18} color={'white'} flex={1} py={'0.5vh'}>
              {home.label}
            </Text>
          );
        })}
      </Flex>
    </Box>
  );
};
interface EditBoxProps extends MenuButtonProps {
  closeInput: () => void;
}
export default MenuButton;
const EditBox = (props: EditBoxProps) => {
  const [firstChildName, setFirstChildName] = useState<string>(props.title);
  const [temp, setTemp] = useState<string>('');
  useEffect(() => {
    setFirstChildName(props.title);
  }, [props.title]);
  return (
    <Flex dir="rtl">
      <Flex padding={5} textColor={'#FFFFFF'}>
        <Input
          placeholder={props.title}
          ml={2}
          bgColor={'#00000030'}
          onChange={(event) => {
            setTemp(event.target.value);
          }}
        ></Input>
        <Button
          bgGradient="linear(to-r, #567DF8, #5FBAFE)"
          onClick={() => {
            // props.updateName;
            if (temp.length > 0 && temp !== ' ' && temp !== '  ')
              props.submitEdit(temp);
            props.closeInput();
          }}
        >
          ثبت
        </Button>
      </Flex>
    </Flex>
  );
};
