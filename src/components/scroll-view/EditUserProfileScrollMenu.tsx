import { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Flex } from '@chakra-ui/react';

import { useReduxDispatch } from '@/config/redux/root-store';
import { setSideMenuContent } from '@/stores/side-menu-store';

import {
  useCurrentUserProfileQuery,
  useDeleteCurrentUserMutation,
  useEditUserProfileMutation,
  useEditUserProfilePhoneMutation,
  useVerifyUserProfilePhoneMutation,
} from '../../service/api/user/user-api';
import MenuButton from '../menu-button/MenuButton';

export const EditUserProfileScrollMenu: React.FC = () => {
  const [inputPhone, setInputPhone] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useReduxDispatch();

  const handleInputPhoneChange = (e) => setInputPhone(e.target.value);
  const handleInputNameChange = (e) => setInputName(e.target.value);
  const handleInputLastNameChange = (e) => setInputLastName(e.target.value);
  const handleInputEmailChange = (e) => setInputEmail(e.target.value);

  const [editUserProfile] = useEditUserProfileMutation();
  const [editUserProfilePhone] = useEditUserProfilePhoneMutation();
  const [verifyUserProfilePhone] = useVerifyUserProfilePhoneMutation();
  const [deleteCurrentUser] = useDeleteCurrentUserMutation();
  // const { currentUser } = useCurrentUserProfileQuery();
  const devicesQuery = useCurrentUserProfileQuery();
  const firstName = devicesQuery.data?.firstName;
  const lastName = devicesQuery.data?.lastName;
  const email = devicesQuery.data?.email;
  // const editUserProfileHandler = async () => {
  //   const editUserProfileResult = await editUserProfile({
  //     FirstName: inputName,
  //     LastName: inputLastName,
  //     Email: inputEmail,
  //   }).unwrap();
  // };

  const [nameState, setNameState] = useState(firstName);
  const [lNameState, setLastNameState] = useState(lastName);
  const [emailState, setEmailState] = useState(email);

  useEffect(() => {
    setNameState(firstName);
    console.log('first name changed');
  }, [firstName]);
  useEffect(() => {
    setLastNameState(lastName);
  }, [lastName]);
  useEffect(() => {
    setEmailState(email);
  }, [email]);

  const loadFirst = (): void => {
    const fName = devicesQuery.data?.firstName;
    const lName = devicesQuery.data?.lastName;
    setLastNameState(lName);
    setNameState(fName);
  };
  const editFirstNameSubmit = async (FName: string) => {
    await editUserProfile({
      FirstName: FName,
      LastName: lastName,
      Email: email,
    });
  };
  const editLastNameSubmit = async (LName: string) => {
    await editUserProfile({
      FirstName: firstName,
      LastName: LName,
      Email: email,
    });
  };
  const editEmailSubmit = async (Email: string) => {
    await editUserProfile({
      FirstName: firstName,
      LastName: lastName,
      Email: Email,
    });
  };

  // const updateFirstName = (name: string): void => {
  //   setName(name);
  // };

  return (
    <Flex flexDirection={'column'}>
      <Flex
        scrollBehavior={'initial'}
        style={{
          flexDirection: 'column',
        }}
      >
        <MenuButton
          title={nameState}
          imageSrc="/images/EditProfile.svg"
          editable={true}
          submitEdit={(input) => {
            setNameState(input);
            editFirstNameSubmit(input);
          }}
          statisticsType={'none'}
        />
        <MenuButton
          title={lNameState}
          imageSrc="/images/EditProfile.svg"
          editable={true}
          updateName={() => setNameState(nameState)}
          submitEdit={(input) => {
            setLastNameState(input);
            editLastNameSubmit(input);
          }}
          statisticsType={'none'}
        />
        <MenuButton
          title={emailState}
          imageSrc="/images/EditProfile.svg"
          editable={true}
          updateName={() => setNameState(nameState)}
          submitEdit={(input) => {
            setEmailState(input);
            editEmailSubmit(input);
          }}
          statisticsType={'none'}
        />
        <div style={{ alignSelf: 'center', paddingTop: 10 }}>
          <Image
            src={'/back.svg'}
            width="52.756"
            height="53.732"
            viewBox="0 0 52.756 53.732"
            cursor={'pointer'}
            onClick={() => {
              dispatch(setSideMenuContent('asset'));
            }}
          />
        </div>
      </Flex>
    </Flex>
  );
};
