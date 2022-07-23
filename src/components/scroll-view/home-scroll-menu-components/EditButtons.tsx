import { EditUserProfileScrollMenu } from '../EditUserProfileScrollMenu';
import { SelectedMenu } from '../HomeScrollMenu';

export const ListOfEditButtons = ({
  setSelected,
}: {
  setSelected: (selectedMenu: SelectedMenu) => void;
}) => {
  return (
    <>
      <EditUserProfileScrollMenu />
    </>
  );
};
