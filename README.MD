# ⚠️WARNING THIS LIBRARY IS STILL UNDER DEVELOPMENT</br></br>samp-server-info-obtainer
🗺️ samp-server-obtainer — A simple library made in typescript for obtaining your samp server info

### Setup development enviroment
```
git clone https://github.com/kyro95/samp-server-info-obtainer.git
npm install (on root directory)
```

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
