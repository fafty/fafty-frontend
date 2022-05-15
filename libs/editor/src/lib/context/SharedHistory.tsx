import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin';

import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin';
import React from 'react';
import { createContext, useContext, useMemo } from 'react';

type ContextShape = {
  historyState?: HistoryState;
};

const Context: React.Context<ContextShape> = createContext({
  historyState: { current: null, redoStack: [], undoStack: [] }
});

export const SharedHistoryContext = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const historyContext = useMemo(
    () => ({historyState: createEmptyHistoryState()}),
    [],
  );
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context);
};
