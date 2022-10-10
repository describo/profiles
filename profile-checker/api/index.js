import "regenerator-runtime";
import restify from "restify";
import { setupRoutes } from "./src/routes/index.js";
const server = restify.createServer();
import corsMiddleware from "restify-cors-middleware2";

main();
async function main() {
    const cors = corsMiddleware({
        preflightMaxAge: 5, //Optional
        origins: ["http://localhost:8080"],
        allowHeaders: ["Content-Type", "Authorization"],
        exposeHeaders: ["Content-Type", "Authorization"],
    });

    server.pre(cors.preflight);
    server.use(cors.actual);
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.jsonp());
    server.use(restify.plugins.gzipResponse());
    server.use(
        restify.plugins.bodyParser({
            maxBodySize: 0,
            mapParams: true,
            mapFiles: false,
            overrideParams: false,
            multiples: true,
            hash: "sha1",
            rejectUnknown: true,
            requestBodyOnGet: false,
            reviver: undefined,
            maxFieldsSize: 2 * 1024 * 1024,
        })
    );
    setupRoutes({ server });

    const app = server.listen(8080, function () {
        console.log("ready on %s", server.url);
    });
}
