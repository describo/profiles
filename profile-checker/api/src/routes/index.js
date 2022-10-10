import { validateProfile } from "../lib/profile.js";
import pkg from "restify-errors";
const { InternalServerError } = pkg;

export function setupRoutes({ server }) {
    server.post("/validate-profile", postValidateProfileRouteHandler);
}
export async function postValidateProfileRouteHandler(req, res, next) {
    let result;
    try {
        result = await validateProfile({ profile: req.body.profile });
    } catch (error) {
        console.log(error);
        return next(new InternalServerError());
    }

    res.send(result);
    next();
}
