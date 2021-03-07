# samp-server-info-obtainer
🗺️ samp-server-obtainer — A simple library made in typescript for obtaining your samp server info


### Example
```typescript

import sampServer from "./path";

sampServer.connect({
    ip: "127.0.0.7",
    port: 7777
}, myFunction);

function myFunction() {
    console.log('Callback called!');
}

// Prints out: 'Callback called'
```
