/* eslint-disable max-len */
import React, { createContext } from 'react';

import { initialState } from './InitialState';


export const ContractAppContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
}

export function ContractAppProvider(props: Props) {
  const { children } = props;


  return (
    <ContractAppContext.Provider value={initialState}
    >
      {children}
    </ContractAppContext.Provider>
  );
}
