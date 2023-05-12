import { JSX, FC, createElement, HTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { PeekAHeader as PeekAHeaderClass } from '@oak-digital/peek-a-header';

type Props = {
    tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLElement>

const PeekAHeader = forwardRef<HTMLElement, Props>(({ tag = 'header', ...htmlProps }, ref) => {
    const internalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!internalRef.current) {
            return;
        }

        const instance = new PeekAHeaderClass(internalRef.current);
    });

    return createElement(tag, {
        ...htmlProps,
    });
});

export default PeekAHeader;
