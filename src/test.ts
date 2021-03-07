import sampServer from "./samp-server-info-obtainer";

sampServer.connect({
    ip: "yourip",
    port: 7777
}, myFunction);

async function myFunction() {
    console.log('Callback called!');
     
    const test = await sampServer.getInfo("i");
    console.log(test);
}

