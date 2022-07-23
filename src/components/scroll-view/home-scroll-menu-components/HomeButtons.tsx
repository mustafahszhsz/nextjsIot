import { Image } from '@chakra-ui/image';

import MenuButton from '@/components/menu-button/MenuButton';

import { SelectedMenu } from '../HomeScrollMenu';

export const ListOfHomeButtons = ({
  setSelected,
}: {
  setSelected: (selectedMenu: SelectedMenu) => void;
}) => {
  return (
    <>
      <MenuButton
        editable={true}
        title="نام خانه"
        imageSrc="/images/EditProfile.svg"
        statisticsNumber={0}
        statisticsType={'none'}
        expandedEditable={'none'}
      />
      <div style={{ alignSelf: 'center', paddingTop: 10 }}>
        <Image
          src={'/back.svg'}
          width="52.756"
          height="53.732"
          viewBox="0 0 52.756 53.732"
          cursor={'pointer'}
          onClick={() => {
            setSelected(SelectedMenu.List);
          }}
        />
      </div>
    </>
  );
};
