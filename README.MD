# ⚠️WARNING THIS LIBRARY IS STILL UNDER DEVELOPMENT</br></br>samp-server-info-obtainer
🗺️ samp-server-obtainer — A simple library made in typescript for obtaining your samp server info

### Setup development enviroment
```
git clone https://github.com/kyro95/samp-server-info-obtainer.git
npm install (on root directory)
```

### Example
```typescript

import sampRetriever from "./path";
import { ISampData } from "./path";

async function doTest() {
    const test: ISampData = await sampRetriever.fetch({
        ip: "",
        port: 7777
    }, "i");
    
    console.log(test);
}

doTest();

// Prints out an object which contains the samp server info submitted.
```
