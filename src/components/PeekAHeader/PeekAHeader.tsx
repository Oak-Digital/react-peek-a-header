import { JSX, createElement, HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react';
import { PeekAHeader as PeekAHeaderClass, PeekAHeaderEventMap, PeekAHeaderOptions } from '@oak-digital/peek-a-header';
import { usePeekAHeaderContext } from '../../lib';

type Props = {
    tag?: keyof JSX.IntrinsicElements;
    events?: Readonly<Partial<PeekAHeaderEventMap>>;
    position?: 'sticky' | 'fixed';
    locked?: Parameters<PeekAHeaderClass['lock']>[0];
} & Readonly<PeekAHeaderOptions> &
    Omit<HTMLAttributes<HTMLElement>, 'ref'>;

const PeekAHeaderComponent = forwardRef<HTMLElement, Props>(
    (
        {
            tag = 'header',
            events = {},
            position,
            locked,
            autoSnap,
            autoUpdateTransform,
            transitionStrategy,
            autoAriaHidden,
            isTop,
            snapOnWheel,
            ...htmlProps
        },
        ref
    ) => {
        const internalRef = useRef<HTMLElement | null>(null);
        const [internalInstance, setInternalInstance] = useState<PeekAHeaderClass | undefined>();
        const { instance = internalInstance, setInstance = setInternalInstance } = usePeekAHeaderContext();

        const options: PeekAHeaderOptions = {
            autoUpdateTransform,
            transitionStrategy,
            autoAriaHidden,
            autoSnap,
            isTop,
            snapOnWheel,
            cacheStaticOffset: true,
        };

        // TODO: find a good way to add transition strategy to dependency array
        useEffect(() => {
            if (!internalRef.current) {
                return;
            }

            const instance = new PeekAHeaderClass(internalRef.current, {
                ...options,
            });
            setInstance(instance);

            return () => {
                instance.destroy();
            };
        }, [autoUpdateTransform, autoAriaHidden, autoSnap, isTop, snapOnWheel]);

        useEffect(() => {
            if (!instance) return;

            // FIXME: I am not sure how to do typescript properly with Object.keys

            Object.keys(events).forEach((k) => {
                const key = k as keyof typeof events;
                const event = events[key]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

                instance.on(key, event);
            });

            return () => {
                Object.keys(events).forEach((k) => {
                    const key = k as keyof PeekAHeaderEventMap;
                    const event = events[key]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

                    instance.off(key, event);
                });
            };
        }, [instance, events]);

        useEffect(() => {
            if (!instance) return;

            if (!locked) {
                instance.unlock();
                return;
            }

            instance.lock(locked);
        }, [instance, locked]);

        // useEffect(() => {
        //     if (!instance) return;
        // }, [instance, position]);

        return createElement(tag, {
            ...htmlProps,
            ref: (el: HTMLElement) => {
                internalRef.current = el;
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    ref.current = el;
                }
            },
        });
    }
);

export default PeekAHeaderComponent;
