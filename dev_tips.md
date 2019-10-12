in terminal, `./node_modules/.bin/rollup -c` to rollup and then
in node, you can type
`.load dist/energy_usage.js`
 to load into interactive terminal

`npm test` to rollup and test

`npm publish` to publish

To debug the built library, just write a `js` file called e.g. `del.js` that starts `let eu = require('./')`.  Breakpoints should be set against `dist/energy_usage.js`.  The point `launch.json` to it using `"program": "${workspaceFolder}/del.js"`.

To run some code in a module, you need a new version of node then you can have a file called `del.mjs`, which contains

```
import { convert } from './src/convert.js'

console.log(convert._constants_dict)
```

and run with `node --experimental-modules del.mjs`
