# `@steamdown/html`

## Usage

```typescript
import { parse } from "@steamdown/core";
import { render } from "@steamdown/html";

let src: string;
const [tree, context] = parse(src);

const html = render(tree, context);
```
