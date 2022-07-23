import React, { FC } from 'react';

import Reducer from './reducer';

type LoadContextType = {
  load: boolean;
  setLoad: (load: boolean) => void;
};

const InitialState = {
  load: true,
};

export const LoadContext = React.createContext<LoadContextType | null>(null);

export const LoadProvider: FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, InitialState);

  const setLoad = (load: boolean): void => dispatch({ type: 'set_load', load });

  return (
    <LoadContext.Provider value={{ load: state.load, setLoad }}>
      {children}
    </LoadContext.Provider>
  );
};

export const useLoadContext = (): LoadContextType =>
  React.useContext(LoadContext) as LoadContextType;
