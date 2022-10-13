-   [Hide](#hide)
-   [Layouts](#layouts)

The `hide` and `layouts` sections define how to group properties and which properties should be
hidden from the UI.

Each section is an object keyed on the name of the entity (e.g. Dataset) and the configuration for
how to deal with that entity when rendering the UI.

# Hide

The hide section looks as follows:

```
"hide": {
    "Dataset": ["memberOf"],
    "Dataset, RepositoryCollection": ["memberOf"]
},
```

In this example we see two definitions ("Dataset" and "Dataset, RepositoryCollection"). When an
entity with `@type` matching either of those is rendered, all properties will be shown
`except for the memberOf` property. Note that the property is not removed from the crate or changed
in any way. It's just not displayed.

# Layouts

The structure of the layouts section is similar to hide.

```
 "layouts": {
    "Dataset": [
        {
            "name": "Core Metadata",
            "description": "",
            "inputs": ["identifier", "description", "language", "languageName", "subject"]
        },
        {
            "name": "Original Source Information",
            "description": "",
            "inputs": [
                "source",
                "extent",
                "publisher",
                "publicationYear",
                "yearCreated",
                "dateFreeText",
                "originalForm"
            ]
        }
    ]
},
```

In this example we can see one entity definition (Dataset) in the layouts property which is an array
of objects. Each object has three keys (all required): name, description and inputs. The name will
be used to label the tab group; description describes the group; and inputs is the list of
properties to be displayed on that tab.

Like the hide section, you can define layouts for entities with multiple types:

```
"layouts": {
    "Dataset, RepositoryCollection": [
      ...
    ]
},
```

Although schema.org does not ascribe any meaning to the order of the entities defined in @type, the
order is used as found in the entity. So an entity with
`@type = ['RepositoryCollection', 'Dataset']` will not match this layout definition.

## Adding properties to the 'About' tab

You can add properties to the about tab by defining an 'About' layout in your profile:

```
   "layouts": {
        "Dataset, RepositoryCollection": [
            {
                "name": "About",
                "description": "",
                "inputs": ["identifier", "description"]
            },
            ...
```

It must have the name 'About' (capitalised) but otherwise looks like all of the other definitions.

## Renaming the '...' tab

To rename the '...' tab add an entry like the following to your layouts:

```
{ "name": "...", "label": "Other", "description": "Uncategorised", "inputs": [] }
```

Notice the extra `label` field. That will be used in the UI in preference to the name property (but
the name property is required in order to be able to find it so make sure it's in there).
