-   [Classes](#classes)
-   [Inputs](#inputs)
    -   [ANY Class](#any-class)
    -   [Note](#note)

# Classes

This section contains class definitions a user can use in their dataset description. The structure
is similar to the hide and layouts sections where the key is the stringified `@type` and it provides
the definition of what can and can't be described to the UI.

The overall structure of a class definition is as follows:

```JSON
"classes": {
    "Dataset": {
        "definition": "override",
        "subClassOf": [],
        "inputs": [
            ... the properties a user can associate to this class
        ]
    }
}
```

Each class definition has three properties that are all required:

-   `definition`: 'override' or 'inherit'. If set to inherit, the UI will allow the user to add
    properties from the class hierarchy defined in schema.org. If set to override, the user will
    only be able to use the properties defined in the inputs to this entity definition. That is, if
    you want the user to have a limited set of properties to use, set this to `override`. If on the
    other hand, all of the properties defined in schema.org are acceptable, set this to `inherit`.
    If you wish to define properties additional to those define in schema.org then define them in
    the inputs array.
-   `subClassOf`: An array of classes that this class is a subclass of.
-   `inputs`: An array of objects that define the properties the user can define for this class. All
    of these properties will be rendered in the UI as placeholders. That will give you a UI that
    looks like a traditional form with entries for all of the things the user can define.

# Inputs

Each input in the `inputs` array for a class has the following structure:

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    "label": "Title",
    "help": "The name of this dataset",
    "required": true,
    "multiple": false,
    "type": ["Text"]
},
```

-   `id`: a URL which describes the property
-   `name`: the name of the property
-   `label`: the label to use for this property in the UI. If this is not defined, the name will be
    used.
-   `help`: Text explaining what this property is about.
-   `required`: Whether this property is required to have a value and be defined.
-   `multiple`: true || false. Whether the value for this property is a singleton or an array of
    values.
-   `type`: An array of data types or entities that can be the value for this input.

Properties can link to entities:

```JSON
{
    "id": "https://schema.org/author",
    "name": "author",
    "label": "Author",
    "help": "The author of this dataset",
    "required": true,
    "multiple": false,
    "type": ["Person", "Organization"]
},
```

In this example the profile tells the UI that the value of the author property can be an entity of
type Person or Organization. The UI will then guide the user in the creation of those entities or
linking an entity either existing in the crate or looked up from a datasource elsewhere.

Please see the [detailed documentation on types](./types.md)

## ANY Class

When defining what a property can link to, you can select from a given set of types like Text or
Number (see the types documentation linked above) and anything else will be treated as an entity.
For example, specifying `type: ['Text', 'Person', 'Organisation']` allows the user to attach some
textual content or link an entity of type Person or Organisation. However, what if the user should
be able to attach an entity of any type.

The `ANY` class is a special indicator to Describo to give the user the ability to attach an entity
of any type at that point. This is required for things like actions and relationships (see
[the documentation for resolve](./resolve.md)) where you are trying to describe structures between
groups of entities.

Example:

```JSON
{
    ...
    "name": "relationship",
    ...
    "type": ["ANY"]
},
```

## Note

Any inputs defined in the profile will automatically be rendered to the screen. This is true whether
the definition is is set to 'override' or 'inherit'. So, if you want a set of properties rendered by
default (ie show a row for each property as a guide to the user) then define those properties in the
inputs of the relevant type.
