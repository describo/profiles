import pkg from "fs-extra";
const { readJSON } = pkg;
import {
    cloneDeep,
    flattenDeep,
    orderBy,
    compact,
    uniq,
    uniqBy,
    difference,
    isEmpty,
    startCase,
    merge,
} from "lodash-es";
import path from "path";
import Ajv from "ajv";
const SimpleDataTypes = [
    "Text",
    "TextArea",
    "Date",
    "DateTime",
    "Time",
    "Number",
    "Float",
    "Integer",
    "Boolean",
    "Select",
    "SelectObject",
    "URL",
    "SelectURL",
    "Value",
    "Geo",
];

export async function validateProfile({ profile }) {
    const ajv = new Ajv();
    const schema = await readJSON(path.join("/srv", "api", "src", "lib", "profile.schema.json"));
    const validate = ajv.compile(schema);
    let valid = validate(profile);
    if (!valid) {
        // validate.errors.forEach((error) => {
        //     log.error(error.message, error.params);
        // });
        return { valid, errors: validate.errors };
    }

    // the profile validates against the schema but is it consistent?

    // check that enabled classes has all required classes in it
    let errors = [];
    let typeDefinitions = {};
    valid = true;
    // if (profile?.enabledClasses?.length) {
    //     profile.enabledClasses.forEach((c) => {
    //         if (!profile.classes[c]) {
    //             errors.push({
    //                 message: `When using 'enabledClasses' there must be a class definition for each in the profile`,
    //                 params: { classname: c },
    //             });
    //             return;
    //         }

    //         const { definition, inputs } = profile.classes[c];
    //         if (definition !== "override") {
    //             errors.push({
    //                 message: `'enabledClass' class definition found in profile set to 'inherit'; must be 'override'`,
    //                 params: { classname: c, definition },
    //             });
    //         }

    //         inputs.forEach((input) => {
    //             if (!input.type && !input.value && !input.values) {
    //                 errors.push({
    //                     message: `Input with id '${input.id}' in class '${c}' has none of [ 'type' || 'value' || 'values' ] defined`,
    //                 });
    //                 return;
    //             }
    //             if (input?.type?.length) {
    //                 const diff = difference(input.type, SimpleDataTypes);
    //                 diff.forEach((ca) => {
    //                     if (!profile.enabledClasses.includes(ca)) {
    //                         errors.push({
    //                             message: `Input with id '${input.id}' in class '${c}' has a value '${ca}' but it is not listed as an enabled class`,
    //                             params: { classname: ca },
    //                         });
    //                     }
    //                     if (!profile.classes[ca]) {
    //                         errors.push({
    //                             message: `Input with id '${input.id}' in class '${c}' has a value '${ca}' but there is no class definition for it`,
    //                             params: { classname: ca },
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // }

    // if there are any type definitions defined - confirm we can retrieve them
    // if (profile?.typeDefinitions?.length) {
    //     for (let definition of profile.typeDefinitions) {
    //         let response = await global.fetch(definition);
    //         if (response.status !== 200) {
    //             errors.push({
    //                 message: `Error retrieving type definitions'`,
    //                 params: { definition },
    //             });
    //             continue;
    //         }
    //         // console.log(await response.json());
    //         typeDefinitions = { ...typeDefinitions, ...(await response.json()) };
    //     }
    // }

    // the profile is invalid if both enabled classes and type definitions are defined
    // if (profile?.enabledClasses?.length && profile?.typeDefinitions?.length) {
    //     errors.push({
    //         message: `When using 'enabledClasses' you must define all of your types. Using 'typeDefinitions' is invalid`,
    //         params: {},
    //     });
    // }

    // let typeDefinitionsLookup;
    // if (!isEmpty(typeDefinitions)) {
    //     typeDefinitionsLookup = Object.keys(typeDefinitions).map((c) => {
    //         return {
    //             name: c,
    //             help: typeDefinitions[c].help,
    //         };
    //     });
    // }
    // return { valid: errors.length ? false : true, errors, typeDefinitions, typeDefinitionsLookup };
    return { valid: errors.length ? false : true, errors };
}

export async function loadClassDefinition({ classNames, profile }) {
    if (profile.file && profile.file !== "schema.org") {
        profile = { ...(await loadProfile({ profile })), ...profile };
    }
    // for each class
    //      check profile for a definition
    //          if found and override, collect inputs and return
    //          if found and inherit, collect inputs then watch the hierarchy
    //          if none, check schema.org
    //              if found and inherit, collect inputs then watch the hierarchy
    //              if none set hierarchy to thing and collect inputs
    const schemaOrgTypeDefinitions = await loadProfile({ profile: { file: "schema.org" } });

    let inputs = [];
    let hierarchy = [...classNames];
    let classDefinitionType;
    for (let className of classNames) {
        if (profile.classes?.[className]?.definition === "override") {
            // we have a domain profile for the class and it's override - load this
            classDefinitionType = "override";
            inputs.push(profile.classes[className].inputs);
            let classHierarchy = profile.classes[className].subClassOf;
            for (let c of classHierarchy) {
                inputs.push(...profile.classes[c].inputs);
            }
        } else if (profile.classes?.[className]?.definition === "inherit") {
            // we have a domain profile for the class and it's inherit - load this then add schema.org
            inputs.push(profile.classes[className].inputs);
            classDefinitionType = "inherit";
            let classHierarchy = [
                ...profile.classes[className].subClassOf,
                ...mapClassHierarchies([className]),
            ];
            classHierarchy = flattenDeep(classHierarchy);
            classHierarchy = compact(classHierarchy);
            classHierarchy = uniq(classHierarchy);
            for (let c of classHierarchy) {
                inputs.push(...schemaOrgTypeDefinitions.classes[c].inputs);
            }
            hierarchy.push(...classHierarchy);
        } else if (schemaOrgTypeDefinitions.classes[className]) {
            // we don't have a domain profile so look up schema.org
            classDefinitionType = "inherit";
            let classHierarchy = mapClassHierarchies([className]);
            classHierarchy = flattenDeep(classHierarchy);
            classHierarchy = compact(classHierarchy);
            classHierarchy = uniq(classHierarchy);
            for (let c of classHierarchy) {
                inputs.push(...schemaOrgTypeDefinitions.classes[c].inputs);
            }
            hierarchy.push(...classHierarchy);
        } else {
            // no profile loaded and no match in schema.org
            classDefinitionType = "inherit";
            inputs.push(schemaOrgTypeDefinitions.classes["Thing"].inputs);
            hierarchy.push("Thing");
        }
    }

    inputs = flattenDeep(inputs);
    inputs = uniqBy(inputs, "name");
    inputs = inputs.map((input) => {
        if (!input.label) {
            return { ...input, label: startCase(input.name) };
        } else {
            return input;
        }
    });
    inputs = orderBy(inputs, ["required", "label"]);
    hierarchy = uniq(hierarchy);

    return {
        inputs,
        hierarchy,
        classDefinitionType,
        layout: profile?.layouts?.[classNames.sort().join(", ")],
        hide: profile?.hide?.[classNames.sort().join(", ")],
    };

    function mapClassHierarchies(classes) {
        return classes.map((className) => {
            if (schemaOrgTypeDefinitions.classes[className]?.subClassOf.length) {
                return [
                    className,
                    mapClassHierarchies(schemaOrgTypeDefinitions.classes[className]?.subClassOf),
                ];
            } else {
                return className;
            }
        });
    }
}