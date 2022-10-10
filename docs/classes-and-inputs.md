- [Classes](#classes)
- [Inputs](#inputs)

# Classes

This section contains class definitions a user can use in their dataset description. The structure
is similar to the hide and layouts sections where the key is the stringified `@type` and it provides
the definition of what can and can't be described to the UI.

The overall structure of a class definition is as follows:

```
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

-   definition: 'override' or 'inherit'. If set to inherit, the UI will allow the user to add
    properties from the class hierarchy defined in schema.org. If set to override, the user will
    only be able to use the properties defined in the inputs to this entity definition. That is, if
    you want the user to have a limited set of properties to user, set this to `override`. If on the
    other hand, all of the properties defined in schema.org are acceptable, set this to `inherit`.
    If you wish to define properties additional to those define in schema.org then define them in
    the inputs array.
-   subClassOf: An array of classes that this class is a subclass of.
-   inputs: An array of objects that define the properties the user can define for this class.

# Inputs

Each input in the `inputs` array for a class has the following structure:

```
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

-   id: a URL which describes the property
-   name: the name of the property
-   label: the label to use for this property in the UI. If this is not defined, the name will be
    used.
-   help: Text explaining what this property is about.
-   required: Whether this property is required to have a value and be defined.
-   multiple: true || false. Whether the value for this property is a singleton or an array of
    values.
-   type: An array of data types or entities that can be the value for this input.

Properties can link to entities:

```
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
