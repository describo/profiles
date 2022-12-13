import Ajv from "ajv";
import schema from "./profile.schema.json";

export async function validateProfile({ profile }) {
    const ajv = new Ajv();
    // const schema = await readJSON(path.join("/srv", "api", "src", "lib", "profile.schema.json"));
    const validate = ajv.compile(schema);
    let valid = validate(profile);
    if (!valid) {
        return { valid, errors: validate.errors };
    }

    // the profile validates against the schema but is it consistent?

    // check that enabled classes has all required classes in it
    let errors = [];
    let typeDefinitions = {};
    valid = true;
    return { valid: errors.length ? false : true, errors };
}
