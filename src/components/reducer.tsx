interface stateProps {
  load: boolean;
}

interface actionProps extends stateProps {
  type: string;
}

export default (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case 'set_load':
      return {
        load: action.load,
      };
    default:
      return state;
  }
};
