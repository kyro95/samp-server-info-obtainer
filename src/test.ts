import sampServer from "./samp-server-info-obtainer";

async function doTest() {
    const test = await sampServer.retriveInfo({
        ip: "",
        port: 7777
    }, "i");
    
    console.log(test);
}

doTest();