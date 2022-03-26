import sampRetriever from "../src/main";

async function doTest() {
    const test = await sampRetriever.fetch({
        ip: "193.70.941",
        port: 7777
    }, "i");
    
    console.log(test);
}

doTest();