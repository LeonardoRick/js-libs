# utils

Javascript functions that are useful to be re-used

# usage

    `pnpm i @leonardorick/utils`

#### on plain javascript

    import utils from './node_modules/@leonardorick/utils/index.js';

#### on a modern JS application working with bundlers

    import utils from '@leoanrdorick/utils';

### publish

    pnpm version patch
    pnpm run build
    git add .
    git commit -m "<message>"
    git push
    pnpm publish --access=public

#### add new functions

If you are going to add a new "module" (file) make sure to keep the same structure present on the project. The following three folders should have (almost) the same structure:

1. `src/`
   Where the `.js` file is located and the function is actually implemented. This function should be imported inside `src/index.js`, which is the only file that is not repeated on the other folders. This file abastracts the complexity of the actual `index.js` outside the `src` folder that import stuff from './dist' and we don't want to keep updating it everytime.

   Make sure to add some JSDocs one each function explaining it usage

2. `tests/`
   Any function should have at least one test for it implementation. Preferably the module will have more than one test per function implement to contemplate multiple scenarios
3. `types/`
   The signature of the exported classes/functions should be present on `types/` as a `.d.ts` file. This file should also be imported on the `types/index.d.ts` so all types of the exported package members can be properly infered by IDE's

Try to make the functions inside each module ordered alphabetically as much as possible!

#### Code patterns

Optional parameters: Usually optional parameters are the last param of the function and are inside a object with default values.

```javascript
funciton something(a, {
  opt1 = true,
  opt2 = null,
  opt3 = 5,
} = {})
```

internal imports: If some module imports another one internally it needs to import it with the extension. This allows the builded version to work as expected

```javascript
import { hypotenuse, round } from './math.js'; // right
//...
import { hypotenuse, round } from './math'; // wrong
```

### Examples

You can go for any example index.html and open the file to check some useful examples of the usage of the package
