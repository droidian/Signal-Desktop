<!-- Copyright 2026 Signal Messenger, LLC -->
<!-- SPDX-License-Identifier: AGPL-3.0-only -->

# @signalapp/windows-ucv

[![npm](https://img.shields.io/npm/v/@signalapp/windows-ucv)](https://www.npmjs.com/package/@signalapp/windows-ucv)

## Installation

```sh
npm install @signalapp/windows-ucv
```

## Usage

```js
import { checkAvailability, requestVerification } from '@signalapp/windows-ucv';

console.log(await checkAvailability());
console.log(await requestVerification('message'));
```

See https://learn.microsoft.com/en-us/uwp/api/windows.security.credentials.ui.userconsentverifier.requestverificationasync?view=winrt-26100

## License

Copyright 2025 Signal Messenger, LLC

Licensed under the GNU AGPLv3: https://www.gnu.org/licenses/agpl-3.0.html
