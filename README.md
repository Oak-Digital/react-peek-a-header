# React wrapper for Peek a header

This library provides a context and components for using [@oak-digital/peek-a-header](https://github.com/Oak-Digital/peek-a-header).

It provides a hiding header which hides and shows as the user scrolls. It is configurable so you can use your own animations based on the events fired by `peek-a-header`.

## Getting started

### Installation

Install with your package manager

```bash
$ npm i @oak-digital/react-peek-a-header
$ pnpm i @oak-digital/react-peek-a-header
$ yarn add @oak-digital/react-peek-a-header
```

## Usage

### Quickstart example

```tsx
import { PeekAHeaderComponent } from '@oak-digital/react-peek-a-header'

const MyHeader = () => {
    return (
        <PeekAHeaderComponent>
            Here is my header
        </PeekAHeaderComponent>
    )
}

export default MyHeader
```

This header is very simple and will hide and show when the user scrolls

### Props

You can pass the same props to this as an `HTMLElement` and the same props as in `PeekAHeaderOptions`.

Please check [`peek-a-header` docs](https://github.com/Oak-Digital/peek-a-header) for more information.

#### `tag` prop

You may not always want to use a `<header>` element for the hiding header. maybe because it is already wrapped in a `<header>` tag.

You can easily change it by using the `tag` prop, just pass a string of which tag you would like.

example:

```typescript
<PeekAHeaderComponent tag="div">
    ...
</PeekAHeaderComponent>
```
