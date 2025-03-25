'use client';

import { PeekAHeader } from '@oak-digital/peek-a-header';
import { PropsWithChildren, createContext, useContext, useState, ReactNode } from 'react';

interface PeekAHeaderContextData {
    instance: PeekAHeader | undefined;
    setInstance: (instance: PeekAHeader | undefined) => void;
    hide: () => void;
    partialHide: () => void;
    show: () => void;
}

type PeekAHeaderProviderProps = PropsWithChildren<{
    children: ReactNode;
}>;

export const PeekAHeaderContext = createContext({} as PeekAHeaderContextData);

export const PeekAHeaderProvider = ({ children }: PeekAHeaderProviderProps) => {
    const [instance, setInstance] = useState<PeekAHeader | undefined>();

    const hide = () => {
        if (!instance) return;

        instance.hide();
    };

    const partialHide = () => {
        if (!instance) return;

        instance.partialHide();
    };

    const show = () => {
        if (!instance) return;

        instance.show();
    };

    return (
        <PeekAHeaderContext.Provider value={{ instance, setInstance, hide, partialHide, show }}>
            {children}
        </PeekAHeaderContext.Provider>
    );
};

export const PeekAHeaderConsumer = PeekAHeaderContext.Consumer;

export const usePeekAHeaderContext = (): PeekAHeaderContextData => {
    const context = useContext<PeekAHeaderContextData>(PeekAHeaderContext);
    return context;
};
